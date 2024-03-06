"use client";

import cx from "clsx";
import {
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  Group,
  ScrollArea,
  TextInput,
  Title,
  ActionIcon,
  Stack,
  Button,
  Paper,
  useMantineColorScheme,
  useComputedColorScheme,
  rem,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconChevronRight,
  IconLockAccess,
  IconBarbell,
  IconNotes,
  IconSettings,
  IconUser,
  IconVolcano,
  IconTool,
  IconDeviceTv,
  IconBadgeAd,
  IconFence,
  IconFingerprint,
  IconBomb,
  IconShieldLock,
  IconWifi,
  IconDatabase,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useState } from "react";
import { MajorSection, MinorSection } from "@/lib/db";
import classes from "./dash-client.module.css";

const icons = [
  IconLockAccess,
  IconBarbell,
  IconNotes,
  IconSettings,
  IconFingerprint,
  IconVolcano,
  IconTool,
  IconDeviceTv,
  IconUser,
  IconFence,
  IconBomb,
  IconShieldLock,
  IconWifi,
  IconDatabase,
];

export default function Dashboard({ sections }: { sections: MajorSection[] }) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("auto", {
    getInitialValueInEffect: true,
  });

  const [selectedSection, setSelectedSection] = useState<MinorSection | null>(
    null,
  );

  const links = sections.map((section, sectionIndex) => {
    const [opened, setOpened] = useState(false);
    const items = section.minorSections.map((minorSection) => (
      <UnstyledButton
        fw={minorSection == selectedSection ? 700 : 400}
        component="a"
        className={classes.link}
        key={minorSection.section}
        onClick={() => setSelectedSection(minorSection)}
      >
        {`${minorSection.section} ${minorSection.brief_description}`}
      </UnstyledButton>
    ));

    const Icon = icons[sectionIndex];

    return (
      <div key={section.section}>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{`${section.section} ${section.title}`}</Box>
            </Box>
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          </Group>
        </UnstyledButton>
        <Collapse in={opened}>{items}</Collapse>
      </div>
    );
  });

  return (
    <div className="flex">
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <Title>CMMC Policies</Title>
          <TextInput
            label="Search policies"
            description="Search still in development"
            placeholder="Monitoring strategies..."
          />
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
      <div className="w-full">
        <header>
          <Group
            justify="space-between"
            className="px-8 py-2 border-solid border-0 border-b-2"
          >
            <Group>
              <Text fw={700}>Revision:</Text>
              <Text>0.1.0 (Draft)</Text>
              <Text fw={700}>Assessment:</Text>
              <Text> Continuous</Text>
            </Group>
            <Group>
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light",
                  )
                }
                variant="filled"
                size="lg"
                aria-label="Toggle color scheme"
              >
                <IconSun
                  className={cx(classes.icon, classes.light)}
                  stroke={1.5}
                />
                <IconMoon
                  className={cx(classes.icon, classes.dark)}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Group>
        </header>
        {selectedSection ? (
          <div className="flex w-full p-4 items-start justify-between">
            <Paper p="8" className="w-full">
              <Title ta="center">{selectedSection.section}</Title>
              <div className={classes.colored_underline} />
              <Text size="lg" px="32">
                {selectedSection.brief_description}
              </Text>
            </Paper>
            <Stack className="w-1/4">
              <Button variant="filled">Examples</Button>
              <Button variant="filled">Interview</Button>
              <Button variant="filled">Test</Button>
            </Stack>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Text size="xl">Select a section to see its details</Text>
          </div>
        )}
      </div>
    </div>
  );
}
