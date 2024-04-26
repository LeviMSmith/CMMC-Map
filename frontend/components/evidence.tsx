"use client";

import {
  ActionIcon,
  Center,
  Collapse,
  Divider,
  Group,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  rem,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Dropzone, DropzoneProps, FileWithPath } from "@mantine/dropzone";
import {
  IconCheck,
  IconUpload,
  IconFile,
  IconPlus,
  IconX,
  IconEye,
} from "@tabler/icons-react";

import NextImage from "next/image";
import { useEffect, useState, useContext } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
import { backendFetch } from "@/lib/session";
import { State } from "@/components/state-provider";
import styles from "./evidence.module.css";

export interface Evidence {
  id: number;
  file: string;
  link?: string;
  description?: string;
}

export const isImage = (fileName: string): boolean => {
  return /\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName);
};

function associateEvidenceToPolicy(
  evidenceListId: string,
  evidenceId: number,
  evidenceRefresh: any,
  setEvidenceRefresh: any,
) {
  // Constructing the URL for associating evidence to the policy
  const url = `/api/evidence/${evidenceListId}/evidence/${evidenceId}/`;

  backendFetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response) {
        throw new Error(
          "Failed to associate evidence with policy: No response",
        );
      }

      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to associate evidence with policy");
      }
    })
    .then((data) => {
      notifications.show({
        title: "Evidence associated!",
        message: "Evidence was successfully associated with the policy.",
      });
      setEvidenceRefresh(!evidenceRefresh);
    })
    .catch((error) => {
      console.error(error);
      notifications.show({
        title: "Failed to associate evidence!",
        message: "Try again later.",
        color: "red",
      });
    });
}

export function EvidenceDisplay({
  evidence,
  onDelete,
  onAdd,
}: {
  evidence: Evidence;
  onDelete?: () => void;
  onAdd?: () => void;
}) {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const dontMessWithMyUrlDagummitLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="text-center m-4">
      <div
        className={styles.imageContainer}
        onClick={() => {
          if (evidence.file) {
            openInNewTab(evidence.file);
          }
        }}
      >
        {evidence.file && isImage(evidence.file) ? (
          <>
            <NextImage
              loader={dontMessWithMyUrlDagummitLoader}
              src={evidence.file}
              alt={
                evidence.description ||
                evidence.file.split("/").pop() ||
                "Unknown evidence"
              }
              height={200}
              width={200}
              className={styles.image}
              unoptimized
            />
            <div className={styles.overlay}>
              <IconEye />
            </div>
          </>
        ) : (
          <>
            <div className={styles.fileIconContainer}>
              <IconFile className={styles.icon} width="96" height="96" />
            </div>
            <div className={styles.overlay}>
              <IconEye />
            </div>
          </>
        )}
      </div>
      <Group wrap="nowrap" justify="center">
        <Text ta="center" size="lg" fw={500} truncate="end">
          {evidence.description ||
            evidence.file.split("/").pop() ||
            "Unknown evidence name"}
        </Text>
        {onDelete && (
          <ActionIcon variant="subtle" onClick={onDelete}>
            <IconX />
          </ActionIcon>
        )}
        {onAdd && (
          <ActionIcon variant="subtle" onClick={onAdd}>
            <IconPlus />
          </ActionIcon>
        )}
      </Group>
    </div>
  );
}

export function EvidenceList({
  evidenceListId,
  evidenceRefresh,
  setEvidenceRefresh,
}: {
  evidenceListId: string;
  evidenceRefresh: any;
  setEvidenceRefresh: any;
}) {
  const [evidences, setEvidences] = useState(new Map());
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchEvidence = () => {
    setError(false); // Reset error state on new fetch attempt
    backendFetch(`/api/evidence/?page=${page}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response) {
          throw new Error("Failed to fetch evidence. Didn't get a response");
        }
        if (response.ok) {
          response.json().then((data) => {
            if (data.results.length > 0) {
              const newEvidences = new Map(evidences);
              data.results.forEach((evidence: Evidence) => {
                newEvidences.set(evidence.id, evidence);
              });
              setEvidences(newEvidences);
            } else {
              setError(true);
            }
          });
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Failed to get evidence list!", error);
        setError(true);
      });
  };

  useEffect(() => {
    fetchEvidence();
  }, [page]);

  return (
    <>
      {error ? (
        <Center style={{ height: 400 }}>
          <div>
            <IconX size={50} stroke={1.5} />
            <Text>Failed to load evidence. Please try again.</Text>
          </div>
        </Center>
      ) : evidences.size > 0 ? (
        <ScrollArea
          style={{ height: 300 }}
          type="auto"
          onScroll={(event) => {
            const { scrollTop, scrollHeight, clientHeight } =
              event.currentTarget;
            if (scrollHeight - scrollTop === clientHeight) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          <SimpleGrid cols={3}>
            {Array.from(evidences.values()).map((evidence) => (
              <EvidenceDisplay
                key={evidence.id}
                evidence={evidence}
                onAdd={() => {
                  associateEvidenceToPolicy(
                    evidenceListId,
                    evidence.id,
                    evidenceRefresh,
                    setEvidenceRefresh,
                  );
                }}
              />
            ))}
          </SimpleGrid>
        </ScrollArea>
      ) : (
        <Center style={{ height: 300 }}>
          <Loader variant="ring" />
        </Center>
      )}
    </>
  );
}

export function EvidenceAdd({
  evidenceListId,
  sectionName,
  sectionDescription,
}: {
  evidenceListId: string;
  sectionName?: string;
  sectionDescription?: string;
}) {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  const [evidenceAdd, setEvidenceAdd] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description, setDescription] = useState("");
  const [evidences, setEvidences] = useState<Evidence[] | undefined>(undefined);
  const [evidenceRefresh, setEvidenceRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvidences = async () => {
      if (sharedState.revision_id) {
        try {
          const response = await backendFetch(
            `/api/evidence/${evidenceListId}/evidence/`,
            {
              method: "GET",
              credentials: "include",
            },
          );
          if (!response) {
            throw new Error("Failed to fetch. No response");
          }
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
  }, [evidenceListId, evidenceRefresh]);

  const handleUpload = async (evidenceListId: string) => {
    if (!sharedState.revision_id) {
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
      const response = await backendFetch(
        `/api/evidence/${evidenceListId}/evidence/`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response) {
        throw new Error("Failed to fetch. No response");
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

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

  const deleteEvidence = (evidenceListId: string, evidence_id: string) => {
    backendFetch(`/api/evidence/${evidenceListId}/evidence/${evidence_id}/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error("Failed to fetch. No response");
        }
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
  };

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Paper className="min-h-[300px]">
      <Group>
        <Text fw={500} size="lg" ref={targetRef}>
          {sectionName || "Evidence"}
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
              <ActionIcon onClick={() => handleUpload(evidenceListId)}>
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
      {sectionDescription && <Text size="sm">{sectionDescription}</Text>}
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
          <EvidenceList
            evidenceListId={evidenceListId}
            evidenceRefresh={evidenceRefresh}
            setEvidenceRefresh={setEvidenceRefresh}
          />
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
                    onDelete={() =>
                      deleteEvidence(evidenceListId, evidence.id.toString())
                    }
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
  );
}
