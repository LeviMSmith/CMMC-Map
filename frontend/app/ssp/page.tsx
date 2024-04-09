"use client";

import { Container, Divider, Text, Title } from "@mantine/core";
import { useContext } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
import { Section, Control, sections, controls } from "@/lib/static-data";

export default function SSP() {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  // TODO: This should never happen, but we should probably handle the case anyway to sate typescript
  if (!sharedState.revision_id || !sharedState.assessment_id) {
  }

  return (
    <Container>
      <Title ta="center">System Security Plan</Title>
      <Text fw={300} mb={64} ta="center">
        Under construction
      </Text>
      {sections.map((section, section_index) => (
        <div key={section.section}>
          <Title order={2}>
            {section.section} {section.description} {section.abreviation}
          </Title>
          <Divider className="my-4" />
          {controls.map((control, control_index) => (
            <div key={control.section} className="mb-4">
              <Title order={3}>
                {control.section} {control.brief_description}
              </Title>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}
