import { Link } from "react-router-dom";
import { Text, AppShellHeader, Group } from "@mantine/core";

export default function Header() {
  return (
    <AppShellHeader>
      <Group grow px={20} py={10} bg="myColors.3">
        <Text size="2rem">
          <Link to="/">FilmLog</Link>
        </Text>
        <Group justify="center">
          <Text size="2rem">
            <Link to="/explore">Explore</Link>
          </Text>
          <Text size="2rem">
            <Link to="/log">My Log</Link>
          </Text>
        </Group>
        <Group justify="end">
          <Text size="2rem">
            <Link to="/login">Login</Link>
          </Text>
        </Group>
      </Group>
    </AppShellHeader>
  );
}
