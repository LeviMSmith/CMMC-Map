"use client";

import {
  Stack,
  Text,
  Button,
  Group,
  Drawer,
  Title,
  ActionIcon,
  TextInput,
  Select,
  Loader,
} from "@mantine/core";
import {
  IconSearch,
  IconFileDescription,
  IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

import { StateContext, State } from "@/components/state-provider";
import { Revision } from "@/lib/static-data";
import styles from "./header.module.css";

const CurrentUrlSections = () => {
  const router = useRouter();
  const pathname = usePathname();

  const path = pathname.split("?")[0].split("#")[0];

  const sections = path.split("/").filter(Boolean);

  const navigateTo = (path) => () => {
    router.push(path);
  };

  const pathsAndLabels = sections.reduce((acc, curr, index) => {
    const pathSoFar = "/" + sections.slice(0, index + 1).join("/");
    const label = curr;
    acc.push({ path: pathSoFar, label });
    return acc;
  }, []);

  return (
    <Group spacing="xs" p="8">
      {pathsAndLabels.map(({ path, label }, index) => (
        <Button
          key={index}
          variant="light"
          disabled={index === pathsAndLabels.length - 1}
          onClick={navigateTo(path)}
        >
          {label}
        </Button>
      ))}
    </Group>
  );
};

export default function Header() {
  const { sharedState, setSharedState } = useContext(StateContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [revisions, setRevisions] = useState<Revision[], undefined>();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("BACKEND_URL is not set!");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/revisions`);
        const data = await res.json();

        const revisions: Revision[] = data.map((revision) => {
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
        if (!sharedState) {
          setSharedState({
            revision_id: revisions[revisions.length - 1].id,
          });
        } else {
          if (!sharedState.revision_id) {
            setSharedState((prevState) => ({
              ...prevState,
              revision_id: revisions[revisions.length - 1].id,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch revisions", error);
      }
    };

    fetchData();
  }, []);

  var revisionOptions;
  if (revisions) {
    revisionOptions = revisions.map((revision) => {
      return {
        value: revision.id,
        label: revision.version,
      };
    });
  }

  return (
    <header className={styles.header}>
      <Drawer
        opened={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
        title="Menu"
      >
        <Stack className={styles.headersection}>
          <Text fw={700}>Search</Text>
          <TextInput placeholder="AI powered search" />
        </Stack>
        <Stack className={styles.headersection}>
          <Text fw={700}>Export Report</Text>
          <Button variant="light">System Security Plan</Button>
          <Button variant="light">Plan of Action and Milestones</Button>
        </Stack>
      </Drawer>
      <Group justify="space-between">
        <Group>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <IconMenu2 />
          </ActionIcon>
          <CurrentUrlSections />
        </Group>
        <Group
          wrap="no-wrap"
          justify="space-around"
          p="8"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-w-24"
        >
          {revisionOptions && sharedState.revision_id ? (
            <Select
              description="Revision"
              value={sharedState.revision_id}
              data={revisionOptions}
              onChange={(value, option) => {
                setSharedState((prevState) => {
                  return {
                    ...prevState,
                    revision_id: value,
                  };
                });
              }}
              allowDeselect={false}
            />
          ) : (
            <Loader type="dots" />
          )}
          <Select description="Assessment" placeholder="Self assessment 1" />
        </Group>
      </Group>
    </header>
  );
}
