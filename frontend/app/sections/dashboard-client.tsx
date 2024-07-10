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
  Tooltip,
  SimpleGrid,
  Space,
  Stack,
  useComputedColorScheme,
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
import { useContext, useEffect } from "react";

import {
  ControlProgress,
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

  useEffect(() => {
    setSharedState((prevState) => ({
      ...prevState,
      refreshControlProgress: !prevState.refreshControlProgress,
    }));
  }, []);

  const computedColorScheme = useComputedColorScheme();

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
                <div className="mb-4 flex flex-wrap justify-start">
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
                            <Tooltip
                              label={control.section}
                              key={`heatmap ${control.section}`}
                            >
                              <ActionIcon
                                color={
                                  implementation_status === 1
                                    ? "green"
                                    : implementation_status === 2
                                      ? "yellow"
                                      : implementation_status === 3
                                        ? "teal"
                                        : computedColorScheme === "dark"
                                          ? "gray"
                                          : "gray.3"
                                }
                                m={2}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(
                                    `/sections/${section.section}/${control.section}`,
                                  );
                                }}
                                className="font-bold"
                                style={
                                  computedColorScheme === "dark"
                                    ? { color: "white" }
                                    : { color: "black" }
                                }
                              >
                                {currentControlProgress.num_evidence
                                  ? currentControlProgress.num_evidence
                                  : null}
                              </ActionIcon>
                            </Tooltip>
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
