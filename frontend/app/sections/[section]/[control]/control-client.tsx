"use client";

import {
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  Tabs,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { Control } from "@/lib/static-data";

export default function ControlDash({
  control,
  controls,
}: {
  control: Control;
  controls: Control[];
}) {
  const [discussionOpen, setDiscussionOpen] = useState<boolean>(false);

  return (
    <Container>
      <h2 className="lessbigtitle">{control.section_name}</h2>
      <Text>{control.brief_description}</Text>
      <Divider className="my-4" />
      <Tabs variant="pills" allowTabDeactivation className="w-full">
        <Center>
          <Tabs.List>
            <Tabs.Tab value="implemented">Implemented</Tabs.Tab>
            <Tabs.Tab value="planned">Planned to be Implemented</Tabs.Tab>
            <Tabs.Tab value="na">Not Applicable</Tabs.Tab>
          </Tabs.List>
        </Center>
        <Tabs.Panel value="implemented">
          <Textarea
            label="Policy"
            placeholder="What is the policy?"
            autosize
            minRows={4}
            maxRows={8}
          />
        </Tabs.Panel>
        <Tabs.Panel value="planned">
          <Textarea
            label="Plan"
            placeholder="What's the plan? What will be the policy?"
            autosize
            minRows={4}
            maxRows={8}
          />
        </Tabs.Panel>
        <Tabs.Panel value="na">
          <Textarea
            label="Explaination"
            placeholder="Why is this control not applicable?"
            autosize
            minRows={4}
            maxRows={8}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
