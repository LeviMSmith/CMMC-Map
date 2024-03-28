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
  SimpleGrid,
  Tabs,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dropzone, DronzoneProps } from "@mantine/dropzone";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";

import {
  StateContextType,
  StateContext,
  ControlProgress,
} from "@/components/state-provider";
import { Control } from "@/lib/static-data";

const getImplementationStatus = (tab: string) => {
  const mapping: { [key: string]: number } = {
    policy: 1,
    plan: 2,
    na: 3,
  };
  return mapping[tab] || 0;
};

interface Evidence {
  id: number;
  file?: string;
  link?: string;
  description?: string;
}

export default function ControlDash({
  control,
  controls,
}: {
  control: Control;
  controls: Control[];
}) {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  const [evidences, setEvidences] = useState<Evidence[] | undefined>(undefined);
  const [evidenceAdd, setEvidenceAdd] = useState<boolean>(false);

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

  function TabPanel({
    value,
    label,
    placeholder,
  }: {
    value: string;
    label: string;
    placeholder: string;
  }) {
    function isString(value: any): value is string {
      return typeof value === "string";
    }

    function getDescription(
      controlProgress: ControlProgress,
      value: string,
    ): string | undefined {
      const key = `${value}_description` as keyof ControlProgress;
      if (key in controlProgress) {
        const possibleStringValue = controlProgress[key];
        if (isString(possibleStringValue)) {
          return possibleStringValue;
        }
      }
      return undefined;
    }

    const [description, setDescription] = useState(
      currentControlProgress
        ? getDescription(currentControlProgress, value) || ""
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
              message: "Good job.",
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
        <Tooltip label="Save policy">
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
            pt="16"
            description={label}
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

  useEffect(() => {
    const fetchEvidences = async () => {
      try {
        const response = await fetch(
          `${sharedState.backendUrl}/api/revisions/${sharedState.revision_id}/policy/${control.id}/evidence/`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEvidences(data);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchEvidences();
  }, [sharedState.revision_id, control.id, sharedState.backendUrl]);

  return (
    <Container>
      <h2 className="lessbigtitle">{control.section_name}</h2>
      <Text>{control.brief_description}</Text>
      <Divider className="my-4" />
      <Paper className="min-h-[300px]">
        <Group>
          <Text fw={500} size="lg">
            Policy
          </Text>
        </Group>
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
            <Text fw={500} size="lg" ta="center">
              No policy set yet. Please select a tab to begin implementation.
            </Text>
          </>
        )}
      </Paper>
      <div className="h-16" />
      <Paper className="min-h-[300px]">
        <Group>
          <Text fw={500} size="lg">
            Evidence
          </Text>
          {evidenceAdd ? (
            <>
              <Tooltip label="Cancel">
                <ActionIcon
                  onClick={() => {
                    setEvidenceAdd(false);
                  }}
                  variant="light"
                >
                  <IconX />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Save evidence">
                <ActionIcon>
                  <IconCheck />
                </ActionIcon>
              </Tooltip>
            </>
          ) : (
            <Tooltip label="Add evidence">
              <ActionIcon
                variant="light"
                onClick={() => {
                  setEvidenceAdd(true);
                }}
              >
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Collapse in={evidenceAdd}>
          <Paper className="mt-8" shadow="lg" p={16}>
            <Dropzone mb="16">
              <Text ta="center">Upload some evidence</Text>
            </Dropzone>
            <Textarea
              placeholder="This screenshot shows..."
              description="Give your evidence a description"
            />
          </Paper>
        </Collapse>
        {evidences ? (
          evidences.length > 0 ? (
            <Paper withBorder>
              <SimpleGrid cols={3}>
                {evidences.map((evidence) => (
                  <Text key={evidence.id}>
                    {evidence.description || "Evidence has no description"}
                  </Text>
                ))}
              </SimpleGrid>
            </Paper>
          ) : !evidenceAdd ? (
            <Text size="lg" fw={500} ta="center" pt="32">
              No evidence yet. Press the plus icon above to get started.
            </Text>
          ) : null
        ) : (
          <>
            <div className="h-8" />
            <Center>
              <Loader />
            </Center>
          </>
        )}
      </Paper>
    </Container>
  );
}
