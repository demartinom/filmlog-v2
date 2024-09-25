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
              <b>FilmLog&apos;s most popular film stock:</b>{" "}
              {allRolls.mostPopularStock}
            </Text>
            {userSession && (
              <Text>
                <b>Your most popular film stock:</b> {userData.mostPopularStock}
              </Text>
            )}
          </Group>
          <Group>
            <Text>
              <b>FilmLog&apos;s most popular film format:</b>{" "}
              {allRolls.mostPopularFormat}
            </Text>
            {userSession && (
              <Text>
                <b>Your most popular film format:</b>{" "}
                {userData.mostPopularFormat}
              </Text>
            )}
          </Group>
          <Group>
            <Text>
              <b>FilmLog&apos;s most popular film type:</b>{" "}
              {allRolls.mostPopularType}
            </Text>
            {userSession && (
              <Text>
                <b>Your most popular film type:</b> {userData.mostPopularType}
              </Text>
            )}
          </Group>
        </Stack>
      </Center>
    </AppShellMain>
  );
}
