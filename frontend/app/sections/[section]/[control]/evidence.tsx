"use client";

import {
  ActionIcon,
  Center,
  Group,
  Loader,
  ScrollArea,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFile, IconPlus, IconX, IconEye } from "@tabler/icons-react";

import NextImage from "next/image";
import { useEffect, useState } from "react";

import { backendFetch } from "@/lib/session";
import { State } from "@/components/state-provider";
import styles from "./control-client.module.css";

export interface Evidence {
  id: number;
  file: string;
  link?: string;
  description?: string;
}

export const isImage = (fileName: string): boolean => {
  return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
};

function associateEvidenceToPolicy(
  evidenceId: number,
  sharedState: State,
  controlId: number,
  evidenceRefresh: any,
  setEvidenceRefresh: any,
) {
  if (sharedState.revision_id && controlId) {
    // Constructing the URL for associating evidence to the policy
    const url = `/api/revisions/${sharedState.revision_id}/policy/${controlId}/evidence/${evidenceId}/`;

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
  } else {
    console.error("Missing required information to associate evidence.");
    notifications.show({
      title: "Operation failed",
      message: "Missing required information to associate evidence.",
      color: "red",
    });
  }
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
  sharedState,
  controlId,
  evidenceRefresh,
  setEvidenceRefresh,
}: {
  sharedState: State;
  controlId: number;
  evidenceRefresh: any;
  setEvidenceRefresh: any;
}) {
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false); // New state for tracking error

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
              setEvidences((prev) => [...prev, ...data.results]);
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
        setError(true); // Set error state to true on fetch failure
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
      ) : evidences.length > 0 ? (
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
            {evidences.map((evidence, index) => (
              <EvidenceDisplay
                key={`Evidence list ${index}`}
                evidence={evidence}
                onAdd={() => {
                  associateEvidenceToPolicy(
                    evidence.id,
                    sharedState,
                    controlId,
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
