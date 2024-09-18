import React from "react";
import { signInWithGitHub, signInWithGoogle, signInAnonymous } from "../oauth";
import { Text, AppShellMain, Stack, Group, Button, Image } from "@mantine/core";

export default function Home() {
  return (
    <AppShellMain>
      <Group
        gap={{ md: 100, lg: 200 }}
        py={{ sm: 25, md: 40, lg: 100 }}
        px={{ sm: 10, lg: 20 }}
      >
        <Stack
          w={{ sm: "100%", lg: "45rem" }}
          mb={{ sm: 20, lg: 100 }}
          pl={{ md: 50 }}
        >
          {/* TODO: Write something better */}
          <Text size="3rem" ta={{ sm: "center", lg: "left" }}>
            Welcome to FilmLog!
          </Text>
          <Text size="2rem" ta={{ sm: "center", lg: "left" }}>
            A place where film enthusiasts can learn about the exciting world of
            film and track their film rolls.
          </Text>
          <Group mt={50} visibleFrom="lg">
            <Button
              bg={"myColors.6"}
              size={"xl"}
              radius={10}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
            <Button
              bg={"myColors.6"}
              size="xl"
              radius={10}
              onClick={signInWithGitHub}
            >
              Sign in with GitHub
            </Button>
            <Button
              onClick={signInAnonymous}
              bg={"myColors.6"}
              size="xl"
              radius={10}
            >
              Try the demo version
            </Button>
          </Group>
          <Group mt={10} hiddenFrom="lg" justify="center">
            <Button
              bg={"myColors.6"}
              size={"xl"}
              radius={10}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
            <Button
              bg={"myColors.6"}
              size="xl"
              radius={10}
              onClick={signInWithGitHub}
            >
              Sign in with GitHub
            </Button>
            <Button
              onClick={signInAnonymous}
              bg={"myColors.6"}
              size="xl"
              radius={10}
            >
              Try the demo version
            </Button>
          </Group>
        </Stack>
        <Image
          src="./landing.svg"
          h={{ lg: 400, xl: 600 }}
          w={{ lg: 400, xl: 600 }}
          visibleFrom="lg"
        ></Image>
      </Group>
      <Image
        src="./landing.svg"
        h={400}
        w={400}
        hiddenFrom="lg"
        m={"auto"}
      ></Image>
    </AppShellMain>
  );
}
