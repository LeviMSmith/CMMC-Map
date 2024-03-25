import type { Metadata } from "next";
import "./globals.css";
import { theme } from "../theme";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { StateProvider } from "@/components/state-provider";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "CMMC Handler",
  description: "Web app to handle CMMC Policy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backendUrl: string | undefined = process.env.BACKEND_URL;

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <StateProvider backendUrl={backendUrl}>
            <Header backendUrl={backendUrl} />
            {children}
          </StateProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
