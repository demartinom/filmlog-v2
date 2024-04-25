import { Group, Stack, Text, Image, Title, Autocomplete } from "@mantine/core";
import { useState } from "react";
function stockData(filmStock) {
  return (
    <Stack align="center">
      <Image src={filmStock.img} maw={400} mah={400}></Image>
      <Title>{filmStock.name}</Title>
      <Text>
        <strong>Maker</strong>: {filmStock.maker.name}
      </Text>
      <Text>
        <strong>Film Type</strong>: {filmStock.type}
      </Text>
      <Text>
        <strong>ISO</strong>: {filmStock.ISO}
      </Text>
      <Text>
        <strong>Formats</strong>:{" "}
        {filmStock.formats.map((format, i) =>
          i > 0 ? `, ${format}` : `${format}`
        )}
      </Text>
      <Text>
        <strong>Development Process</strong>: {filmStock.process}
      </Text>
    </Stack>
  );
}
export default function Compare({ data }) {
  //State for compared film stocks
  const [stock1, setStock1] = useState(null);
  const [stock2, setStock2] = useState(null);

  //Set state for selected film stocks
  function handleStock(current, stockState) {
    let selectedFilm = data.find((stock) => stock.name == current);
    stockState(selectedFilm);
  }

  return (
    <Group ta={"center"}>
      <Stack w={400} h={700}>
        {stock1 && stockData(stock1)}
      </Stack>
      <Stack>
        <Text>Select Film Stocks</Text>
        <Autocomplete
          data={data.map((stock) => stock.name)}
          onChange={(value) => {
            handleStock(value, setStock1);
          }}
        ></Autocomplete>
        <Autocomplete
          data={data.map((stock) => stock.name)}
          onChange={(value) => {
            handleStock(value, setStock2);
          }}
        ></Autocomplete>
      </Stack>
      <Stack
        w={400}
        h={700}
        onChange={(value) => handleStock(value, setStock2)}
      >
        {stock2 && stockData(stock2)}
      </Stack>
    </Group>
  );
}
