"use client";

import { Container, Group, Loader, Paper, Text, Title } from "@mantine/core";

import { Control } from "@/lib/static-data";

export default function ControlDash({
  control,
  controls,
}: {
  control: string;
  controls: Control[];
}) {
  const fullControl: Control | undefined = controls.find(
    (controlsControl) => controlsControl.section === control,
  );

  if (fullControl === undefined) {
    // TODO: redirect to something else instead
    return (
      <Container>
        <Title>How did you get here?</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Text>{fullControl.section}</Text>
      <Text>{fullControl.brief_description}</Text>
    </Container>
  );
}
