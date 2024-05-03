import { signInWithGitHub, signInWithGoogle, signInAnonymous } from "../oauth";
import { Text, AppShellMain, Stack, Group, Button, Image } from "@mantine/core";

export default function Home() {
  return (
    <AppShellMain>
      {/* <BackgroundImage src={"./landing.jpg"} h={"100vh"}> */}
      <Group gap={200} py={100} px={20}>
        <Stack w={"45rem"} mb={100} pl={50}>
          {/* TODO: Write something better */}
          <Text size="3rem">Welcome to FilmLog!</Text>
          <Text size="2rem">
            A place where film enthusiasts can learn about the exciting world of
            film and track their film rolls.
          </Text>
          <Group mt={50}>
            <Button
              bg={"myColors.6"}
              size="xl"
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
        <Image src="./landing.svg" h={600} w={600}></Image>
      </Group>
      {/* </BackgroundImage> */}
    </AppShellMain>
  );
}
