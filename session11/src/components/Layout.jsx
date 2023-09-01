import { Box, Center, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Layout(props) {
  const totalUser = useSelector((state) => state.users.totalData);

  return (
    <>
      <Box as="header" bgColor="teal.700" py={5}>
        <Center>
          <HStack gap={20} color="white">
            <Link to="/">Users ({totalUser})</Link>
            <Link to="/register">Register</Link>
          </HStack>
        </Center>
      </Box>
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
