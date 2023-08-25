import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    {
      value: "Create Guest Experience mobile check-in",
      isDone: false,
    },
    {
      value: "Document current CI/CD process",
      isDone: false,
    },
    {
      value: "Perform code review for final Pillow-talk release",
      isDone: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo) {
      const newTodos = [...todos, { value: newTodo, isDone: false }];
      setTodos(newTodos);
      setNewTodo("");
    }
  };

  const handleDelete = (index) => {
    const copy = [...todos];
    copy.splice(index, 1);
    setTodos(copy);
  };

  const donedTodo = todos.filter((todo) => todo.isDone).length;

  return (
    <Container maxW="container.md">
      <Center my="2em">
        <Heading size="lg">Chore Todo List</Heading>
      </Center>
      <VStack borderBottomColor="gray.300" borderBottomWidth="1px" pb="1em">
        {todos.map((todo, index) => (
          <Flex key={todo.value} w="100%" mb=".5em">
            <Checkbox
              borderColor="green.500"
              colorScheme="green"
              isChecked={todo.isDone}
              onChange={() => {
                const copy = [...todos];
                copy[index].isDone = !copy[index].isDone;
                setTodos(copy);
              }}
            >
              {todo.value}
            </Checkbox>
            <Spacer />
            <IconButton
              variant="outline"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(index)}
            ></IconButton>
          </Flex>
        ))}
      </VStack>
      <Center my="2em">
        <Heading size="lg">Done: {donedTodo}</Heading>
      </Center>
      <Box>
        <FormControl mb="1em">
          <FormLabel>Add Todo</FormLabel>
          <Input
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddTodo}>
          Add Task
        </Button>
      </Box>
    </Container>
  );
}

export default TodoList;
