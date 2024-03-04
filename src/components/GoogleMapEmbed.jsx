import React from "react";
import { Box } from "@chakra-ui/react";

const OpenStreetMapEmbed = ({ location }) => {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01}%2C${location.latitude - 0.01}%2C${location.longitude + 0.01}%2C${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`;
  return (
    <Box my={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <iframe width="100%" height="450" style={{ border: 0 }} loading="lazy" allowFullScreen src={src}></iframe>
    </Box>
  );
};

export default OpenStreetMapEmbed;
