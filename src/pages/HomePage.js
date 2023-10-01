import React from "react";
import Login from "../components/authentication/Login";
import Signup from "./../components/authentication/Signup";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import SideNotificationBar from "../components/miscellaneous/SideNotificationBar";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      console.log(history);
      history.push(
        "https://chatting-app-backend-by-sabharish.onrender.com/api/chats"
      );
    }
  }, [history]);

  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          w={"100%"}
          m={"40px 0 15px 0"}
          bg={"white"}
          borderRadius={"lg"}
          borderWidth={"1px"}
        >
          <Text
            fontSize={"4xl"}
            fontFamily="work sans"
            color={"black"}
            align={"center"}
          >
            MingleChat
          </Text>
        </Box>

        <Box
          bg={"white"}
          p={4}
          borderWidth={"1px"}
          borderRadius={"lg"}
          w={"100%"}
        >
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb={"1em"}>
              <Tab w={"50%"}>Login</Tab>
              <Tab w="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
