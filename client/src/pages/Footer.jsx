import { AppShellFooter, Text, Anchor, Group } from "@mantine/core";

export default function Footer() {
  return (
    <AppShellFooter bg="myColors.3" pos={'absolute'} left={0} right={0} bottom={0}>
      <Group py={5}>
        <Text px={20} bg="myColors.3">
          Made by Matt DeMartino
        </Text>
        <Anchor underline="never" c={"black"} href="https://storyset.com/love">
          Home Page Illustration by Storyset
        </Anchor>
      </Group>
    </AppShellFooter>
  );
}
