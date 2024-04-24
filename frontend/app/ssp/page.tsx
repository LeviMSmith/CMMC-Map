"use client";

import {
  ActionIcon,
  Container,
  Divider,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconSquareCheck, IconSquare, IconPrinter } from "@tabler/icons-react";
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
            system_name: revision.system_name,
            system_category: revision.system_category,
            system_unique_id: revision.system_unique_id,
            responsible_org_name: revision.responsible_org_name,
            responsible_org_addr: revision.responsible_org_addr,
            responsible_org_phone: revision.responsible_org_phone,
            info_owner_name: revision.info_owner_name,
            info_owner_title: revision.info_owner_title,
            info_owner_addr: revision.info_owner_addr,
            info_owner_phone: revision.info_owner_phone,
            info_owner_email: revision.info_owner_email,
            sys_owner_name: revision.sys_owner_name,
            sys_owner_title: revision.sys_owner_title,
            sys_owner_addr: revision.sys_owner_addr,
            sys_owner_phone: revision.sys_owner_phone,
            sys_owner_email: revision.sys_owner_email,
            sys_sec_name: revision.sys_sec_name,
            sys_sec_title: revision.sys_sec_title,
            sys_sec_addr: revision.sys_sec_addr,
            sys_sec_phone: revision.sys_sec_phone,
            sys_sec_email: revision.sys_sec_email,
            system_description: revision.system_description,
            num_end_users: revision.num_end_users,
            num_admin_users: revision.num_admin_users,
            information_description: revision.information_description,
            system_top_evi: revision.system_top_evi,
            hardware_listing: revision.hardware_listing,
            software_listing: revision.software_listing,
            hardsoft_main: revision.hardsoft_main,
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
  if (!sharedState.revision_id || !revisions) {
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
      <Group justify="center" mb={80} gap="lg">
        <div>
          <Title ta="center">System Security Plan</Title>
          <Text fw={300} ta="center">
            Revision {selected_revision.version}
          </Text>
        </div>
        <ActionIcon
          onClick={() => {
            window.print();
          }}
          className="print:hidden"
        >
          <IconPrinter />
        </ActionIcon>
      </Group>
      <Title order={2}>1 System Identification</Title>
      <Divider className="my-4" />
      <Stack gap="sm">
        <Group>
          <Title order={5}>1.1 System Name/Title: </Title>
          <Text>{selected_revision.system_name}</Text>
        </Group>
        <Group>
          <Title order={5}>1.1.1 System Categorization: </Title>
          <Text>{selected_revision.system_category}</Text>
        </Group>
        <Group>
          <Title order={5}>1.1.2 System Unique Identifier: </Title>
          <Text>{selected_revision.system_unique_id}</Text>
        </Group>
        <Title order={5}>1.2 Reponsible Organization: </Title>
        <Stack ml={16} gap="sm">
          <Text>
            <strong>Name:</strong> {selected_revision.responsible_org_name}
          </Text>
          <Text>
            <strong>Address:</strong> {selected_revision.responsible_org_addr}
          </Text>
          <Text>
            <strong>Phone:</strong> {selected_revision.responsible_org_phone}
          </Text>
        </Stack>
        <Title order={5}>1.2.1 Information Owner: </Title>
        <Stack ml={16} gap="sm">
          <Text>
            <strong>Name:</strong>
            {selected_revision.info_owner_name}
          </Text>
          <Text>
            <strong>Title:</strong>
            {selected_revision.info_owner_title}
          </Text>
          <Text>
            <strong>Office Address:</strong>
            {selected_revision.info_owner_addr}
          </Text>
          <Text>
            <strong>Work Phone:</strong>
            {selected_revision.info_owner_phone}
          </Text>
          <Text>
            <strong>e-Mail Address:</strong>
            {selected_revision.info_owner_email}
          </Text>
        </Stack>
        <Title order={5}>1.2.1.1 System Owner: </Title>
        <Stack ml={16} gap="sm">
          <Text>
            <strong>Name:</strong>
            {selected_revision.sys_owner_name}
          </Text>
          <Text>
            <strong>Title:</strong>
            {selected_revision.sys_owner_title}
          </Text>
          <Text>
            <strong>Office Address:</strong>
            {selected_revision.sys_owner_addr}
          </Text>
          <Text>
            <strong>Work Phone:</strong>
            {selected_revision.sys_owner_phone}
          </Text>
          <Text>
            <strong>e-Mail Address:</strong>
            {selected_revision.sys_owner_email}
          </Text>
        </Stack>
        <Title order={5}>1.2.1.2 System Security Officer: </Title>
        <Stack ml={16} gap="sm">
          <Text>
            <strong>Name:</strong>
            {selected_revision.sys_sec_name}
          </Text>
          <Text>
            <strong>Title:</strong>
            {selected_revision.sys_sec_title}
          </Text>
          <Text>
            <strong>Office Address:</strong>
            {selected_revision.sys_sec_addr}
          </Text>
          <Text>
            <strong>Work Phone:</strong>
            {selected_revision.sys_sec_phone}
          </Text>
          <Text>
            <strong>e-Mail Address:</strong>
            {selected_revision.sys_sec_email}
          </Text>
        </Stack>
        <Title order={5}>1.3 General Description/Purpose of the System</Title>
        <Text ml={16}>{selected_revision.system_description}</Text>
        <Title order={5}>1.3.1 Number of End Users and Privileged Users:</Title>
        <Group ml={16}>
          <Text>
            <strong>Number of Users:</strong>
            {selected_revision.num_end_users}
          </Text>
          <Text>
            <strong>Number of Administrators/Privileged Users:</strong>
            {selected_revision.num_admin_users}
          </Text>
        </Group>
        <Title order={5}>1.4 General Description of Information</Title>
      </Stack>
      <Space />
      <Title order={2} mt={32}>
        2 System Environment
      </Title>
      <Divider className="my-4" />
      <Stack gap="sm">
        <Title order={5}>2.1 Listing of Hardware</Title>
        <Title order={5}>2.2 Listing of Software</Title>
        <Title order={5}>2.3 Hardware and Software Maintenence</Title>
        <Text ml={16}>{selected_revision.hardsoft_main}</Text>
      </Stack>
      {sections.map((section, section_index) => (
        <div key={section.section}>
          <Title order={2} mt={32}>
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
