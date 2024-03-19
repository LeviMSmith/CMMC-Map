"use client";

import {
  SimpleGrid,
  Text,
  Title,
  Center,
  Container,
  Group,
  Paper,
  Progress,
  Loader,
} from "@mantine/core";
import { useContext } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
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

  console.log(JSON.stringify(sharedState.sectionProgress));

  return (
    <Container className="pb-16">
      <h2 className="lessbigtitle">{section.description}</h2>
      {sharedState.sectionProgress ? (
        <Progress
          value={sharedState?.sectionProgress[section.section]}
          className="mb-8 mx-8"
        />
      ) : (
        <Center>
          <Loader type="dots" />
        </Center>
      )}
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {controls.map((control, index) => {
          return (
            <Paper
              withBorder
              p="16"
              key={control.section}
              className="sectioncard"
            >
              <Group wrap="nowrap">
                <Text fw={700}>{control.section}</Text>
                <Text className="line-clamp-1">{control.section_name}</Text>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
