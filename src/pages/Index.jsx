import React from "react";
import { Box, Heading, Container, VStack, SimpleGrid, Badge, Text, Button, Divider } from "@chakra-ui/react";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import { FaMapMarkerAlt, FaHeartbeat, FaUsers, FaSun } from "react-icons/fa";

const WorkerCard = ({ name, status, location, heartbeat, weather }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Heading size="md" my={2}>
        {name}
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
  // This would be replaced with actual API calls to fetch worker data
  const workers = [
    { name: "John Doe", status: "OK", location: "Zone A", heartbeat: 72, weather: "Sunny" },
    { name: "Jane Smith", status: "OK", location: "Zone B", heartbeat: 75, weather: "Cloudy" },
    // ... other workers
  ];

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={8}>
        <Heading>Work Site Safety Tracker</Heading>
        <Divider />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {workers.map((worker, index) => (
            <WorkerCard key={index} {...worker} />
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
