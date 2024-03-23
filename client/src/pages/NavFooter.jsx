import { Outlet, Link } from "react-router-dom";
import { Group, Text } from "@mantine/core";

export default function NavFooter() {
  return (
    <>
      <header>
        <Group justify="space-between" px={20} py={10} bg="myColors.3">
          <Text size="2rem">
            <Link to="/">FilmLog</Link>
          </Text>
          <Group>
            <Text size="2rem">
              <Link to="/explore">Explore</Link>
            </Text>
            <Text size="2rem">
              <Link to="/log">My Log</Link>
            </Text>
          </Group>
          <Text size="2rem">
            <Link to="/login">Login</Link>
          </Text>
        </Group>
      </header>
      {/*Allows NavBar and Footer to render on all pages */}
      <Outlet />
      <footer>
        <Text px={20} py={10} bg="myColors.3">
          Made by Matt DeMartino
        </Text>
      </footer>
    </>
  );
}
