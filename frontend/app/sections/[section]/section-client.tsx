"use client";

import {
  SimpleGrid,
  Text,
  Title,
  Container,
  Group,
  Paper,
} from "@mantine/core";
import { Control, Section } from "@/lib/static-data";

import styles from "./section-cient.module.css";

export default function SectionDash({
  section,
  controls,
}: {
  section: Section;
  controls: Control[];
}) {
  return (
    <Container className="pb-16">
      <h2 className="lessbigtitle">{section.description}</h2>
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
