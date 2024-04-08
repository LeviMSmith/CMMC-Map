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
  disableText?: string; // Marking disableText as optional with '?'
}

const AddIcon: React.FC<AddIconProps> = ({
  disableText,
  revision,
}: {
  disableText: string | undefined;
  addUrl: string;
}) => {
  const [newRevisionOpen, setNewRevisionOpen] = useState<boolean>(false);
  const [newRevisionName, setNewRevisionName] = useState<string>("");

  if (disableText) {
    return (
      <>
        <Tooltip label={disableText}>
          <ActionIcon
            variant="subtle"
            disabled
            onClick={(event) => event.preventDefault()}
          >
            <IconPlus />
          </ActionIcon>
        </Tooltip>
      </>
    );
  }

  return (
    <ActionIcon
      variant="subtle"
      onClick={() => {
        console.log("add button");
      }}
    >
      <IconPlus />
    </ActionIcon>
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
        <AddIcon />
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
      rightSection={AddIcon({})}
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
        <AddIcon />
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
      rightSection={AddIcon({})}
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
