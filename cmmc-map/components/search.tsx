"use client";

import { useState, useContext } from "react";
import { TextInput, Popover, ScrollArea, Text, Group } from "@mantine/core";
import Link from "next/link";

import { StateContextType, StateContext } from "@/components/state-provider";
import { Control, controls } from "@/lib/static-data";

import styles from "./search.module.css";

interface SearchResultProps {
  controls: Control[];
}

const SearchResult: React.FC<SearchResultProps> = ({ controls }) => {
  return (
    <ScrollArea style={{ height: 200 }} scrollbarSize={8}>
      {controls.length > 0 ? (
        controls.map((control) => {
          // Split the section string to extract parts
          const sectionParts = control.section.split(".");
          // Construct URL by taking only the first two parts
          const sectionUrl = `${sectionParts[0]}.${sectionParts[1]}`;

          return (
            <Link
              key={control.id}
              href={`/sections/${sectionUrl}/${control.section}`}
              className="text-inherit no-underline"
            >
              <Group wrap="nowrap" className={styles.searchlink}>
                <Text size="sm" fw={500}>
                  {control.section} - {control.section_name}
                </Text>
                <Text size="xs" color="dimmed">
                  {control.brief_description}
                </Text>
              </Group>
            </Link>
          );
        })
      ) : (
        <Text size="sm" p={16}>
          No results found
        </Text>
      )}
    </ScrollArea>
  );
};

export default function SearchBar() {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);
  const [query, setQuery] = useState<string>("");
  const [filteredControls, setFilteredControls] = useState<Control[]>([]);
  const [opened, setOpened] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.currentTarget.value.toLowerCase();
    setQuery(event.currentTarget.value);

    if (searchQuery.trim() === "") {
      setFilteredControls([]);
      setOpened(false);
    } else {
      const filtered = controls.filter(
        (control) =>
          control.section_name.toLowerCase().includes(searchQuery) ||
          control.section.toLowerCase().includes(searchQuery) ||
          control.further_discussion.toLowerCase().includes(searchQuery) ||
          control.discussion.toLowerCase().includes(searchQuery) ||
          control.brief_description.toLowerCase().includes(searchQuery),
      );
      setFilteredControls(filtered);
      setOpened(true);
    }
  };

  return (
    <Popover
      opened={opened && filteredControls.length > 0}
      position="bottom"
      width="target"
      onClose={() => setOpened(false)}
    >
      <Popover.Target>
        <TextInput
          placeholder="Search controls"
          value={query}
          onChange={handleSearch}
          autoComplete="off"
        />
      </Popover.Target>
      <Popover.Dropdown>
        <SearchResult controls={filteredControls} />
      </Popover.Dropdown>
    </Popover>
  );
}
