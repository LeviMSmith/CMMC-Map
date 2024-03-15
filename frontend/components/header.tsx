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

const AssessmentSelect = ({
  assessmentOptions,
  sharedState,
  setSharedState,
}) => {
  // Scenario 1: assessmentOptions is undefined
  if (assessmentOptions === undefined) {
    return <Loader type="dots" />;
  }

  // Scenario 2: assessmentOptions is an empty array
  // if (assessmentOptions.length === 0) {
  //   return <Button variant="light">Create new assessment</Button>;
  // }
  if (assessmentOptions.length === 0) {
    return <Select description="Assessment" />;
  }

  const addIcon = () => {
    return (
      <ActionIcon
        onClick={() => {
          console.log("assessment button");
        }}
      >
        <IconPlus />
      </ActionIcon>
    );
  };
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
      rightSectionPointerEvents={() => {}}
      rightSection={addIcon()}
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

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("BACKEND_URL is not set!");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/revisions`);
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
        if (!sharedState) {
          setSharedState({
            revision_id: revisions[revisions.length - 1].id,
          });
        } else {
          if (!sharedState.revision_id) {
            setSharedState({
              ...sharedState,
              revision_id: revisions[revisions.length - 1].id,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch revisions", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAssessments = async (revisionId: string) => {
      try {
        const res = await fetch(
          `${backendUrl}/api/revisions/${revisionId}/assessments`,
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
  }, [sharedState?.revision_id]);

  var revisionOptions;
  if (revisions) {
    revisionOptions = revisions.map((revision: Revision) => {
      return {
        value: revision.id,
        label: revision.version,
      };
    });
  }

  var assessmentOptions;
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
          {revisionOptions && sharedState?.revision_id ? (
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
              allowDeselect={false}
            />
          ) : (
            <Loader type="dots" />
          )}
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
