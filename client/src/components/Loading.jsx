import { Center, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Center style={{ width: "100vw", height: "90vh" }}>
      <Loader size={100} />;
    </Center>
  );
}
