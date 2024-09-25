import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Text, AppShellHeader, Group, Menu } from "@mantine/core";
import { signOut } from "../oauth";
import { RxHamburgerMenu } from "react-icons/rx";
import { useResponsive } from "../helper-functions/mediaQueries";

export default function Header({ data }) {
  const { isSmall } = useResponsive();

  let nav = useNavigate();

  // Signs user out using SupaBase and then redirects them to the home page
  async function logout() {
    await signOut();
    nav("/redirect");
  }
  return (
    <AppShellHeader>
      <Group px={20} py={10} bg="myColors.3" justify="space-between">
        <Text size="2rem">
          <Link to="/">FilmLog</Link>
        </Text>
        <Group justify="end" visibleFrom="md">
          <Text size="2rem">
            <Link to="/explore">Explore</Link>
          </Text>
          <Text size="2rem">
            <Link to="/stats">Roll Statistics</Link>
          </Text>
          {data.session != null && (
            <Text size="2rem" onClick={logout} style={{ cursor: "pointer" }}>
              Log Out
            </Text>
          )}
        </Group>
        {isSmall && (
          <Menu offset={"1vh"}>
            <Menu.Target>
              <Group>
                <RxHamburgerMenu />
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <Text size="2rem">
                  <Link to="/explore">Explore</Link>
                </Text>
              </Menu.Item>
              <Menu.Item>
                {data.session != null && (
                  <Text
                    size="2rem"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Text>
                )}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </AppShellHeader>
  );
}
