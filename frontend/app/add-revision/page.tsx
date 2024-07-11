"use client";

import {
  ActionIcon,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconFilePlus } from "@tabler/icons-react";
import { useContext, useState, useEffect } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
import { Revision } from "@/lib/static-data";
import { backendFetch } from "@/lib/session";

import styles from "./page.module.css";

export default function AddRevision() {
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
            based_on: revision.based_on,
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

  if (!revisions) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <Container>
      <Title p="sm">Current Revisions</Title>
      <Paper radius="lg" className={styles.revisiontable}>
        {revisions.map((revision, index) => {
          const formattedDate = revision.date_completed
            ? new Date(revision.date_completed).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null;
          return (
            <Group
              key={index} // Adding a key to avoid React warnings
              p="md"
              className={
                index == 0 ? styles.firstrevisionrecord : styles.revisionrecord
              }
              justify="space-between"
              onClick={() => {
                setSharedState({ ...sharedState, revision_id: revision.id });
              }}
            >
              <Group>
                <Text fw={700}>{revision.version}</Text>
                {revision.based_on && (
                  <Text>
                    Based on{" "}
                    {
                      revisions.find(
                        (orevision) => orevision.id == revision.based_on,
                      )?.version
                    }
                  </Text>
                )}
              </Group>
              {formattedDate ? (
                <Text>Completed {formattedDate}</Text>
              ) : (
                <Tooltip label={`Complete revision ${revision.version}`}>
                  <ActionIcon variant="light">
                    <IconCheck />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          );
        })}
      </Paper>
      <Title p="sm" mt="xl">
        Create a New Revision
      </Title>
      <Paper radius="lg" className={styles.revisiontable} p="md">
        <Select
          size="md"
          label="Base Revision"
          placeholder="None"
          data={revisions.map((revision) => ({
            value: revision.id,
            label: revision.version,
          }))}
          m="lg"
        />
        <Group m="lg" justify="space-between">
          <TextInput size="md" label="New revision name" placeholder="1.1" />
          <Tooltip label="Create new revision">
            <ActionIcon variant="light" size="xl">
              <IconFilePlus />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>
    </Container>
  );
}
