import { listSections, MajorSection, MinorSection } from "@/lib/db";

import Dashboard from "./dash-client.tsx";

export default async function Home() {
  const sections: MajorSection[] = await listSections();

  return (
    <main>
      <Dashboard sections={sections} />
    </main>
  );
}
