"use client"

import {
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

export default function Toolbar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("auto", {
    getInitialValueInEffect: true,
  });

  return (
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
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="filled"
            size="lg"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </header>;
  )
}
