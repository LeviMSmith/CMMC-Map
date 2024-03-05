import fsPromises from "fs/promises";

export interface MinorSection {
  section: string;
  brief_description: string;
}

export interface MajorSection {
  section: string;
  title: string;
  minorSections: MinorSection[];
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
