import { AppShellMain, Center, Title, Text, Stack, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { fetchUserStats } from "../helper-functions/apiCalls";

export default function Stats({ allRolls, userSession }) {
  const [userData, setUserData] = useState({});

  // API call to receive user stats
  useEffect(() => {
    if (userSession?.user?.id) {
      fetchUserStats(userSession.user.id, setUserData);
    }
  }, [userSession]);

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
            {userSession && <Text>Your most popular film stock: </Text>}
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
