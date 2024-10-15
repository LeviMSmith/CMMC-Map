"use server";

import Dashboard from "./dashboard-client";

export default async function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}
