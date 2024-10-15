"use client";

import cx from "clsx";
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
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconSearch,
  IconFileDescription,
  IconMenu2,
  IconPlus,
  IconSun,
  IconMoon,
  IconLogout,
  IconHome,
  IconTool,
  IconFileText,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  StateContext,
  State,
  StateContextType,
} from "@/components/state-provider";
import SearchBar from "@/components/search";
import { Revision, Assessment } from "@/lib/static-data";
import { backendFetch } from "@/lib/session";
import styles from "./header.module.css";

function CurrentUrlSections() {
  const router = useRouter();
  const pathname = usePathname();

  const path = pathname.split("?")[0].split("#")[0];
  const sections = path.split("/").filter(Boolean);

  if (sections[0] !== "sections") {
    return (
      <Button
        onClick={() => {
          router.push("/");
        }}
        variant="light"
        className="min-w-[100px]"
      >
        <IconHome />
      </Button>
    );
  }

  type PathAndLabel = {
    path: string;
    label: string;
    isHome: boolean; // Optional flag to indicate the home button
  };

  // Prepend a special "Home" entry to the navigation paths
  const pathsAndLabels: PathAndLabel[] = [
    { path: "/", label: "Home", isHome: true },
  ].concat(
    sections.slice(1).reduce<PathAndLabel[]>((acc, curr, index) => {
      // Start slice from 1 to exclude 'sections'
      const pathSoFar = "/" + sections.slice(0, index + 2).join("/"); // Adjust index due to slicing
      const label = curr;
      acc.push({ path: pathSoFar, label: label, isHome: false });
      return acc;
    }, []),
  );

  return (
    <Group>
      {pathsAndLabels.map(({ path, label, isHome }, index) => (
        <Button
          key={index}
          variant="light"
          disabled={index === pathsAndLabels.length - 1}
          onClick={() => router.push(path)}
          className="min-w-[100px]"
        >
          {isHome ? <IconHome /> : label}{" "}
        </Button>
      ))}
    </Group>
  );
}

interface AddIconProps {
  addUrl?: string;
  disableText?: string;
  placeholder?: string;
  refresh?: () => void;
}

