"use client";

import { Container, Divider, Group, Loader, Text, Title } from "@mantine/core";
import { IconSquareCheck, IconSquare } from "@tabler/icons-react";
import { useContext, useState, useEffect } from "react";

import {
  StateContextType,
  StateContext,
  ControlProgress,
} from "@/components/state-provider";
import {
  Section,
  Control,
  Revision,
  sections,
  controls,
} from "@/lib/static-data";
import { backendFetch } from "@/lib/session";

export default function SSP() {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);
  const [revisions, setRevisions] = useState<Revision[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backendFetch(`/api/revisions/`);
        if (!res) {
          throw new Error("Failed to get revisions: Didn't get a response");
        }
        if (!res.ok) {
          throw new Error(`Failed to get revisions: ${res.status}`);
        }
        const data = await res.json();

        const revisions: Revision[] = data.map((revision: Revision) => {
          // Check if date_completed is not null before converting
          const dateCompleted = revision.date_completed
            ? new Date(revision.date_completed)
            : null;

          return {
            id: revision.id.toString(),
            version: revision.version,
            date_completed: dateCompleted,
          };
        });

        setRevisions(revisions);
      } catch (error) {
        setRevisions([]);
        console.error("Failed to fetch revisions", error);
      }
    };

    fetchData();
  }, [sharedState.refreshRevisions]);

  if (!sharedState.revision_id || !sharedState.assessment_id || !revisions) {
    return (
      <Container>
        <div className="flex justify-center">
          <Loader />
        </div>
      </Container>
    );
  }

  if (!sharedState.controlProgress) {
    return (
      <Container>
        <Text ta="center">
          No policies have been set for this revision yet.
        </Text>
      </Container>
    );
  }

  const selected_revision = revisions.find(
    (rev: Revision) => rev.id === sharedState.revision_id,
  );

  if (!selected_revision) {
    return (
      <Container>
        <div className="flex justify-center">
          <Loader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Title ta="center">System Security Plan</Title>
      <Text fw={300} mb={64} ta="center">
        Revision {selected_revision.version}
      </Text>
      {sections.map((section, section_index) => (
        <div key={section.section}>
          <Title order={2}>
            {section.section} {section.description} {section.abreviation}
          </Title>
          <Divider className="my-4" />
          {controls
            .filter((control) => {
              const sectionParts = section.section.split(".");
              const controlParts = control.section.split(".");

              return (
                sectionParts[0] === controlParts[0] &&
                sectionParts[1] === controlParts[1]
              );
            })
            .map((control, control_index) => {
              const currentControlProgress = sharedState.controlProgress?.find(
                (element: ControlProgress) => element.control === control.id,
              );

              var policy =
                "No policy has been implemented for this control yet.";

              var implementation_status = 0;

              if (currentControlProgress) {
                implementation_status =
                  currentControlProgress.implementation_status;

                const policy =
                  implementation_status === 1
                    ? currentControlProgress.policy_description
                    : implementation_status === 2
                      ? currentControlProgress.plan_description
                      : implementation_status === 3
                        ? currentControlProgress.na_description
                        : "No policy has been implemented for this control yet.";
              }

              return (
                <div key={control.section} className="mb-4">
                  <Title order={5}>
                    {control.section} {control.brief_description}
                  </Title>
                  <div className="flex justify-center my-4">
                    <Group>
                      <>
                        {implementation_status === 1 ? (
                          <IconSquareCheck />
                        ) : (
                          <IconSquare />
                        )}
                        Implemented
                      </>
                      <>
                        {implementation_status === 2 ? (
                          <IconSquareCheck />
                        ) : (
                          <IconSquare />
                        )}
                        Planned to be Implemented
                      </>
                      <>
                        {implementation_status === 3 ? (
                          <IconSquareCheck />
                        ) : (
                          <IconSquare />
                        )}
                        Not Applicable
                      </>
                    </Group>
                  </div>
                  <Text ml={32}>{policy}</Text>
                </div>
              );
            })}
        </div>
      ))}
    </Container>
  );
}
