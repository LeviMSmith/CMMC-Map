import fsPromises from "fs/promises";

interface Control {
  id: number;
  level: number;
  section: string;
  brief_description: string;
  assessment_objects: {
    [key: string]: string;
  };
  examine: string;
  interview: string;
  test: string;
  discussion: string;
  further_discussion: string;
  fd_pac: string[];
  fd_examples: string[];
  key_references: string[];
}

export async function listSections(): Promise<MajorSection[]> {
  try {
    const filePath = "./lib/sections.json";
    const data = await fsPromises.readFile(filePath);
    const sections: MajorSection[] = JSON.parse(data);

    return sections;
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    throw error;
  }
}
