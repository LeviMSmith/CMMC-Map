"use client";

import { Button, TextInput, Box, Title, Container, Alert } from "@mantine/core";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import { StateContextType, StateContext } from "@/components/state-provider";
import { backendFetch } from "@/lib/session";

export default function LoginPage() {
  const { sharedState, setSharedState } =
    useContext<StateContextType>(StateContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault(); // Prevent form from reloading the page
    setError(""); // Reset error message

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await backendFetch(`/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response) {
        throw new Error("Network response was not ok");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Force everything to refresh
      setSharedState({
        ...sharedState,
        refreshRevisions: !sharedState.refreshRevisions,
      });

      // Redirect or do something upon successful login
      router.push("/sections");
    } catch (err) {
      setError("Failed to login. Check your credentials and try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={20}>
        Login
      </Title>
      {error && <Alert color="red">{error}</Alert>}
      <Box component="form" onSubmit={handleLogin}>
        <TextInput
          label="Username"
          placeholder="Your username"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
          required
        />
        <TextInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
          required
          type="password"
          mt="md"
        />
        <Button type="submit" fullWidth mt="xl">
          Log in
        </Button>
      </Box>
    </Container>
  );
}
