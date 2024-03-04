import React, { useState } from "react";
import { Box, Heading, Container, VStack, SimpleGrid, Badge, Text, Button, Divider, Input } from "@chakra-ui/react";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
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

const WorkerCard = ({ name, status, location, heartbeat, weather, index, onNameChange }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading size="md" my={2}>
        <EditableText text={name} onSubmit={onNameChange} index={index} />
      </Heading>
      <Badge colorScheme={status === "OK" ? "green" : "red"}>{status}</Badge>
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
      <Box my={3}>
        <FaSun />
        <Text display="inline-block" ml={2}>
          Weather: {weather}
        </Text>
      </Box>
    </Box>
  );
};

const Index = () => {
  const handleNameChange = (index, newName) => {
    const updatedWorkers = [...workers];
    updatedWorkers[index].name = newName;
    setWorkers(updatedWorkers);
  };

  const [workers, setWorkers] = useState([
    { name: "John Doe", status: "OK", location: "Zone A", heartbeat: 72, weather: "Sunny" },
    { name: "Jane Smith", status: "OK", location: "Zone B", heartbeat: 75, weather: "Cloudy" },
  ]);

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
        <Box>
          <Button leftIcon={<FaUsers />} colorScheme="teal" variant="solid">
            Create Teams
          </Button>
        </Box>
      </VStack>
      <GoogleMapEmbed location={{ latitude: 40.748817, longitude: -73.985428 }} />
    </Container>
  );
};

export default Index;
