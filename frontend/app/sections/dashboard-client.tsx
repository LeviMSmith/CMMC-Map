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
import { useRouter } from "next/navigation";
import { useContext } from "react";

import {
  StateContextType,
  StateContext,
  SectionProgress,
  isKeyOfSectionProgress,
} from "@/components/state-provider";
import SearchBar from "@/components/search";
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

  const router = useRouter();

  return (
    <Container className="pb-16">
      <h1 className="bigtitle">CMMC Map</h1>
      <Space h="lg" />
      <SearchBar />
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
              onClick={(e) => {
                router.push(`/sections/${section.section}`);
              }}
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
                  {sharedState.sectionProgress &&
                    (isKeyOfSectionProgress(section.section) ? (
                      controls
                        .filter((control: Control) => {
                          const sectionParts = section.section.split(".");
                          const controlParts = control.section.split(".");

                          return (
                            sectionParts[0] === controlParts[0] &&
                            sectionParts[1] === controlParts[1]
                          );
                        })
                        .map((control: Control) => {
                          const currentControlProgress =
                            sharedState.controlProgress?.find(
                              (element: ControlProgress) =>
                                element.control === control.id,
                            );

                          let implementation_status = 0;

                          if (currentControlProgress) {
                            implementation_status =
                              currentControlProgress.implementation_status;
                          }

                          return (
                            <ActionIcon
                              color={
                                implementation_status === 1
                                  ? "green"
                                  : implementation_status === 2
                                    ? "yellow"
                                    : implementation_status === 3
                                      ? "teal"
                                      : "gray"
                              }
                              m={2}
                              size="xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/sections/${section.section}/${control.section}`,
                                );
                              }}
                            ></ActionIcon>
                          );
                        })
                    ) : (
                      <Center>
                        <Loader type="dots" />
                      </Center>
                    ))}
                </div>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
