import React from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";

const SideNotificationBar = ({ notifications, onClose }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0" // Updated property from "right" to "left"
      bottom="0"
      width="300px"
      backgroundColor="blue.500"
      color="white"
      padding="16px"
    >
      {notifications.map((notification, index) => (
        <Box key={index} marginBottom="16px">
          <Text>{notification}</Text>
          <CloseButton onClick={() => onClose(index)} />
        </Box>
      ))}
    </Box>
  );
};

export default SideNotificationBar;
