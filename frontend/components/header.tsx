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
} from "@mantine/core";
import {
  IconSearch,
  IconFileDescription,
  IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
        <Stack className={styles.headersection}>
          <Select label="Revision" placeholder="0.1.0" />
          <Select label="Assessment" placeholder="Self assessment 1" />
        </Stack>
      </Drawer>
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
    </header>
  );
}
