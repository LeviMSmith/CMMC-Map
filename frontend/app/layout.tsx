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
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <StateProvider>
            <Header />
            {children}
          </StateProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
