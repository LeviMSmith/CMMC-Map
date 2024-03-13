"use server";

import Dashboard from "./dashboard-client.tsx";

export default async function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
