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
} from "@mantine/core";

import { Control, controls, sections } from "@/lib/static-data";

import styles from "./dashboard-client.module.css";

export default function Dashboard() {
  return (
    <Container>
      <div className="h-16" />
      <Text ta="center" className={styles.bigtitle}>
        CMMC Map
      </Text>
      <Space h="lg" />
      <TextInput placeholder="AI powered search" />
      <div className="h-16" />
      <SimpleGrid cols={3}>
        {sections.map((section, index) => {
          return (
            <Paper withBorder p="8" key={section.section}>
              <Group>
                <ActionIcon variant="light">{section.icon}</ActionIcon>
                <Text fw={700}>
                  {section.section} {section.description} ({section.abreviation}
                  )
                </Text>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
