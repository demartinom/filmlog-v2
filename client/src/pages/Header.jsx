import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Text, AppShellHeader, Group } from "@mantine/core";
import { signOut } from "../oauth";

export default function Header({ data }) {
  let nav = useNavigate();

  // Signs user out using SupaBase and then redirects them to the home page
  async function logout() {
    await signOut();
    nav("/redirect");
  }
  return (
    <AppShellHeader>
      <Group grow px={20} py={10} bg="myColors.3">
        <Text size="2rem">
          <Link to="/">FilmLog</Link>
        </Text>
        <Group justify="end">
          <Text size="2rem">
            <Link to="/explore">Explore</Link>
          </Text>
          {data.session != null && (
            <Text size="2rem" onClick={logout} style={{ cursor: "pointer" }}>
              Log Out
            </Text>
          )}
        </Group>
      </Group>
    </AppShellHeader>
  );
}
