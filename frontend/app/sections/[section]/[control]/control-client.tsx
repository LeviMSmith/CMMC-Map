"use client";

import {
  ActionIcon,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Group,
  Loader,
  Notification,
  Paper,
  Tabs,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
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

  const currentControlProgress = sharedState.controlProgress?.find(
    (element: ControlProgress) => element.id === control.id,
  );

  const implementation_status: number = currentControlProgress
    ? currentControlProgress.implementation_status
    : 0;

  const [activeTab, setActiveTab] = useState<string | null>(
    implementation_status === 1
      ? "policy"
      : implementation_status === 2
        ? "plan"
        : implementation_status === 3
          ? "na"
          : null,
  );

  function TabPanel({ value, label, placeholder }) {
    const [description, setDescription] = useState(
      currentControlProgress
        ? currentControlProgress[`${value}_description`] || ""
        : "",
    );

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
            setSharedState({
              ...sharedState,
              refreshControlProgress: !sharedState.refreshControlProgress,
            });
            notifications.show({
              title: "Policy updated!",
            });
          })
          .catch((error) => {
            notifications.show({
              title: "Failed to update policy!",
              message: "Try again later.",
            });
          });
      }
    };

    const SubmitButton = () => {
      return (
        <Tooltip label="Submit policy">
          <ActionIcon variant="light" onClick={handleSubmit}>
            <IconCheck />
          </ActionIcon>
        </Tooltip>
      );
    };

    return (
      <>
        <Tabs.Panel value={value}>
          <Textarea
            label={label}
            placeholder={placeholder}
            autosize
            minRows={6}
            maxRows={16}
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            size="lg"
            rightSectionPointerEvents="auto"
            rightSection={<SubmitButton />}
          />
          <div className="h-8" />
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
