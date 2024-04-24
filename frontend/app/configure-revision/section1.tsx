"use client";

import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";

import { StateContextType, StateContext } from "@/components/state-provider";
import { backendFetch } from "@/lib/session";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function SystemInformationForm({
  revision,
}: {
  revision: Revision;
}) {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  // Ideally we'd validate these, but that's for projects with more than one dev
  // Plus the backend won't accept bad values, so at least the fetch will fail.
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      systemName: revision.system_name,
      systemCategory: revision.system_category,
      systemUniqueId: revision.system_unique_id,
      responsibleOrgName: revision.responsible_org_name,
      responsibleOrgAddr: revision.responsible_org_addr,
      responsibleOrgPhone: revision.responsible_org_phone,
      infoOwnerName: revision.info_owner_name,
      infoOwnerTitle: revision.info_owner_title,
      infoOwnerAddr: revision.info_owner_addr,
      infoOwnerPhone: revision.info_owner_phone,
      infoOwnerEmail: revision.info_owner_email,
      sysOwnerName: revision.sys_owner_name,
      sysOwnerTitle: revision.sys_owner_title,
      sysOwnerAddr: revision.sys_owner_addr,
      sysOwnerPhone: revision.sys_owner_phone,
      sysOwnerEmail: revision.sys_owner_email,
      sysSecName: revision.sys_sec_name,
      sysSecTitle: revision.sys_sec_title,
      sysSecAddr: revision.sys_sec_addr,
      sysSecPhone: revision.sys_sec_phone,
      sysSecEmail: revision.sys_sec_email,
      systemDescription: revision.system_description,
      numEndUsers: revision.num_end_users,
      numAdminUsers: revision.num_admin_users,
      informationDescription: revision.information_description,
    },
  });

  const handleSubmit = (values: any) => {
    try {
      if (!sharedState.revision_id) {
        throw new Error("Revision id not set! Can't update it.");
      }
      backendFetch(`/api/revisions/${sharedState.revision_id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: revision.version,
          system_name: values.systemName,
          system_category: values.systemCategory,
          system_unique_id: values.systemUniqueId,
          responsible_org_name: values.responsibleOrgName,
          responsible_org_addr: values.responsibleOrgAddr,
          responsible_org_phone: values.responsibleOrgPhone,
          info_owner_name: values.infoOwnerName,
          info_owner_title: values.infoOwnerTitle,
          info_owner_addr: values.infoOwnerAddr,
          info_owner_phone: values.infoOwnerPhone,
          info_owner_email: values.infoOwnerEmail,
          sys_owner_name: values.sysOwnerName,
          sys_owner_title: values.sysOwnerTitle,
          sys_owner_addr: values.sysOwnerAddr,
          sys_owner_phone: values.sysOwnerPhone,
          sys_owner_email: values.sysOwnerEmail,
          sys_sec_name: values.sysSecName,
          sys_sec_title: values.sysSecTitle,
          sys_sec_addr: values.sysSecAddr,
          sys_sec_phone: values.sysSecPhone,
          sys_sec_email: values.sysSecEmail,
          system_description: values.systemDescription,
          num_end_users: values.numEndUsers,
          num_admin_users: values.numAdminUsers,
          information_description: values.informationDescription,
        }),
      }).then((res) => {
        if (!res) {
          throw new Error("Didn't get a response on our save.");
        }

        if (!res.ok) {
          throw new Error(
            `Failed to save revision config. Response: ${res.status}`,
          );
        }

        notifications.show({
          title: "Saved!",
          message: null,
        });
      });
    } catch (error) {
      console.error("Failed to save revision config: ", error);
      notifications.show({
        title: "Failed to save.",
        message: "Try again later.",
        color: "red",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Title order={2} align="center">
        Section 1: System Information
      </Title>
      <Divider label="System Information" mt={32} mb={16} />
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            onClick={() => handleSubmit(form.getValues())}
            type="submit"
            size="xl"
          >
            <IconDeviceFloppy />
          </ActionIcon>
        </Affix>
        <TextInput
          label="System Name/Title"
          {...form.getInputProps("systemName")}
          key={(form.getInputProps("systemName") as any).key}
        />
        <TextInput
          label="System Categorization"
          {...form.getInputProps("systemCategory")}
          key={(form.getInputProps("systemCategory") as any).key}
        />
        <TextInput
          label="System Unique Identifier"
          {...form.getInputProps("systemUniqueId")}
          key={(form.getInputProps("systemUniqueId") as any).key}
        />

        {/* Responsible Organization */}
        <Divider label="Responsible Organization" mt={32} mb={16} />
        <TextInput
          label="Responsible Organization Name"
          {...form.getInputProps("responsibleOrgName")}
          key={(form.getInputProps("responsibleOrgName") as any).key}
        />
        <TextInput
          label="Address"
          {...form.getInputProps("responsibleOrgAddr")}
          key={(form.getInputProps("responsibleOrgAddr") as any).key}
        />
        <TextInput
          label="Phone"
          {...form.getInputProps("responsibleOrgPhone")}
          key={(form.getInputProps("responsibleOrgPhone") as any).key}
        />

        {/* Information Owner */}
        <Divider label="Information Owner" mt={32} mb={16} />
        <TextInput
          label="Information Owner Name"
          {...form.getInputProps("infoOwnerName")}
          key={(form.getInputProps("infoOwnerName") as any).key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("infoOwnerTitle")}
          key={(form.getInputProps("infoOwnerTitle") as any).key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("infoOwnerAddr")}
          key={(form.getInputProps("infoOwnerAddr") as any).key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("infoOwnerPhone")}
          key={(form.getInputProps("infoOwnerPhone") as any).key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("infoOwnerEmail")}
          key={(form.getInputProps("infoOwnerEmail") as any).key}
        />

        {/* System Owner */}
        <Divider label="System Owner" mt={32} mb={16} />
        <TextInput
          label="System Owner Name"
          {...form.getInputProps("sysOwnerName")}
          key={(form.getInputProps("sysOwnerName") as any).key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("sysOwnerTitle")}
          key={(form.getInputProps("sysOwnerTitle") as any).key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("sysOwnerAddr")}
          key={(form.getInputProps("sysOwnerAddr") as any).key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("sysOwnerPhone")}
          key={(form.getInputProps("sysOwnerPhone") as any).key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("sysOwnerEmail")}
          key={(form.getInputProps("sysOwnerEmail") as any).key}
        />

        {/* System Security Officer */}
        <Divider label="System Security Officer" mt={32} mb={16} />
        <TextInput
          label="System Security Officer Name"
          {...form.getInputProps("sysSecName")}
          key={(form.getInputProps("sysSecName") as any).key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("sysSecTitle")}
          key={(form.getInputProps("sysSecTitle") as any).key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("sysSecAddr")}
          key={(form.getInputProps("sysSecAddr") as any).key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("sysSecPhone")}
          key={(form.getInputProps("sysSecPhone") as any).key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("sysSecEmail")}
          key={(form.getInputProps("sysSecEmail") as any).key}
        />

        <Divider label="General System Information" mt={32} mb={16} />
        <Textarea
          label="General Description/Purpose of System"
          {...form.getInputProps("systemDescription")}
          key={(form.getInputProps("systemDescription") as any).key}
        />
        <Group grow>
          <NumberInput
            label="Number of end users"
            min={1}
            max={1000000}
            {...form.getInputProps("numEndUsers")}
            key={(form.getInputProps("numEndUsers") as any).key}
          />
          <NumberInput
            label="Number of privileged users"
            min={1}
            max={1000000}
            {...form.getInputProps("numAdminUsers")}
            key={(form.getInputProps("numAdminUsers") as any).key}
          />
        </Group>
        <Textarea
          label="General Description of Information"
          {...form.getInputProps("informationDescription")}
          key={(form.getInputProps("informationDescription") as any).key}
        />
      </form>
    </Box>
  );
}
