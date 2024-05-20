import React from "react";
import {
  AppShellMain,
  Table,
  Modal,
  Autocomplete,
  Button,
  useMantineTheme,
  Group,
  Title,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { formatDate } from "../helper-functions/formatDate";
import { formatDateData } from "../helper-functions/formatDateData";
import Loading from "../components/Loading";

export default function Log({ data }) {
  //Mantine Theme Hook and button color
  const theme = useMantineTheme();
  const buttonStyles = { color: theme.colors.myColors[6], cursor: "pointer" };

  //TODO: Change to ""?
  // Store roll data linked to user id in data
  const [rollData, setRollData] = useState(null);

  // Allows for api call to complete before rendering table
  // *TODO: Create better loading state
  const [loading, setLoading] = useState(true);

  //Store all film data
  const [allFilm, setAllFilm] = useState(null);

  // State for film selected in new roll creation
  const [currentFilm, setCurrentFilm] = useState(null);
  // State for roll selected for editing
  const [currentEdit, setCurrentEdit] = useState(null);
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
        const res = await axios.get(
          `https://filmlogapi.vercel.app/api/rolls/${data.session.user.id}`
        );
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
        const res = await axios.get(
          `https://filmlogapi.vercel.app/api/films/all`
        );
        setAllFilm(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilm();
  }, [newModal]);

  // Loading placeholder for when data is being fetched
  if (loading) {
    return (
      <AppShellMain>
        <Loading loadingState={loading} />
      </AppShellMain>
    );
  }

  // Set the currently selected film stock in forms
  function handleCurrentFilm(current) {
    let selectedFilm = allFilm.find((stock) => stock.name == current);
    setCurrentFilm(selectedFilm);
  }
  // Populate edit modal before opening
  function handleOpenEdit(roll) {
    setCurrentEdit(roll);
    setFormat(roll.format);
    editOpen();
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
        <Table.Td ta={"center"}>{roll.format}</Table.Td>
        <Table.Td ta={"center"}>{formattedDateStarted}</Table.Td>
        {/*TODO: Add button to quickly mark as finished? */}
        <Table.Td ta={"center"}>{formattedDateFinished}</Table.Td>
        <Group m={"lg"}>
          <FaEdit
            onClick={() => handleOpenEdit(roll)}
            style={buttonStyles}
            size={23}
          ></FaEdit>
          <FaTrashAlt
            onClick={() => deleteRoll(roll.id)}
            style={buttonStyles}
            size={23}
          ></FaTrashAlt>
        </Group>
      </Table.Tr>
    );
  });
  // Adds roll to database
  async function createRoll() {
    try {
      const rollData = {
        filmStock: currentFilm.id,
        format: format,
        dateStarted: startDate,
        dateFinished: endDate,
        user: data.session.user.id,
      };
      await axios.post(
        `https://filmlogapi.vercel.app/api/rolls/newroll`,
        rollData
      );
      //TODO: See if there is a better way of doing this
      window.location.reload();
    } catch (error) {
      console.error("Error creating roll:", error);
    }
  }
  // Deletes roll from database
  async function deleteRoll(id) {
    try {
      await axios.delete(
        `https://filmlogapi.vercel.app/api/rolls/deleteroll/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  // Edits roll in database
  async function editRoll(roll) {
    try {
      await axios.patch(
        `https://filmlogapi.vercel.app/api/rolls/editroll/${roll.id}`,
        roll
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <AppShellMain>
      <Modal opened={editModal} onClose={editClose}>
        {/*TODO: Gray out readOnly values */}
        {/*TODO: Create notes section */}
        <Autocomplete
          defaultValue={currentEdit == null ? "" : currentEdit.film.name}
          readOnly
        ></Autocomplete>
        <Autocomplete
          defaultValue={currentEdit == null ? "" : currentEdit.format}
          readOnly
        ></Autocomplete>
        <DatePickerInput
          value={
            currentEdit == null ? "" : formatDateData(currentEdit.dateStarted)
          }
          onChange={(value) =>
            setCurrentEdit((prevEdit) => ({
              ...prevEdit,
              dateStarted: value,
            }))
          }
        ></DatePickerInput>
        <DatePickerInput
          value={
            currentEdit == null || currentEdit.dateFinished == null
              ? null
              : new Date(formatDateData(currentEdit.dateFinished))
          }
          clearable
          onChange={(value) =>
            setCurrentEdit((prevEdit) => ({
              ...prevEdit,
              dateFinished: value,
            }))
          }
          minDate={
            currentEdit == null
              ? new Date(1920, 1, 1)
              : new Date(currentEdit.dateStarted)
          }
        ></DatePickerInput>
        <Button onClick={() => editRoll(currentEdit)}>Done</Button>
      </Modal>
      <Modal opened={newModal} onClose={newClose}>
        {/*TODO: Add validation */}
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
      <Stack align="center" py={"md"}>
        <Title size={"h1"}>My Film</Title>
        <Table highlightOnHover w={"75%"} verticalSpacing={"md"}>
          <Table.Thead fz={"h3"} bg={"myColors.6"}>
            <Table.Tr>
              <Table.Th>Film Stock</Table.Th>
              <Table.Th ta={"center"}>Format</Table.Th>
              <Table.Th ta={"center"}>Date Started</Table.Th>
              <Table.Th ta={"center"}>Date Finished</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody fz={"xl"}>{rows}</Table.Tbody>
          <FaPlusCircle
            onClick={newOpen}
            style={{ ...buttonStyles, marginLeft: "10px" }}
            size={"30"}
          ></FaPlusCircle>
        </Table>
      </Stack>
    </AppShellMain>
  );
}
