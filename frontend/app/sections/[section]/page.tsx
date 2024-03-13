"use server";

import { redirect } from "next/navigation";

import { sections, controls } from "@/lib/static-data";

import SectionDash from "./section-client";

export async function generateStaticParams() {
  return sections.map((section) => {
    return {
      section: section.section,
    };
  });
}

export default async function Section({
  params,
}: {
  params: { section: string };
}) {
  if (
    !sections.some(
      (sectionsSection) => sectionsSection.section === params.section,
    )
  ) {
    redirect("/not-found");
  }

  const sectionData = controls
    .filter((control) => {
      const regex = new RegExp(
        `${params.section.replace(".", "\\.")}\.[0-9]{1,2}`,
      );
      return regex.test(control.section.trim());
    })
    .sort((a, b) => {
      const sectionA = a.section.split(".").map(Number);
      const sectionB = b.section.split(".").map(Number);

      const maxLength = Math.max(sectionA.length, sectionB.length);
      for (let i = 0; i < maxLength; i++) {
        if ((sectionA[i] || 0) < (sectionB[i] || 0)) return -1;
        if ((sectionA[i] || 0) > (sectionB[i] || 0)) return 1;
      }

      return 0; // If equal
    });

  return (
    <div>
      <SectionDash controls={sectionData} />
    </div>
  );
}
