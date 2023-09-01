import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const users = useSelector((state) => state.users.users);

  return (
    <Layout>
      <Container maxW="container.md" mt={5}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Password</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.password}</Td>
                <Td>
                  <ButtonGroup>
                    <Link to={`/edit/${user.id}`}>
                      <Button variant="link">Edit</Button>
                    </Link>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            {users.length === 0 && (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No Data
                </Td>
              </Tr>
            )}
          </Tfoot>
        </Table>
      </Container>
    </Layout>
  );
}

export default Home;
