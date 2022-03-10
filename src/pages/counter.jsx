import { Center, Box, Button, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "reactstrap";

const CounterPage = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const countSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const inputHandler = (event, field) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const setButtonHandler = () => {
    dispatch({
      type: "SET_COUNTER",
      payLoad: parseInt(inputValue),
    });
  };
  const counter = (condition) => {
    if (condition === "plus") {
      dispatch({
        type: "INCREMENT_COUNTER",
      });
    } else if (condition === "minus") {
      dispatch({
        type: "DECREMENT_COUNTER",
      });
    } else if (condition === "reset") {
      dispatch({
        type: "RESET_COUNTER",
      });
    }
  };

  return (
      <Center marginTop={10}>
    <Box>
      <Box display="flex" marginBottom={2}>
        {/* <Flex alignItems="center" mt="10"> */}
          <Button marginRight="4" onClick={() => counter("plus")}>
            +
          </Button>
          <Text fontSize="lg" marginTop={1}>{countSelector.count}</Text>
          <Button marginLeft="4" onClick={() => counter("minus")}>
            -
          </Button>
          <Button marginLeft="4" onClick={() => counter("reset")}>
            Reset
          </Button>
        {/* </Flex> */}
      </Box>
      <Box width="200px">
        {/* <Flex> */}
          <Input onChange={inputHandler}></Input>
          <Button marginLeft="4" onClick={() => setButtonHandler()} marginTop={2}>
            Set Counter
          </Button>
        {/* </Flex> */}
      </Box>
    </Box>

      </Center>
  );
};

export default CounterPage;
