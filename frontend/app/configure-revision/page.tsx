"use client";

import { Container, Loader, Group, Title, Text } from "@mantine/core";
import { useContext, useState, useEffect } from "react";

import SystemInformationForm from "./section1";
import { StateContextType, StateContext } from "@/components/state-provider";
import { backendFetch } from "@/lib/session";

export default function ConfigureRevision() {
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

  if (!sharedState.revision_id || !revisions) {
    return (
      <Container>
        <Text ta="center" size="lg" fw={500}>
          Failed to fetch revisions!
        </Text>
        <Text ta="center">Try again later.</Text>
      </Container>
    );
  }

  const selected_revision = revisions.find(
    (rev: Revision) => rev.id === sharedState.revision_id,
  );

  if (!selected_revision) {
    return (
      <Container>
        <Text ta="center" size="lg" fw={500}>
          No revision Selected!
        </Text>
        <Text ta="center">
          Please select or create one to begin configuring it.
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title ta="center">Revision Configuration</Title>
      <Text fw={300} mb={64} ta="center">
        Revision {selected_revision.version}
      </Text>
      <SystemInformationForm />
    </Container>
  );
}
