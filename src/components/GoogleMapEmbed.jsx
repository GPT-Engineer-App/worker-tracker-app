import React from "react";
import { Box } from "@chakra-ui/react";

const OpenStreetMapEmbed = ({ workers }) => {
  const markers = workers.map((worker) => `&markers=${worker.latitude}%2C${worker.longitude}`);
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${workers[0].longitude - 0.01}%2C${workers[0].latitude - 0.01}%2C${workers[0].longitude + 0.01}%2C${workers[0].latitude + 0.01}${markers.join("")}&layer=mapnik`;
  return (
    <Box my={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <iframe width="100%" height="450" style={{ border: 0 }} loading="lazy" allowFullScreen src={src}></iframe>
    </Box>
  );
};

export default OpenStreetMapEmbed;