const AddIcon: React.FC<AddIconProps> = ({
  addUrl,
  disableText,
  placeholder,
  refresh,
}: AddIconProps) => {
  const [newRevisionOpen, setNewRevisionOpen] = useState<boolean>(false);
  const [newRevisionName, setNewRevisionName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!newRevisionName.trim()) return; // Prevent submitting empty names

    setIsLoading(true);
    try {
      if (!addUrl) {
        throw new Error("addUrl not set!");
      }
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
      if (!response) {
        throw new Error("Failed to add revision : didn't get a response");
      }

      if (response.ok && refresh) {
        // Handle successful submission
        console.log("Revision added successfully");
        setNewRevisionName("");
        setNewRevisionOpen(false);
        refresh();
      } else {
        // Handle server errors or invalid responses
        console.error("Failed to add");
        notifications.show({
          title: "Couldn't add.",
          message: "Got a backend error",
          color: "red",
        });
      }
    } catch (error) {
      // Handle network errors
      console.error("Error submitting revision:", error);
      notifications.show({
        title: "Couldn't add.",
        message: "Got a network error",
        color: "red",
      });
    } finally {
      setIsLoading(false); // End loading regardless of outcome
    }
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
        <div className="flex items-center">
          <TextInput
            value={newRevisionName}
            onChange={(e) => setNewRevisionName(e.currentTarget.value)}
            placeholder={placeholder || "Enter new name"}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          {isLoading && <Loader size="xs" style={{ marginLeft: 10 }} />}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

interface SelectOption {
  value: string;
  label: string;
}

const RevisionAddIcon = () => {
  return (
    <Link href="/add-revision">
      <Tooltip label="Manage revisions">
        <ActionIcon variant="subtle">
          <IconTool />
        </ActionIcon>
      </Tooltip>
    </Link>
  );
};

const RevisionSelect = ({
  revisionOptions,
  sharedState,
  setSharedState,
}: {
  revisionOptions: SelectOption[] | undefined;
  sharedState: State;
  setSharedState: (newState: State) => void;
}) => {
  const router = useRouter();
  // Scenario 1: revisionOptions is undefined
  if (revisionOptions === undefined) {
    return <Loader type="dots" />;
  }

  const refresh = () => {
    setSharedState({
      ...sharedState,
      refreshRevisions: !sharedState.refreshRevisions,
      revision_id: undefined,
    });
  };

  // Scenario 2: revisionOptions is an empty array
  if (revisionOptions.length === 0) {
    return (
      <Group>
        <Text>Add revision</Text>
        <RevisionAddIcon />
      </Group>
    );
  }

  const RevisionButtons = () => {
    return (
      <Group wrap="nowrap" justify="center" gap={2}>
        <Tooltip label="Configure Revision Header">
          <ActionIcon
            variant="subtle"
            onClick={() => {
              router.push("/configure-revision");
            }}
          >
            <IconFileText />
          </ActionIcon>
        </Tooltip>
        <RevisionAddIcon />
      </Group>
    );
  };

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
      rightSection={RevisionButtons()}
      rightSectionWidth={60}
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

  const refresh = () => {
    setSharedState({
      ...sharedState,
      refreshRevisions: !sharedState.refreshRevisions,
      revision_id: undefined,
    });
  };

  // Scenario 2: assessmentOptions is an empty array
  if (assessmentOptions.length === 0) {
    return (
      <Group>
        <Text>Add assessment</Text>
        <AddIcon
          addUrl={`/api/revisions/${sharedState.revision_id}/assessments/`}
          refresh={refresh}
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
        refresh: refresh,
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
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await backendFetch(`/api/revisions/`);
        if (!res) {
          throw new Error("No response");
        }
        if (!res.ok) {
          throw new Error(`Network error ${res.status}`);
        }

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
    if (revisions) {
      const revision = revisions.find(
        (orevision) => orevision.id === sharedState.revision_id,
      );
      const revCompleted = revision?.date_completed ? true : false;
      setSharedState({ ...sharedState, revCompleted });
    }
  }, [sharedState.revision_id, revisions]);

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
        if (!res) {
          throw new Error("No response");
        }
        if (!res.ok) {
          throw new Error(`Network error ${res.status}`);
        }
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

        if (assessments.length > 0) {
          setAssessments(assessments);
          setSharedState({
            ...sharedState,
            assessment_id: assessments[assessments.length - 1].id,
          });
        }
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

  const pathname = usePathname();

  const path = pathname.split("?")[0].split("#")[0];
  const sections = path.split("/").filter(Boolean);

  if (sections[0] === "login") {
    return null;
  }

  var revisionOptions: SelectOption[] | undefined;
  if (revisions !== undefined && revisions.length > 0) {
    revisionOptions = revisions.map((revision: Revision) => {
      return {
        value: revision.id,
        label: revision.date_completed
          ? revision.version
          : `${revision.version} (Draft)`,
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

  const handleLogout = () => {
    try {
      backendFetch("/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((response) => {
        if (!response) {
          throw new Error("No response");
        }
        if (response.ok) {
          console.log("Successfully logged out.");

          router.push("/login");
          setMenuOpen(false);
        } else {
          console.error("Failed to logout.");
        }
      });
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

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
          <SearchBar />
        </Stack>
        <Stack className={styles.headersection}>
          <Text fw={700}>Reports</Text>
          <Button
            variant="light"
            onClick={() => {
              router.push("/ssp");
              setMenuOpen(false);
            }}
          >
            System Security Plan
          </Button>
          <Tooltip label="In Development">
            <Button
              variant="light"
              onClick={() => {
                router.push("/poam");
                setMenuOpen(false);
              }}
              disabled
            >
              Plan of Action and Milestones
            </Button>
          </Tooltip>
        </Stack>
        <Stack className={styles.headersection}>
          <Text fw={700}>Account</Text>
          <Button variant="light" onClick={handleLogout}>
            <div className="flex justify-center items-center gap-2">
              Logout
              <IconLogout />
            </div>
          </Button>
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
        <div className="flex justify-end items-end my-2 gap-4">
          <RevisionSelect
            revisionOptions={revisionOptions}
            sharedState={sharedState}
            setSharedState={setSharedState}
          />
          <Group>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light",
                )
              }
              variant="default"
              size="lg"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} />
              <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} />
            </ActionIcon>
          </Group>
          {session?.user ? (
            <Button variant="light" onClick={() => signOut()}>
              {session.user.name}
            </Button>
          ) : (
            <Button variant="light" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </div>
      </Group>
    </header>
  );
}
