"use client";

import { Center, Text, Title, Button, Container } from "@mantine/core";

import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <Title ta="center">404</Title>
      <Text ta="center">The page you are looking for could not be found!</Text>
      <div className="h-8" />
      <Center>
        <Link href="/">
          <Button>Return home</Button>
        </Link>
      </Center>
    </Container>
  );
}
