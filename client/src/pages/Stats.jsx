import { AppShellMain, Center, Title, Text, Stack, Group } from "@mantine/core";
import React from "react";

export default function Stats({ allRolls, user }) {
  return (
    <AppShellMain>
      <Center>
        <Title>Roll Statistics</Title>
      </Center>
      <Center>
        <Stack ta={"center"}>
          <Title>Total Rolls logged in FilmLog: {allRolls.totalRolls}</Title>
          <Group>
            <Text>
              FilmLog&apos;s most popular film stock:{" "}
              {allRolls.mostPopularStock}
            </Text>
            {user && <Text>Your most popular film stock: </Text>}
          </Group>
          <Group>
            <Text>
              FilmLog&apos;s most popular film format:{" "}
              {allRolls.mostPopularFormat}
            </Text>
          </Group>
          <Group>
            <Text>
              FilmLog&apos;s most popular film type: {allRolls.mostPopularType}
            </Text>
          </Group>
        </Stack>
      </Center>
    </AppShellMain>
  );
}
