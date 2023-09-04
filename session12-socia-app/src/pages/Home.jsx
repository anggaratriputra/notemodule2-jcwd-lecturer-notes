import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";
import Layout from "../components/Layout";
import UserCard from "../components/UserCard";

function Home() {
  return (
    <Layout needLogin>
      <Container maxW="container.xl">
        <Stack mt={5} direction={["column", null, "row"]}>
          <Box order={[2, null, 1]} w={["100%", null, "60%", "70%"]}>
            <Box minW="full">Homepage</Box>
          </Box>
          <Box
            order={[1, null, 2]}
            flexGrow="1"
            w={["100%", null, "40%", "30%"]}
          >
            <Box
              minW="full"
              backgroundColor="orange.50"
              borderRadius="lg"
              p={5}
            >
              <Heading fontSize="lg" mb={5}>
                Who to follow
              </Heading>
              <VStack gap={1}>
                <UserCard username="jonosubekti" />
              </VStack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
}

export default Home;
