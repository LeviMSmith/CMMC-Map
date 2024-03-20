"use server";

import { redirect } from "next/navigation";

import { controls } from "@/lib/static-data";

import ControlDash from "./control-client";

export async function generateStaticParams() {
  return controls.map((control) => {
    return {
      control: control.section,
    };
  });
}

export default async function Control({
  params,
}: {
  params: { control: string };
}) {
  // TODO: Should also ensure the section matches the major section. Might have to do that in the client with react.
  if (
    !controls.some(
      (controlsControl) => controlsControl.section === params.control,
    )
  ) {
    redirect("/not-found");
  }

  return <ControlDash control={params.control} controls={controls} />;
}
