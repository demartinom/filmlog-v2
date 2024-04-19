import {
  AppShellMain,
  Card,
  Title,
  Image,
  SimpleGrid,
  AspectRatio,
  Container,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

/*TODO:
    Click on stock for more info
    Compare tool
*/

export default function Explore() {
  // State for information on all film stocks
  const [filmStockData, setFilmStockData] = useState([]);
  // Loading state while receiving data
  const [loading, setLoading] = useState(true);
  // Modal state for more info on film stock
  const [infoModal, { open, close }] = useDisclosure(false);
  // Data to display in info modal
  const [modalData, setModalData] = useState(null);
  
  // api call to get all film stock data
  useEffect(() => {
    async function getStocks() {
      try {
        const res = await axios.get("/api/films/all");
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
    open();
  }
  // Map over all film stocks to display information
  const filmData = filmStockData.map((stock) => (
    <Card
      key={stock.id}
      bg={"gray"}
      w={"60%"}
      m={"auto"}
      withBorder
      onClick={() => handleModal(stock)}
    >
      <Card.Section>
        <AspectRatio>
          <Image src={stock.img}></Image>
        </AspectRatio>
      </Card.Section>
      <Title size="xs">{stock.name}</Title>
    </Card>
  ));

  // Renders loading when fetching data
  if (loading) {
    return <AppShellMain>Loading...</AppShellMain>;
  }
  // Render returned data
  return (
    <AppShellMain>
      <Modal opened={infoModal} onClose={close}></Modal>
      <Container size={"lg"}>
        <SimpleGrid cols={4}>{filmData}</SimpleGrid>
      </Container>
    </AppShellMain>
  );
}
