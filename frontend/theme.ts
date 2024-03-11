"use client";

import { createTheme } from "@mantine/core";
import { Montserrat } from "next/font/google";

const mainFont = Montserrat({
  subsets: ["latin"],
});

export const theme = createTheme({
  primaryColor: "green",
  fontFamily: mainFont.style.fontFamily,
});
