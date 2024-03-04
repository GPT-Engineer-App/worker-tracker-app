import React from "react";
import { Box } from "@chakra-ui/react";

const GoogleMapEmbed = ({ location }) => {
  const src = `https://www.google.com/maps/embed/v1/view?key=YOUR_ACTUAL_API_KEY&center=${location.latitude},${location.longitude}&zoom=18&maptype=satellite`;
  return (
    <Box my={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <iframe width="100%" height="450" style={{ border: 0 }} loading="lazy" allowFullScreen src={src}></iframe>
    </Box>
  );
};

export default GoogleMapEmbed;
