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
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dropzone, DronzoneProps } from "@mantine/dropzone";
import {
  IconCheck,
  IconPlus,
  IconX,
  IconUpload,
  IconFile,
} from "@tabler/icons-react";
import { useScrollIntoView } from "@mantine/hooks";
import { useState, useEffect, useContext } from "react";
import NextImage from "next/image";

import {
  StateContextType,
  StateContext,
  ControlProgress,
} from "@/components/state-provider";
import { Control } from "@/lib/static-data";

import { Evidence, EvidenceList, EvidenceDisplay, isImage } from "./evidence";
import styles from "./control-client.module.css";

const getImplementationStatus = (tab: string) => {
  const mapping: { [key: string]: number } = {
    policy: 1,
    plan: 2,
    na: 3,
  };
  return mapping[tab] || 0;
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

  const [evidenceRefresh, setEvidenceRefresh] = useState<boolean>(false);
  const [evidences, setEvidences] = useState<Evidence[] | undefined>(undefined);
  const [evidenceAdd, setEvidenceAdd] = useState<boolean>(false);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

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
            console.error(error);
            notifications.show({
              title: "Failed to update policy!",
              message: "Try again later.",
              color: "red",
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
      if (sharedState.backendUrl && sharedState.revision_id) {
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
      }
    };

    fetchEvidences();
  }, [
    sharedState.revision_id,
    control.id,
    sharedState.backendUrl,
    evidenceRefresh,
  ]);

  const handleUpload = async () => {
    if (!sharedState.backendUrl || !sharedState.revision_id) {
      console.error("Cannot upload: query info not set");
      return;
    }

    if (files.length === 0) {
      console.error("Cannot upload: no files selected");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });
    if (description) {
      formData.append("description", description);
    }

    try {
      const response = await fetch(
        `${sharedState.backendUrl}/api/revisions/${sharedState.revision_id}/policy/${control.id}/evidence/`,
        {
          method: "POST",
          body: formData,
          // Include headers if needed, for example, for authentication
          // headers: {
          //   'Authorization': 'Bearer YOUR_TOKEN',
          // },
        },
      );

      const result = await response.json();
      notifications.show({
        title: "Evidence added!",
        message: "Good job.",
      });

      setFiles([]);
      setDescription("");
      setEvidenceAdd(false);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Failed to upload evidence!",
        message: "Try again later.",
        color: "red",
      });
    } finally {
      setEvidenceRefresh(!evidenceRefresh);
    }
  };

  const deleteEvidence = (evidence_id) => {
    if (sharedState.backendUrl && sharedState.revision_id && control.id) {
      fetch(
        `${sharedState.backendUrl}/api/revisions/${sharedState.revision_id}/policy/${control.id}/evidence/${evidence_id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then(() => {
          console.log("Evidence deleted successfully");
          notifications.show({
            title: "Evidence deleted.",
            message: "May it rest in peace.",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          notifications.show({
            title: "Failed to delete evidence!",
            message: "Try again later.",
            color: "red",
          });
        })
        .finally(() => {
          setEvidenceRefresh(!evidenceRefresh);
        });
    }
  };

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

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
          <Text fw={500} size="lg" ref={targetRef}>
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
                <ActionIcon onClick={handleUpload}>
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
                  scrollIntoView();
                }}
              >
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <Collapse in={evidenceAdd}>
          <Paper className="mt-8" shadow="lg" p={16}>
            <Dropzone
              onDrop={(acceptedFiles) => setFiles([acceptedFiles[0]])}
              onReject={(files) => console.error("rejected files", files)}
              mb="16"
              maxSize={100 * 1024 ** 2}
              multiple={false}
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-green-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconFile
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text ta="center" size="xl">
                    Drag evidence files here or click to select files
                  </Text>
                  <Text ta="center" size="sm" c="dimmed">
                    Attach a file of any type.
                  </Text>
                  {files.length > 0 && (
                    <Text ta="center" mt={32}>
                      Successfully uploaded {files.length} file.
                    </Text>
                  )}
                </div>
              </Group>
            </Dropzone>
            <Textarea
              placeholder="This screenshot shows..."
              description="Give this file a description"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <Divider my={32} label="Or pick from existing evidence" />
            <EvidenceList backendUrl={sharedState.backendUrl} />
          </Paper>
        </Collapse>
        {evidences ? (
          evidences.length > 0 ? (
            <>
              <div className="h-8" />
              <Paper withBorder className="w-full">
                <SimpleGrid cols={{ base: 1, lg: 3 }} p={32}>
                  {evidences.map((evidence, index) => (
                    <EvidenceDisplay
                      key={`Evidence display ${index}`}
                      evidence={evidence}
                      onDelete={() => deleteEvidence(evidence.id)}
                      backendUrl={sharedState.backendUrl}
                    />
                  ))}
                </SimpleGrid>
              </Paper>
            </>
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
