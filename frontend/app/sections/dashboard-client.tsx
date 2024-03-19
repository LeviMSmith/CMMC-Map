"use client";

import {
  ActionIcon,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Progress,
  Text,
  TextInput,
  Title,
  SimpleGrid,
  Space,
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
import { useContext } from "react";

import {
  StateContextType,
  StateContext,
  SectionProgress,
} from "@/components/state-provider";
import { Control, controls, sections } from "@/lib/static-data";

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
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  return (
    <Container className="pb-16">
      <h1 className="bigtitle">CMMC Map</h1>
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
              className="sectioncard"
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
                    {sharedState?.sectionProgress ? (
                      <Progress
                        value={sharedState?.sectionProgress[section.section]}
                      />
                    ) : (
                      <Center>
                        <Loader type="dots" />
                      </Center>
                    )}
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
