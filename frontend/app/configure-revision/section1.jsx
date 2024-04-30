"use client";

import {
  ActionIcon,
  Affix,
  Button,
  Container,
  Divider,
  Group,
  NumberInput,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";

import { StateContext } from "@/components/state-provider";
import { EvidenceAdd } from "@/components/evidence";
import { backendFetch } from "@/lib/session";

export default function SystemInformationForm({ revision }) {
  const { sharedState, setSharedState } = useContext(StateContext);

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
      hardSoftMain: revision.hardsoft_main,
    },
  });

  const handleSubmit = (values) => {
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
          hardsoft_main: values.hardSoftMain,
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
    <Container>
      <Title order={2} ta="center">
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
          description="State the name of the system.  Spell out acronyms."
          {...form.getInputProps("systemName")}
          key={form.getInputProps("systemName").key}
        />
        <TextInput
          label="System Categorization"
          description='Usually "Moderate Impact for Confidentiality"'
          {...form.getInputProps("systemCategory")}
          key={form.getInputProps("systemCategory").key}
        />
        <TextInput
          label="System Unique Identifier"
          description="Usually a CAGE code or something like it."
          {...form.getInputProps("systemUniqueId")}
          key={form.getInputProps("systemUniqueId").key}
        />

        {/* Responsible Organization */}
        <Divider label="Responsible Organization" mt={32} mb={16} />
        <TextInput
          label="Responsible Organization Name"
          {...form.getInputProps("responsibleOrgName")}
          key={form.getInputProps("responsibleOrgName").key}
        />
        <TextInput
          label="Address"
          {...form.getInputProps("responsibleOrgAddr")}
          key={form.getInputProps("responsibleOrgAddr").key}
        />
        <TextInput
          label="Phone"
          {...form.getInputProps("responsibleOrgPhone")}
          key={form.getInputProps("responsibleOrgPhone").key}
        />

        {/* Information Owner */}
        <Divider label="Information Owner" mt={32} mb={16} />
        <TextInput
          label="Information Owner Name"
          description="Government point of contact responsible for providing and/or receiving CUI"
          {...form.getInputProps("infoOwnerName")}
          key={form.getInputProps("infoOwnerName").key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("infoOwnerTitle")}
          key={form.getInputProps("infoOwnerTitle").key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("infoOwnerAddr")}
          key={form.getInputProps("infoOwnerAddr").key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("infoOwnerPhone")}
          key={form.getInputProps("infoOwnerPhone").key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("infoOwnerEmail")}
          key={form.getInputProps("infoOwnerEmail").key}
        />

        {/* System Owner */}
        <Divider label="System Owner" mt={32} mb={16} />
        <TextInput
          label="System Owner Name"
          description="Assignment of security responsibility"
          {...form.getInputProps("sysOwnerName")}
          key={form.getInputProps("sysOwnerName").key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("sysOwnerTitle")}
          key={form.getInputProps("sysOwnerTitle").key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("sysOwnerAddr")}
          key={form.getInputProps("sysOwnerAddr").key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("sysOwnerPhone")}
          key={form.getInputProps("sysOwnerPhone").key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("sysOwnerEmail")}
          key={form.getInputProps("sysOwnerEmail").key}
        />

        {/* System Security Officer */}
        <Divider label="System Security Officer" mt={32} mb={16} />
        <TextInput
          label="System Security Officer Name"
          description="The person likely selected in your incident response plan"
          {...form.getInputProps("sysSecName")}
          key={form.getInputProps("sysSecName").key}
        />
        <TextInput
          label="Title"
          {...form.getInputProps("sysSecTitle")}
          key={form.getInputProps("sysSecTitle").key}
        />
        <TextInput
          label="Office Address"
          {...form.getInputProps("sysSecAddr")}
          key={form.getInputProps("sysSecAddr").key}
        />
        <TextInput
          label="Work Phone"
          {...form.getInputProps("sysSecPhone")}
          key={form.getInputProps("sysSecPhone").key}
        />
        <TextInput
          label="e-Mail Address"
          {...form.getInputProps("sysSecEmail")}
          key={form.getInputProps("sysSecEmail").key}
        />

        <Divider label="General System Information" mt={32} mb={16} />
        <Textarea
          label="General Description/Purpose of System"
          description="Provide a short, high-level description of the function/purpose of the system."
          placeholder="What is the function/purpose of the system?"
          {...form.getInputProps("systemDescription")}
          key={form.getInputProps("systemDescription").key}
          autosize
          minRows={3}
          maxRows={6}
        />
        <Group grow>
          <NumberInput
            label="Number of end users"
            description="Provide the approximate number of end users"
            min={1}
            max={1000000}
            {...form.getInputProps("numEndUsers")}
            key={form.getInputProps("numEndUsers").key}
          />
          <NumberInput
            label="Number of privileged users"
            description="Provide the approximate number of administrators. Include all those with privileged access such as system administrators, database administrators, application administrators, etc."
            min={1}
            max={1000000}
            {...form.getInputProps("numAdminUsers")}
            key={form.getInputProps("numAdminUsers").key}
          />
        </Group>
        <Divider my={32} />
        <EvidenceAdd
          evidenceListId={revision.information_description}
          sectionName="General Description of Information"
          sectionDescription="Document the CUI information types processed, stored, or transmitted by the system. For more information, see the CUI Registry at https://www.archives.gov/cui/registry/category-list."
        />
        <Title my={64} order={2} align="center">
          Section 2: System Environment
        </Title>
        <EvidenceAdd
          evidenceListId={revision.system_top_evi}
          sectionName="Detailed System Topology"
          sectionDescription="Include a detailed topology narrative and graphic that clearly depicts the system boundaries, system interconnections, and key devices.  (Note: this does not require depicting every workstation or desktop, but include an instance for each operating system in use, an instance for portable components (if applicable), all virtual and physical servers (e.g., file, print, web, database, application), as well as any networked workstations (e.g., Unix, Windows, Mac, Linux), firewalls, routers, switches, copiers, printers, lab equipment, handhelds).  If components of other systems that interconnect/interface with this system need to be shown on the diagram, denote the system boundaries by referencing the security plans or names and owners of the other system(s) in the diagram."
        />
        <Divider my={32} />
        <EvidenceAdd
          evidenceListId={revision.hardware_listing}
          sectionName="Hardware Listing"
          sectionDescription="Include or reference a complete and accurate listing of all hardware (a reference to the organizational component inventory database is acceptable) and software (system software and application software) components, including make/OEM, model, version, service packs, and person or role responsible for the component."
        />
        <Divider my={32} />
        <EvidenceAdd
          evidenceListId={revision.software_listing}
          sectionName="Software Listing"
          sectionDescription="List all software components installed on the system."
        />
        <Divider my={32} />
        <Textarea
          label="Hardware and Software Maintenance and Ownership"
          description="Hardware and Software Maintenance and Ownership - Is all hardware and software maintained and owned by the organization?"
          {...form.getInputProps("hardSoftMain")}
          key={form.getInputProps("hardSoftMain").key}
          autosize
          minRows={3}
          maxRows={6}
        />
      </form>
    </Container>
  );
}
