import {
  InputGroup,
  InputRightElement,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "./../../Context/chatProvider";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!password || !email) {
      toast({
        title: "Fill all required fields",
        status: "warning",
        description: "Some fields are not filled ",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: { "content-type": "application/json" },
      };

      const { data } = await axios(
        {
          method: "POST",
          url: "https://chatting-app-backend-by-sabharish.onrender.com/api/user/login",
          data: { email, password },
        },
        config
      );

      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);

      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured in login!!",
        status: "warning",
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button height={"1.5rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => (
          setEmail("guestuser@gmail.com"), setPassword("test1234")
        )}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
