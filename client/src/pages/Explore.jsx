import React from "react";
import {
  AppShellMain,
  Card,
  Title,
  Image,
  SimpleGrid,
  AspectRatio,
  Modal,
  Text,
  Stack,
  Button,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import Compare from "../components/Compare";
import Loading from "../components/Loading";
import { useResponsive } from "../helper-functions/mediaQueries";

export default function Explore() {
  // State for information on all film stocks
  const [filmStockData, setFilmStockData] = useState([]);
  // Loading state while receiving data
  const [loading, setLoading] = useState(true);
  // Modal state for more info on film stock
  const [infoModal, { open: openInfo, close: closeInfo }] =
    useDisclosure(false);
  // Data to display in info modal
  const [modalData, setModalData] = useState(null);
  // Open compare modal
  const [compareModal, { open: openCompare, close: closeCompare }] =
    useDisclosure(false);

  const { isSmall, isMedium } = useResponsive();

  // api call to get all film stock data
  useEffect(() => {
    async function getStocks() {
      try {
        const res = await axios.get(
          `https://filmlogapi.vercel.app/api/films/all`
        );
        setFilmStockData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      //Set loading to false to display data
    }
    getStocks();
  }, []);

  // Open modal and populate with selected stock information
  function handleModal(stock) {
    setModalData(stock);
    openInfo();
  }

  // Map over all film stocks to display information
  const filmData = filmStockData.map((stock) => (
    <Card
      key={stock.id}
      bg={"myColors.3"}
      // w={"70%"}
      // m={"auto"}
      withBorder
      onClick={() => handleModal(stock)}
      style={{ cursor: "pointer" }}
      radius={10}
    >
      <Card.Section>
        <AspectRatio>
          <Image src={stock.img} bg={"white"}></Image>
        </AspectRatio>
      </Card.Section>
      <Card.Section my={"auto"}>
        <Title
          size={isSmall ? 8 : isMedium ? "14" : "h3"}
          ta={"center"}
          p={isSmall ? 0 : 10}
          pt={isSmall ? 8 : 0}
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {stock.name}
        </Title>
      </Card.Section>
      <Button mt={"auto"} mx={"auto"} visibleFrom="md">
        Learn More
      </Button>
    </Card>
  ));

  // Renders loading when fetching data
  if (loading) {
    return (
      <AppShellMain>
        <Loading loadingState={loading} />
      </AppShellMain>
    );
  }
  // Render returned data
  return (
    <AppShellMain>
      {modalData && (
        <Modal opened={infoModal} onClose={closeInfo} size={"lg"} radius={10}>
          <Stack align="center" p={20}>
            <Image src={modalData.img} maw={400} mah={400}></Image>
            <Title>{modalData.name}</Title>
            <Text>
              <strong>Maker</strong>: {modalData.maker.name}
            </Text>
            <Text>
              <strong>Film Type</strong>: {modalData.type}
            </Text>
            <Text>
              <strong>ISO</strong>: {modalData.ISO}
            </Text>
            <Text>
              <strong>Formats</strong>:{" "}
              {modalData.formats.map((format, i) =>
                i > 0 ? `, ${format}` : `${format}`
              )}
            </Text>
            <Text>
              <strong>Development Process</strong>: {modalData.process}
            </Text>
          </Stack>
        </Modal>
      )}
      <Modal opened={compareModal} onClose={closeCompare} size={"80%"}>
        <Compare data={filmStockData} />
      </Modal>
      <Stack align="center" mt={20}>
        <Title size={"h2"}>Explore Film Stocks</Title>
        <Title size="h3" visibleFrom="sm" ta={"center"}>
          Here you can find a list of film stocks currently in production. Click
          on the card to learn more information.
        </Title>
      </Stack>
      <Center py={20}>
        {/* TODO: Make usuable for mobile */}
        <Button onClick={openCompare} size="xl" visibleFrom="md">
          Compare Film Stocks
        </Button>
      </Center>
      <SimpleGrid cols={5} w={"80%"} m={"auto"} mb={20}>
        {filmData}
      </SimpleGrid>
    </AppShellMain>
  );
}
