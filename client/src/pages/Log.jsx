import {
  AppShellMain,
  Table,
  Modal,
  Autocomplete,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { data } from "../oauth";
import { useEffect, useState } from "react";

export default function Log() {
  // Store roll data linked to user id in data
  const [rollData, setRollData] = useState(null);

  // Allows for api call to complete before rendering table
  // *TODO: Create better loading state
  const [loading, setLoading] = useState(true);

  //Store all film data
  const [allFilm, setAllFilm] = useState(null);

  // State for film selected in forms
  const [currentFilm, setCurrentFilm] = useState(null);

  // States for edit/create modals
  const [editModal, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [newModal, { open: newOpen, close: newClose }] = useDisclosure(false);

  // State for Date Started
  const [startDate, setStartDate] = useState(null);
  // State for Date Finished
  const [endDate, setEndDate] = useState(null);
  // Set format selected
  const [format, setFormat] = useState("");

  //Fetch rolls associated with user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/rolls/${data.session.user.id}`);
        setRollData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once API call is complete
      }
    };
    fetchData();
  }, []);

  // Fetch data for all film stocks in database
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await axios.get("/api/films/all");
        setAllFilm(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilm();
  }, [newModal, editModal]);

  // Loading placeholder for when data is being fetched
  // TODO: Update loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // Set the currently selected film stock in forms
  function handleCurrentFilm(current) {
    let selectedFilm = allFilm.find((stock) => stock.name == current);
    setCurrentFilm(selectedFilm);
  }
  // Map out table rows
  const rows = rollData.map((roll) => {
    let formattedDateStarted = formatDate(roll.dateStarted);
    let formattedDateFinished =
      roll.dateFinished === null
        ? "In Progress"
        : formatDate(roll.dateFinished);
    return (
      <Table.Tr key={roll.id}>
        <Table.Td>{roll.film.name}</Table.Td>
        <Table.Td>{roll.format}</Table.Td>
        <Table.Td>{formattedDateStarted}</Table.Td>
        {/*TODO: Add button to quickly mark as finished? */}
        <Table.Td>{formattedDateFinished}</Table.Td>
        <Table.Td>
          <button onClick={editOpen}>Edit</button>
          <button>Delete</button>
        </Table.Td>
        <Table.Td></Table.Td>
      </Table.Tr>
    );
  });
  async function createRoll() {
    try {
      const rollData = {
        filmStock: currentFilm.id,
        format: format,
        dateStarted: startDate,
        dateFinished: endDate,
        user: data.session.user.id,
      };
      await axios.post("/api/rolls/newroll", rollData);
      //TODO: See if there is a better way of doing this
      window.location.reload();
    } catch (error) {
      console.error("Error creating roll:", error);
    }
  }

  return (
    <AppShellMain>
      <Modal opened={editModal} onClose={editClose}></Modal>
      <Modal opened={newModal} onClose={newClose}>
        <Autocomplete
          label="Film Stock"
          data={allFilm == null ? "" : allFilm.map((film) => film.name)}
          onChange={handleCurrentFilm}
        ></Autocomplete>
        <Autocomplete
          label="Format"
          data={currentFilm == null ? "" : currentFilm.formats}
          onChange={setFormat}
        ></Autocomplete>
        <DatePickerInput
          label="Date Started"
          value={startDate}
          onChange={setStartDate}
        ></DatePickerInput>
        <DatePickerInput
          label="Date Finished"
          value={endDate}
          placeholder="If still in progress leave blank"
          onChange={setEndDate}
        ></DatePickerInput>
        <Button onClick={createRoll}>Create</Button>
      </Modal>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Film Stock</Table.Th>
            <Table.Th>Format</Table.Th>
            <Table.Th>Date Started</Table.Th>
            <Table.Th>Date Finished</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <button onClick={newOpen}>New</button>
    </AppShellMain>
  );
}
// Format date found in dateStarted and dateFinished to dd/mm/yy format
function formatDate(rollDate) {
  let dateStarted = new Date(rollDate);
  let formattedDateStarted = `${
    dateStarted.getMonth() + 1
  }/${dateStarted.getDate()}/${dateStarted.getFullYear().toString().slice(-2)}`;
  return formattedDateStarted;
}
