import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { removeItem } from "../features/cart/cartSlice";

function Cart() {
  const itemsCarts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <Layout>
      <Container
        mt={2}
        maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={2}>
          {itemsCarts.map((product) => (
            <Card key={product.id}>
              <CardBody>
                <Center minH="sm" maxH="sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    borderRadius="lg"
                    boxSize="250px"
                    objectFit={"contain"}
                  />
                </Center>
                <Stack mt={2} spacing={3}>
                  <Heading size="md" as="h3" noOfLines={1}>
                    {product.title}
                  </Heading>
                  <Text noOfLines={3}>{product.description}</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Text fontSize="2xl" color="blue.300">
                  ${product.price}
                </Text>
                <Spacer />
                <Button
                  colorScheme="red"
                  onClick={() => {
                    dispatch(removeItem(product.id));
                  }}
                >
                  Remove from cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export default Cart;
