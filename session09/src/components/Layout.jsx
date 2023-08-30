import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Box h="60px"></Box>
        {props.children}
      </main>
    </>
  );
}

export default Layout;
