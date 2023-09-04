import { Button, Center, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";

const color = [
  "red.300",
  "orange.300",
  "teal.300",
  "yellow.300",
  "green.300",
  "teal.300",
  "blue.300",
  "cyan.300",
  "purple.300",
  "pink.300",
];

function UserCard(props) {
  const unameUpper = props.username.toUpperCase();
  const initialAlp = unameUpper.charCodeAt(0) - 71;

  return (
    <HStack bgColor="white" boxShadow="md" borderRadius="md" p={4} w="full">
      <Center
        boxSize={10}
        borderRadius="full"
        bgColor={color[initialAlp % 10]}
        mr={2}
      >
        {props.username[0].toUpperCase()}
      </Center>

      <Button variant="link" colorScheme="orange" fontWeight="light">
        {props.username}
      </Button>
      <Spacer />
      <IconButton
        colorScheme="orange"
        icon={<FaUserPlus />}
        variant="ghost"
        fontSize="2xl"
        isRound
      />
    </HStack>
  );
}

export default UserCard;
