import "./globals.css";
import { theme } from "../theme";

import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { StateProvider } from "@/components/state-provider";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "CMMC Map",
  description: "Web app to handle CMMC Policy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <SessionProvider>
            <StateProvider>
              <Header />
              {children}
              <div className="h-16" />
            </StateProvider>
            <Notifications position="bottom-right" />
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
