"use client";

import {
  IconChevronRight,
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
} from "@tabler/icons-react";

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

export default function Nav() {
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
  );
}
