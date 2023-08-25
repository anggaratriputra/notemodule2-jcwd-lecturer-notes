import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import TodoList from "./TodoList";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <TodoList />
      </ChakraProvider>
    </>
  );
}

export default App;
