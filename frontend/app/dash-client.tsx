"use client";

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
} from "@tabler/icons-react";
import { useState } from "react";
import { MajorSection, MinorSection } from "@/lib/db";
import classes from "./dash-client.module.css";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

function formatSections({
  sections,
}: {
  sections: MajorSection[];
}): LinksGroupProps[] {
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

  return sections.map((section, index) => {
    const icon = icons[index % icons.length];

    return {
      icon: icon,
      label: `${section.section} ${section.title}`,
      initiallyOpened: false,
      links: section.minorSections.map((minorSection) => {
        return {
          label: `${minorSection.section} ${minorSection.brief_description}`,
          link: "#",
        };
      }),
    };
  });
}

function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

export default function Dashboard({ sections }: { sections: MajorSection[] }) {
  const formatedSections = formatSections({ sections: sections });

  const links = formatedSections.map((item) => (
    <LinksGroup {...item} key={item.section} />
  ));

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
          <Group justify="center" className="border-solid border-0 border-b-2">
            <Text fw={700}>Revision:</Text>
            <Text>0.1.0 (Draft)</Text>
            <Text fw={700}>Assessment:</Text>
            <Text> Continuous</Text>
          </Group>
        </header>
      </div>
    </div>
  );
}
