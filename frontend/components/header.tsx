"use client";

import {
  Stack,
  Text,
  Button,
  Group,
  Drawer,
  Title,
  ActionIcon,
  TextInput,
  Popover,
  Select,
  Loader,
  Tooltip,
} from "@mantine/core";
import {
  IconSearch,
  IconFileDescription,
  IconMenu2,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

import {
  StateContext,
  State,
  StateContextType,
} from "@/components/state-provider";
import { Revision, Assessment } from "@/lib/static-data";
import { backendFetch } from "@/lib/session";
import styles from "./header.module.css";

function CurrentUrlSections() {
  const router = useRouter();
  const pathname = usePathname();

  const path = pathname.split("?")[0].split("#")[0];

  const sections = path.split("/").filter(Boolean);

  const navigateTo = (path: string) => () => {
    router.push(path);
  };

  type PathAndLabel = {
    path: string;
    label: string;
  };

  const pathsAndLabels: PathAndLabel[] = sections.reduce<PathAndLabel[]>(
    (acc, curr, index) => {
      const pathSoFar = "/" + sections.slice(0, index + 1).join("/");
      const label = curr;
      acc.push({ path: pathSoFar, label });
      return acc;
    },
    [],
  );

  return (
    <Group>
      {pathsAndLabels.map(({ path, label }, index) => (
        <Button
          key={index}
          variant="light"
          disabled={index === pathsAndLabels.length - 1}
          onClick={navigateTo(path)}
        >
          {label}
        </Button>
      ))}
    </Group>
  );
}

interface AddIconProps {
  addUrl: string;
  disableText?: string;
  placeholder?: string;
}

const AddIcon: React.FC<AddIconProps> = ({
  addUrl,
  disableText,
  placeholder,
}) => {
  const [newRevisionOpen, setNewRevisionOpen] = useState<boolean>(false);
  const [newRevisionName, setNewRevisionName] = useState<string>("");

  const handleSubmit = async () => {
    if (!newRevisionName.trim()) return; // Prevent submitting empty names

    // Here you would call your API to add the new revision
    console.log("Submitting new revision name:", newRevisionName);
    // Example POST request using fetch API
    try {
      const response = await backendFetch(addUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: newRevisionName,
          name: newRevisionName,
        }),
      });
      if (response.ok) {
        // Handle successful submission
        console.log("Revision added successfully");
      } else {
        // Handle server errors or invalid responses
        console.error("Failed to add revision");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error submitting revision:", error);
    }
    // Reset state and close popover
    setNewRevisionName("");
    setNewRevisionOpen(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  if (disableText) {
    return (
      <Tooltip label={disableText}>
        <ActionIcon variant="subtle" disabled>
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    );
  }

  return (
    <Popover opened={newRevisionOpen} onChange={setNewRevisionOpen}>
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          onClick={() => setNewRevisionOpen((o) => !o)}
        >
          <IconPlus />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
          value={newRevisionName}
          onChange={(e) => setNewRevisionName(e.currentTarget.value)}
          placeholder={placeholder || "Enter new name"}
          onKeyPress={handleKeyPress}
          autoFocus // Automatically focus the input when the popover opens
        />
      </Popover.Dropdown>
    </Popover>
  );
};

interface SelectOption {
  value: string;
  label: string;
}

const RevisionSelect = ({
  revisionOptions,
  sharedState,
  setSharedState,
}: {
  revisionOptions: SelectOption[] | undefined;
  sharedState: State;
  setSharedState: (newState: State) => void;
}) => {
  // Scenario 1: revisionOptions is undefined
  if (revisionOptions === undefined) {
    return <Loader type="dots" />;
  }

  // Scenario 2: revisionOptions is an empty array
  if (revisionOptions.length === 0) {
    return (
      <Group>
        <Text>Add revision</Text>
        <AddIcon addUrl="/api/revisions/" />
      </Group>
    );
  }

  // Scenario 3: revisionOptions is a populated array
  return sharedState?.revision_id ? (
    <Select
      description="Revision"
      value={sharedState.revision_id}
      data={revisionOptions}
      onChange={(value, option) => {
        setSharedState({
          ...sharedState,
          revision_id: value,
        });
      }}
      rightSectionPointerEvents="auto"
      rightSection={AddIcon({ addUrl: "/api/revisions/" })}
      allowDeselect={false}
    />
  ) : (
    <Loader type="dots" />
  );
};

const AssessmentSelect = ({
  assessmentOptions,
  sharedState,
  setSharedState,
}: {
  assessmentOptions: SelectOption[] | undefined;
  sharedState: State;
  setSharedState: (newState: State) => void;
}) => {
  //Scenario 0: There is no selected revision
  if (!sharedState?.revision_id) {
    return (
      <Group>
        <Text>Add assessment</Text>
        <AddIcon disableText="Please select a revision first" />
      </Group>
    );
  }

  // Scenario 1: assessmentOptions is undefined
  if (assessmentOptions === undefined) {
    return <Loader type="dots" />;
  }

  // Scenario 2: assessmentOptions is an empty array
  if (assessmentOptions.length === 0) {
    return (
      <Group>
        <Text>Add assessment</Text>
        <AddIcon
          addUrl={`/api/revisions/${sharedState.revision_id}/assessments/`}
        />
      </Group>
    );
  }

  // Scenario 3: assessmentOptions is a populated array
  return sharedState?.assessment_id ? (
    <Select
      description="Assessment"
      value={sharedState.assessment_id}
      data={assessmentOptions}
      onChange={(value, option) => {
        setSharedState({
          ...sharedState,
          assessment_id: value,
        });
      }}
      rightSectionPointerEvents="auto"
      rightSection={AddIcon({
        addUrl: `/api/revisions/${sharedState.revision_id}/assessments/`,
      })}
      allowDeselect={false}
    />
  ) : (
    <Loader type="dots" />
  );
};

export default function Header() {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [revisions, setRevisions] = useState<Revision[] | undefined>();
  const [assessments, setAssessments] = useState<Assessment[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backendFetch(`/api/revisions/`);
        const data = await res.json();

        const revisions: Revision[] = data.map((revision: Revision) => {
          // Check if date_completed is not null before converting
          const dateCompleted = revision.date_completed
            ? new Date(revision.date_completed)
            : null;

          return {
            id: revision.id.toString(),
            version: revision.version,
            date_completed: dateCompleted,
          };
        });

        setRevisions(revisions);
        if (revisions.length === 0) {
          return;
        }

        if (!sharedState.revision_id) {
          setSharedState({
            ...sharedState,
            revision_id: revisions[revisions.length - 1].id,
          });
        }
      } catch (error) {
        setRevisions([]);
        console.error("Failed to fetch revisions", error);
      }
    };

    fetchData();
  }, [sharedState.refreshRevisions]);

  useEffect(() => {
    const fetchAssessments = async (revisionId: string) => {
      try {
        const res = await backendFetch(
          `/api/revisions/${revisionId}/assessments/`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await res.json();
        const assessments = data.map((assessment: Assessment) => {
          const dateCompleted = assessment.finished
            ? new Date(assessment.finished)
            : null;

          return {
            id: assessment.id.toString(),
            name: assessment.name,
            started: new Date(assessment.started),
            finished: dateCompleted,
          };
        });

        setAssessments(assessments);
        setSharedState({
          ...sharedState,
          assessment_id: assessments[assessments.length - 1].id,
        });
      } catch (error) {
        console.error(
          `Failed to fetch assessments for revision ${revisionId}`,
          error,
        );
        setAssessments([]);
      }
    };

    if (sharedState && sharedState.revision_id) {
      fetchAssessments(sharedState.revision_id);
    }
  }, [sharedState.revision_id]);

  var revisionOptions: SelectOption[] | undefined;
  if (revisions !== undefined && revisions.length > 0) {
    revisionOptions = revisions.map((revision: Revision) => {
      return {
        value: revision.id,
        label: revision.version,
      };
    });
  } else if (revisions !== undefined && revisions.length === 0) {
    revisionOptions = [];
  }

  var assessmentOptions: SelectOption[] | undefined;
  if (assessments) {
    assessmentOptions = assessments.map((assessment: Assessment) => {
      return {
        value: assessment.id,
        label: assessment.name,
      };
    });
  }

  return (
    <header className={styles.header}>
      <Drawer
        opened={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
        title="Menu"
      >
        <Stack className={styles.headersection}>
          <Text fw={700}>Search</Text>
          <TextInput placeholder="AI powered search" />
        </Stack>
        <Stack className={styles.headersection}>
          <Text fw={700}>Export Report</Text>
          <Button variant="light">System Security Plan</Button>
          <Button variant="light">Plan of Action and Milestones</Button>
        </Stack>
      </Drawer>
      <Group justify="space-between">
        <Group>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <IconMenu2 />
          </ActionIcon>
          <CurrentUrlSections />
        </Group>
        <Group
          wrap="nowrap"
          justify="space-around"
          p={8}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 min-w-24"
        >
          <RevisionSelect
            revisionOptions={revisionOptions}
            sharedState={sharedState}
            setSharedState={setSharedState}
          />
          <AssessmentSelect
            assessmentOptions={assessmentOptions}
            sharedState={sharedState}
            setSharedState={setSharedState}
          />
        </Group>
      </Group>
    </header>
  );
}
