import React, { useState } from "react";
import { Box, Heading, Container, VStack, SimpleGrid, Badge, Text, Button, Divider, Input } from "@chakra-ui/react";
import OpenStreetMapEmbed from "../components/GoogleMapEmbed";
import { FaMapMarkerAlt, FaHeartbeat, FaUsers, FaSun } from "react-icons/fa";

const EditableText = ({ text, onSubmit, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(index, value);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <Input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={() => setIsEditing(false)} autoFocus />
  ) : (
    <Text onClick={() => setIsEditing(true)} cursor="pointer">
      {text}
    </Text>
  );
};

const WorkerCard = ({ name, status, location, heartbeat, weather, temperature, index, onNameChange }) => {
  let weatherColorScheme = "green";
  if (weather === "Stormy" || temperature < 10 || temperature > 30) {
    weatherColorScheme = "red";
  } else if (weather === "Cloudy" || weather === "Windy" || weather === "Rainy" || (temperature >= 10 && temperature <= 15) || (temperature >= 25 && temperature <= 30)) {
    weatherColorScheme = "yellow";
  }
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading size="md" my={2}>
        <EditableText text={name} onSubmit={onNameChange} index={index} />
      </Heading>
      <Badge colorScheme={status === "OK" ? "green" : status === "BT" ? "yellow" : status === "STOP" ? "orange" : status === "EMA" ? "red" : "gray"}>{status}</Badge>
      <Box my={3}>
        <FaMapMarkerAlt />
        <Text display="inline-block" ml={2}>
          {location}
        </Text>
      </Box>
      <Box my={3}>
        <FaHeartbeat />
        <Text display="inline-block" ml={2}>
          Heartbeat: {heartbeat} bpm
        </Text>
      </Box>
      <Box my={3} display="flex" alignItems="center">
        <FaSun />
        <Badge colorScheme={weatherColorScheme} ml={2}>
          {weather} - {temperature}°C
        </Badge>
      </Box>
    </Box>
  );
};

import { FaPlus } from "react-icons/fa";

const Index = () => {
  const initialWorkerState = { name: "", status: "OK", location: "", heartbeat: "", weather: "", temperature: "" };
  const [newWorker, setNewWorker] = useState(initialWorkerState);

  const handleNewWorkerChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const addWorker = () => {
    if (newWorker.name && newWorker.location && newWorker.heartbeat) {
      setWorkers([...workers, newWorker]);
      setNewWorker(initialWorkerState);
    } else {
      alert("Please fill out all the worker details");
    }
  };

  const createTeams = () => {
    const pairedTeams = [];
    for (let i = 0; i < workers.length; i += 2) {
      pairedTeams.push(workers.slice(i, Math.min(i + 2, workers.length)));
    }
    setTeams(pairedTeams);
  };
  const handleNameChange = (index, newName) => {
    const updatedWorkers = [...workers];
    updatedWorkers[index].name = newName;
    setWorkers(updatedWorkers);
  };

  const [workers, setWorkers] = useState([
    { name: "John Doe", status: "OK", location: "Zone A", heartbeat: 72, weather: "Sunny", temperature: 22 },
    { name: "Jane Smith", status: "OK", location: "Zone B", heartbeat: 75, weather: "Cloudy", temperature: 18 },
  ]);
  const [teams, setTeams] = useState([]);

  // This duplicate declaration of createTeams should be removed.

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} my={8}>
        <Heading size="lg" textAlign="center" fontWeight="bold">
          ProtectME
        </Heading>
        <Divider />
        <Heading size="xl">Work Site Safety Tracker</Heading>
        <Divider />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {workers.map((worker, index) => (
            <WorkerCard key={index} {...worker} index={index} onNameChange={handleNameChange} />
          ))}
        </SimpleGrid>
        <Box my={4}>
          <Heading size="md" mb={4}>
            Add Worker
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Input placeholder="Name" name="name" value={newWorker.name} onChange={handleNewWorkerChange} />
            <Input placeholder="Location" name="location" value={newWorker.location} onChange={handleNewWorkerChange} />
            <Input placeholder="Heartbeat" name="heartbeat" type="number" value={newWorker.heartbeat} onChange={handleNewWorkerChange} />
            <Input placeholder="Weather" name="weather" value={newWorker.weather} onChange={handleNewWorkerChange} />
            <Input placeholder="Temperature" name="temperature" type="number" value={newWorker.temperature} onChange={handleNewWorkerChange} />
          </SimpleGrid>
          <Button leftIcon={<FaPlus />} colorScheme="green" mt={4} onClick={addWorker}>
            Add Worker
          </Button>
        </Box>
        <Box my={8}>
          <Button leftIcon={<FaUsers />} colorScheme="teal" variant="solid" onClick={createTeams}>
            Create Teams
          </Button>
          {teams.map((team, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={4} my={4}>
              {team.map((member, memberIndex) => (
                <Text key={memberIndex}>{member.name}</Text>
              ))}
            </Box>
          ))}
        </Box>
      </VStack>
      <OpenStreetMapEmbed location={{ latitude: 40.748817, longitude: -73.985428 }} />
    </Container>
  );
};

export default Index;
