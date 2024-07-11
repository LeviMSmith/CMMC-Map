"use client";

import {
  ActionIcon,
  Button,
  Center,
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
import {
  IconCheck,
  IconChevronCompactLeft,
  IconChevronCompactRight,
  IconPlus,
  IconMinus,
  IconQuestionMark,
  IconListCheck,
  IconX,
} from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";
import NextImage from "next/image";
import NextLink from "next/link";

import {
  StateContextType,
  StateContext,
  ControlProgress,
} from "@/components/state-provider";
import { Control } from "@/lib/static-data";
import { backendFetch } from "@/lib/session";

import { EvidenceAdd } from "@/components/evidence";
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

  const currentControlProgress = sharedState.controlProgress?.find(
    (element: ControlProgress) => element.id === control.id,
  );

  const evidenceListId: string | null = currentControlProgress
    ? currentControlProgress.evidence_list.toString()
    : null;

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
          : "n",
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
      if (activeTab && sharedState.revision_id && control.id && description) {
        const implementationStatus = getImplementationStatus(activeTab);
        const bodyData = {
          [`${activeTab}_description`]: description,
          implementation_status: implementationStatus,
        };

        backendFetch(
          `/api/revisions/${sharedState.revision_id}/policy/${control.id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(bodyData),
          },
        )
          .then((response) => {
            if (!response) {
              throw new Error("Failed to fetch. No response");
            }
            if (!response.ok) {
              // If the response is not ok, throw an error to be caught by the catch block
              throw new Error("Failed to fetch. Status: " + response.status);
            }
            return response.json(); // Return the promise to the next then() if ok
          })
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
      } else {
        console.error(
          "Bad vars. Not submitting.",
          activeTab,
          sharedState.revision_id,
          control.id,
          description,
        );
        notifications.show({
          title: "Failed to update policy!",
          message: "Try again later.",
          color: "red",
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

  const prev_control = controls.find((item) => item.id === control.id - 1);
  const next_control = controls.find((item) => item.id === control.id + 1);

  const major_pattern = /3\.\d{1,2}/;

  let prev_control_major: null | string = null;
  if (prev_control) {
    const match = prev_control.section.match(major_pattern);
    prev_control_major = match ? match[0] : null;
  }

  let next_control_major: null | string = null;
  if (next_control) {
    const match = next_control.section.match(major_pattern);
    next_control_major = match ? match[0] : null;
  }

  return (
    <>
      {prev_control && prev_control_major ? (
        <NextLink
          href={`/sections/${prev_control_major}/${prev_control.section}`}
          className="text-inherit"
        >
          <div className={`${styles.arrowleft} ${styles.arrow}`}>
            <IconChevronCompactLeft size={50} />
          </div>
        </NextLink>
      ) : null}
      {next_control && next_control_major ? (
        <NextLink
          href={`/sections/${next_control_major}/${next_control.section}`}
          className="text-inherit"
        >
          <div className={`${styles.arrowright} ${styles.arrow}`}>
            <IconChevronCompactRight size={50} />
          </div>
        </NextLink>
      ) : null}
      <Container>
        <Paper className={styles.card}>
          <h2 className="lessbigtitle">{control.section_name}</h2>
          <Text>{control.brief_description}</Text>
        </Paper>
        <Divider className="my-4" label="Policy" />
        <Paper className={styles.card}>
          <Tabs
            variant="outline"
            className="w-full"
            value={activeTab}
            onChange={(value) => setActiveTab(value)}
            defaultValue="n"
            color="gray"
          >
            <Center>
              <Tabs.List>
                <Tabs.Tab value="policy">
                  <div className="flex items-center justify-center gap-2">
                    <IconCheck
                      className={`${activeTab === "policy" ? "text-green-500" : "default-color-class"}`}
                    />
                    <Text ta="center">Implemented</Text>
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="plan">
                  <div className="flex items-center justify-center gap-2">
                    <IconListCheck
                      className={`${activeTab === "plan" ? "text-yellow-400" : "default-color-class"}`}
                    />
                    <Text ta="center">Planned to be Implemented</Text>
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="na">
                  <div className="flex items-center justify-center gap-2">
                    <IconMinus
                      className={`${activeTab === "na" ? "text-teal-400" : "default-color-class"}`}
                    />
                    <Text ta="center">Not Applicable</Text>
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="n">
                  <div className="flex items-center justify-center gap-2">
                    <IconX
                      className={`${activeTab === "n" ? "text-red-500" : "default-color-class"}`}
                    />
                    <Text ta="center">Unset</Text>
                  </div>
                </Tabs.Tab>
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
            <Tabs.Panel value="n">
              <div className="flex justify-center items-center h-[250px]">
                <IconX />
                <Text fw={300}>Unset! Choose another tab to get started.</Text>
              </div>
            </Tabs.Panel>
          </Tabs>
        </Paper>
        <Divider className="my-4" label="Evidence" />
        <Paper className={styles.card}>
          {evidenceListId ? (
            <EvidenceAdd evidenceListId={evidenceListId} />
          ) : (
            <Text>Failed to load evidence for this policy!</Text>
          )}
        </Paper>
      </Container>
    </>
  );
}
