
import { signInWithGitHub, signInWithGoogle, data } from "../oauth";
import { Text, AppShellMain, Stack } from "@mantine/core";

export default function Home() {
  return (
    <AppShellMain>
      <Stack px={20}>
        <Text size="3rem">Welcome to FilmLog!</Text>
        <Text size="2rem">
          A place where film enthusiasts can learn about film and track their
          film rolls
        </Text>
      </Stack>
    </AppShellMain>
  );

export default function Home() {
  return <main></main>;
}
