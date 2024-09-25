import {
  AppShellMain,
  Center,
  Title,
  Text,
  Stack,
  Paper,
  Flex,
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
        <Stack ta={"center"}>
          <Title mt={20}>Roll Statistics</Title>
          <Title size={25} px={20}>
            Check out your personal stats (when you&apos;re logged in) and see
            how all FilmLog users are doing!
          </Title>
        </Stack>
      </Center>
      <Center>
        <Flex
          direction="column"
          ta={"center"}
          gap={{ sm: 10, md: 40 }}
          mt={{ sm: 20, md: 40 }}
          mb={{ sm: 20, md: 0 }}
        >
          <Paper
            justify="space-between"
            withBorder
            radius={"md"}
            shadow="md"
            p={20}
            m={{ sm: 10, md: 0 }}
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
            m={{ sm: 10, md: 0 }}
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
            m={{ sm: 10, md: 0 }}
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
            m={{ sm: 10, md: 0 }}
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
        </Flex>
      </Center>
    </AppShellMain>
  );
}
