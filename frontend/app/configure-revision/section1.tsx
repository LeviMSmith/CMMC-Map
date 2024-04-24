"use client";

import {
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

export default function SystemInformationForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      systemName: "",
    },
  });

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Title order={2} align="center">
        Section 1: System Information
      </Title>
      <Divider label="System Information" mt={32} mb={16} />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          {...form.getInputProps("reponsibleOrgName")}
          key={(form.getInputProps("responsibleOrgName") as any).key}
        />
        <TextInput
          label="Address"
          {...form.getInputProps("reponsibleOrgAddr")}
          key={(form.getInputProps("responsibleOrgAddr") as any).key}
        />
        <TextInput
          label="Phone"
          {...form.getInputProps("reponsibleOrgPhone")}
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
            {...form.getInputProps("numEndUsers")}
            key={(form.getInputProps("numEndUsers") as any).key}
          />
          <NumberInput
            label="Number of privileged users"
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
