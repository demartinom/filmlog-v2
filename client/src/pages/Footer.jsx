import { AppShellFooter, Text, Anchor, Group } from "@mantine/core";

export default function Footer() {
  return (
    <AppShellFooter bg="myColors.3">
      <Group>
        <Text px={20} py={10} bg="myColors.3">
          Made by Matt DeMartino
        </Text>
        <Anchor underline="never" c={"black"} href="https://storyset.com/love">
          Home Page Illustration by Storyset
        </Anchor>
      </Group>
    </AppShellFooter>
  );
}
