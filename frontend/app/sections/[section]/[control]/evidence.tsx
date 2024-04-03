"use client";

import { Center, Loader, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

import NextImage from "next/image";
import { useEffect, useState } from "react";

import styles from "./control-client.module.css";

export interface Evidence {
  id: number;
  file?: string;
  link?: string;
  description?: string;
}

export const isImage = (fileName) => {
  return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
};

export function EvidenceList({
  backendUrl,
}: {
  backendUrl: string | undefined;
}) {
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false); // New state for tracking error

  const fetchEvidence = () => {
    setError(false); // Reset error state on new fetch attempt
    if (backendUrl) {
      fetch(`${backendUrl}/api/evidence/?page=${page}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setEvidences((prev) => [...prev, ...data.results]);
            });
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("Failed to get evidence list!", error);
          setError(true); // Set error state to true on fetch failure
        });
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [page, backendUrl]);

  return (
    <>
      {error ? (
        <Center style={{ height: 300 }}>
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
              <div key={`Evidence List ${index}`} className="text-center m-4">
                <div className={styles.imageContainer}>
                  {evidence.file && isImage(evidence.file) ? (
                    <NextImage
                      src={evidence.file}
                      alt={
                        evidence.description || evidence.file.split("/").pop()
                      }
                      height={200}
                      width={200}
                      className={styles.image}
                      onClick={() => {
                        /* Function to download */
                      }}
                    />
                  ) : (
                    <IconFile className={styles.icon} width="96" height="96" />
                  )}
                </div>
                <Text ta="center" size="lg" fw={500} className="text-ellipsis">
                  {evidence.description || evidence.file.split("/").pop()}
                </Text>
              </div>
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
