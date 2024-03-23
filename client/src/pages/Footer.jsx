import { AppShellFooter, Text } from "@mantine/core";

export default function Footer() {
  return (
    <AppShellFooter>
      <Text px={20} py={10} bg="myColors.3">
        Made by Matt DeMartino
      </Text>
    </AppShellFooter>
  );
}
