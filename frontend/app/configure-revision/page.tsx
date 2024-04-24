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
      <SystemInformationForm revision={selected_revision} />
    </Container>
  );
}
