"use client";

import {
  Text,
  SimpleGrid,
  ActionIcon,
  Group,
  Space,
  TextInput,
  Title,
  Container,
  Paper,
  Progress,
  Stack,
} from "@mantine/core";
import {
  IconLockAccess,
  IconBarbell,
  IconNotes,
  IconSettings,
  IconFingerprint,
  IconVolcano,
  IconTool,
  IconDeviceTv,
  IconUser,
  IconFence,
  IconBomb,
  IconShieldLock,
  IconWifi,
  IconDatabase,
} from "@tabler/icons-react";
import Link from "next/link";

import { Control, controls, sections } from "@/lib/static-data";

import styles from "./dashboard-client.module.css";

const sectionIcons = [
  IconLockAccess,
  IconBarbell,
  IconNotes,
  IconSettings,
  IconFingerprint,
  IconVolcano,
  IconTool,
  IconDeviceTv,
  IconUser,
  IconFence,
  IconBomb,
  IconShieldLock,
  IconWifi,
  IconDatabase,
];

export default function Dashboard() {
  return (
    <Container className="pb-16">
      <Text ta="center" className={styles.bigtitle}>
        CMMC Map
      </Text>
      <Space h="lg" />
      <TextInput placeholder="AI powered search" />
      <div className="h-16" />
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {sections.map((section, index) => {
          const Icon = sectionIcons[index];

          return (
            <Paper
              withBorder
              p="8"
              key={section.section}
              className={styles.sectioncard}
            >
              <Link
                href={`/sections/${section.section}`}
                className="text-inherit no-underline"
              >
                <Stack justify="space-between" className="h-full">
                  <Group wrap="nowrap">
                    <ActionIcon variant="light">
                      <Icon />
                    </ActionIcon>
                    <Text fw={700}>
                      {section.section} {section.description} (
                      {section.abreviation})
                    </Text>
                  </Group>
                  <div className="mb-4">
                    <Progress value={50} />
                  </div>
                </Stack>
              </Link>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
