"use client";

import { FormEvent, useState } from "react";
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

export default function SystemInformationForm() {
  const [formData, setFormData] = useState({
    systemName: "",
    systemCategorization: "",
    systemUniqueId: "",
    responsibleOrgName: "",
    responsibleOrgAddress: "",
    responsibleOrgPhone: "",
    infoOwnerName: "",
    infoOwnerTitle: "",
    infoOwnerAddress: "",
    infoOwnerPhone: "",
    infoOwnerEmail: "",
    systemOwnerName: "",
    systemOwnerTitle: "",
    systemOwnerAddress: "",
    systemOwnerPhone: "",
    systemOwnerEmail: "",
    systemSecurityOfficerName: "",
    systemSecurityOfficerTitle: "",
    systemSecurityOfficerAddress: "",
    systemSecurityOfficerPhone: "",
    systemSecurityOfficerEmail: "",
    systemDescription: "",
    endUsers: 0,
    privilegedUsers: 0,
    informationDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically handle form submission, like sending data to a server
  };

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Title align="center">Section 1: System Information</Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="System Name/Title"
          name="systemName"
          value={formData.systemName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="System Categorization"
          name="systemCategorization"
          value={formData.systemCategorization}
          onChange={handleChange}
          required
        />
        <TextInput
          label="System Unique Identifier"
          name="systemUniqueId"
          value={formData.systemUniqueId}
          onChange={handleChange}
          required
        />

        {/* Responsible Organization */}
        <Divider label="Responsible Organization" mt={32} mb={16} />
        <TextInput
          label="Responsible Organization Name"
          name="responsibleOrgName"
          value={formData.responsibleOrgName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Address"
          name="responsibleOrgAddress"
          value={formData.responsibleOrgAddress}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Phone"
          name="responsibleOrgPhone"
          value={formData.responsibleOrgPhone}
          onChange={handleChange}
          required
        />

        {/* Information Owner */}
        <Divider label="Information Owner" mt={32} mb={16} />
        <TextInput
          label="Information Owner Name"
          name="infoOwnerName"
          value={formData.infoOwnerName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Title"
          name="infoOwnerTitle"
          value={formData.infoOwnerTitle}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Office Address"
          name="infoOwnerAddress"
          value={formData.infoOwnerAddress}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Work Phone"
          name="infoOwnerPhone"
          value={formData.infoOwnerPhone}
          onChange={handleChange}
          required
        />
        <TextInput
          label="e-Mail Address"
          name="infoOwnerEmail"
          value={formData.infoOwnerEmail}
          onChange={handleChange}
          required
        />

        {/* System Owner */}
        <Divider label="System Owner" mt={32} mb={16} />
        <TextInput
          label="System Owner Name"
          name="systemOwnerName"
          value={formData.systemOwnerName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Title"
          name="systemOwnerTitle"
          value={formData.systemOwnerTitle}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Office Address"
          name="systemOwnerAddress"
          value={formData.systemOwnerAddress}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Work Phone"
          name="systemOwnerPhone"
          value={formData.systemOwnerPhone}
          onChange={handleChange}
          required
        />
        <TextInput
          label="e-Mail Address"
          name="systemOwnerEmail"
          value={formData.systemOwnerEmail}
          onChange={handleChange}
          required
        />

        {/* System Security Officer */}
        <Divider label="System Security Officer" mt={32} mb={16} />
        <TextInput
          label="System Security Officer Name"
          name="systemSecurityOfficerName"
          value={formData.systemSecurityOfficerName}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Title"
          name="systemSecurityOfficerTitle"
          value={formData.systemSecurityOfficerTitle}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Office Address"
          name="systemSecurityOfficerAddress"
          value={formData.systemSecurityOfficerAddress}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Work Phone"
          name="systemSecurityOfficerPhone"
          value={formData.systemSecurityOfficerPhone}
          onChange={handleChange}
          required
        />
        <TextInput
          label="e-Mail Address"
          name="systemSecurityOfficerEmail"
          value={formData.systemSecurityOfficerEmail}
          onChange={handleChange}
          required
        />

        <Divider label="General System Information" mt={32} mb={16} />
        <Textarea
          label="General Description/Purpose of System"
          name="systemDescription"
          value={formData.systemDescription}
          onChange={handleChange}
          required
        />
        <Group grow>
          <NumberInput
            label="Number of end users"
            name="endUsers"
            value={formData.endUsers}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, endUsers: value || 0 }))
            }
            required
          />
          <NumberInput
            label="Number of privileged users"
            name="privilegedUsers"
            value={formData.privilegedUsers}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, privilegedUsers: value || 0 }))
            }
            required
          />
        </Group>
        <Textarea
          label="General Description of Information"
          name="informationDescription"
          value={formData.informationDescription}
          onChange={handleChange}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
