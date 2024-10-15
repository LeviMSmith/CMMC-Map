"use client";

import {
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Progress,
  Text,
  Title,
  Tooltip,
  SimpleGrid,
} from "@mantine/core";
import {
  IconCheck,
  IconMinus,
  IconQuestionMark,
  IconListCheck,
} from "@tabler/icons-react";
import { useContext } from "react";
import Link from "next/link";

import {
  StateContextType,
  StateContext,
  ControlProgress,
  isKeyOfSectionProgress,
} from "@/components/state-provider";
import { Control, Section } from "@/lib/static-data";

import styles from "./section-cient.module.css";

export default function SectionDash({
  section,
  controls,
}: {
  section: Section;
  controls: Control[];
}) {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  const progressValue =
    sharedState.sectionProgress && isKeyOfSectionProgress(section.section)
      ? sharedState.sectionProgress[section.section]
      : null;

  return (
    <Container className="pb-16">
      <h2 className="lessbigtitle">{section.description}</h2>
      {sharedState.sectionProgress && progressValue !== null ? (
        <Tooltip label={`${progressValue.toFixed(2)}%`}>
          <Progress value={progressValue} className="mb-8 mx-8" />
        </Tooltip>
      ) : (
        <Center>
          <Loader type="dots" />
        </Center>
      )}
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {controls.map((control, index) => {
          let controlProgress: ControlProgress | undefined;
          if (sharedState.controlProgress) {
            controlProgress = sharedState.controlProgress.find(
              (cp) => cp.control === control.id,
            );
          }
          return (
            <Paper
              withBorder
              p="16"
              key={control.section}
              className="sectioncard"
            >
              <Link
                href={`/sections/${section.section}/${control.section}`}
                className="text-inherit no-underline"
              >
                <Group wrap="nowrap" justify="space-between">
                  <Group wrap="nowrap">
                    <Text fw={700}>{control.section}</Text>
                    <Text className="line-clamp-1">{control.section_name}</Text>
                  </Group>
                  {sharedState.controlProgress &&
                    (() => {
                      return controlProgress ? (
                        controlProgress.implementation_status ===
                        0 ? null : controlProgress.implementation_status ===
                          1 ? (
                          <Tooltip label="Implemented">
                            <IconCheck className="text-green-500" />
                          </Tooltip>
                        ) : controlProgress.implementation_status === 2 ? (
                          <Tooltip label="Planned to be implemented">
                            <IconListCheck className="text-yellow-400" />
                          </Tooltip>
                        ) : controlProgress.implementation_status === 3 ? (
                          <Tooltip label="Not applicable">
                            <IconMinus className="text-teal-400" />
                          </Tooltip>
                        ) : (
                          <IconQuestionMark />
                        )
                      ) : null;
                    })()}
                </Group>
              </Link>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
