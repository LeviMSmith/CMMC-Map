"use client";

import { Text, Group, Title, ActionIcon } from "@mantine/core";
import {
  IconSearch,
  IconFileDescription,
  IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Group justify="space-between">
        <ActionIcon variant="transparent" className="text-xl" size="xl">
          <IconMenu2 />
        </ActionIcon>
        <Group justify="flex-end">
          <ActionIcon>
            <IconSearch />
          </ActionIcon>
          <ActionIcon>
            <IconFileDescription />
          </ActionIcon>
        </Group>
      </Group>
    </header>
  );
}
