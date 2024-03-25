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
import { useState, useContext } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
import { Control } from "@/lib/static-data";

const getImplementationStatus = (tab) => {
  const mapping = {
    policy: 1,
    plan: 2,
    na: 3, // 'na' stands for 'Not Applicable'
  };
  return mapping[tab] || 0; // Return 0 or some default value if tab is not recognized
};

export default function ControlDash({
  control,
  controls,
}: {
  control: Control;
  controls: Control[];
}) {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  function TabPanel({ value, label, placeholder }) {
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
      if (
        sharedState.backendUrl &&
        activeTab &&
        sharedState.revision_id &&
        control.id &&
        description
      ) {
        const implementationStatus = getImplementationStatus(activeTab);
        const bodyData = {
          [`${activeTab}_description`]: description,
          implementation_status: implementationStatus,
        };

        console.log(JSON.stringify(bodyData));

        fetch(
          `${sharedState.backendUrl}/api/revisions/${sharedState.revision_id}/policy/${control.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          },
        )
          .then((response) => response.json())
          .then((data) => {
            // Handle successful response
            console.log("Success:", data);
          })
          .catch((error) => {
            // Handle error
            console.error("Error:", error);
          });
      }
    };

    return (
      <>
        <Tabs.Panel value={value}>
          <Textarea
            label={label}
            placeholder={placeholder}
            autosize
            minRows={4}
            maxRows={8}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Tabs.Panel>
      </>
    );
  }

  return (
    <Container>
      <h2 className="lessbigtitle">{control.section_name}</h2>
      <Text>{control.brief_description}</Text>
      <Divider className="my-4" />
      <Tabs
        variant="pills"
        allowTabDeactivation
        className="w-full"
        value={activeTab}
        onChange={(value) => setActiveTab(value)}
      >
        <Center>
          <Tabs.List>
            <Tabs.Tab value="policy">Implemented</Tabs.Tab>
            <Tabs.Tab value="plan">Planned to be Implemented</Tabs.Tab>
            <Tabs.Tab value="na">Not Applicable</Tabs.Tab>
          </Tabs.List>
        </Center>
        <TabPanel
          value="policy"
          label="Policy"
          placeholder="What is the policy?"
        />
        <TabPanel
          value="plan"
          label="Plan"
          placeholder="What's the plan? What will be the policy?"
        />
        <TabPanel
          value="na"
          label="Explanation"
          placeholder="Why is this control not applicable?"
        />
      </Tabs>{" "}
      {activeTab === null && (
        <>
          <div className="h-8" />
          <Title ta="center">
            Not yet implemented. Please select a tab to begin implementation.
          </Title>
        </>
      )}
    </Container>
  );
}
