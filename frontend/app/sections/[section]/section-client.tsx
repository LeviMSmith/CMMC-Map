"use client";

import { Text, Title, Container, Group } from "@mantine/core";
import { Control, sections } from "@/lib/static-data";

export default function SectionDash({ controls }: { controls: Control[] }) {
  return (
    <Container>
      {controls.map((control, index) => {
        return <Text key={control.section}>{control.section}</Text>;
      })}
    </Container>
  );
}
