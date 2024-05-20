import React from "react";
import { AppShellFooter, Anchor, Group } from "@mantine/core";

export default function Footer() {
  return (
    <AppShellFooter
      bg="myColors.3"
      pos={"absolute"}
      left={0}
      right={0}
      bottom={0}
    >
      <Group py={5} px={20}>
        <Anchor
          underline="never"
          c={"black"}
          href="http://www.mattdemartino.com"
        >
          Made by Matt DeMartino
        </Anchor>
        <Anchor underline="never" c={"black"} href="https://storyset.com/love">
          Home Page Illustration by Storyset
        </Anchor>
      </Group>
    </AppShellFooter>
  );
}
