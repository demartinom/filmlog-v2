import {
  AppShellMain,
  Center,
  Title,
  Text,
  Stack,
  Paper,
} from "@mantine/core";
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
        <Title mt={20}>Roll Statistics</Title>
      </Center>
      <Center>
        <Stack ta={"center"} gap={30} mt={40}>
          <Paper
            justify="space-between"
            withBorder
            radius={"md"}
            shadow="md"
            p={20}
          >
            <Text size="lg">
              <b>Total rolls logged on FilmLog:</b> {allRolls.totalRolls}
            </Text>
            {userSession && (
              <Text size="lg">
                <b>Total rolls you have logged on FilmLog:</b>{" "}
                {userData.totalRolls}
              </Text>
            )}
          </Paper>
          <Paper
            justify="space-between"
            withBorder
            radius={"md"}
            shadow="md"
            p={20}
          >
            <Text size="lg">
              <b>FilmLog&apos;s most popular film stock:</b>{" "}
              {allRolls.mostPopularStock}
            </Text>
            {userSession && (
              <Text size="lg">
                <b>Your most popular film stock:</b> {userData.mostPopularStock}
              </Text>
            )}
          </Paper>
          <Paper
            justify="space-between"
            withBorder
            radius={"md"}
            shadow="md"
            p={20}
          >
            <Text size="lg">
              <b>FilmLog&apos;s most popular film format:</b>{" "}
              {allRolls.mostPopularFormat}
            </Text>
            {userSession && (
              <Text size="lg">
                <b>Your most popular film format:</b>{" "}
                {userData.mostPopularFormat}
              </Text>
            )}
          </Paper>
          <Paper
            justify="space-between"
            withBorder
            radius={"md"}
            shadow="md"
            p={20}
          >
            <Text size="lg">
              <b>FilmLog&apos;s most popular film type:</b>{" "}
              {allRolls.mostPopularType}
            </Text>
            {userSession && (
              <Text size="lg">
                <b>Your most popular film type:</b> {userData.mostPopularType}
              </Text>
            )}
          </Paper>
        </Stack>
      </Center>
    </AppShellMain>
  );
}
