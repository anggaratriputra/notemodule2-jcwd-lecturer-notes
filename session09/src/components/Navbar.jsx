import {
  Badge,
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaBars,
  FaCartShopping,
  FaMoon,
  FaSun,
  FaXmark,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NAV_MENU = ["Shop", "About", "Contact"];

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const cartTotalItem = useSelector((state) => state.cart.totalItem);

  const linkColor = useColorModeValue("gray.700", "gray.200");
  const linkColorHover = useColorModeValue("gray.800", "white");
  const linkBgColorHover = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Flex
        minH="60px"
        w={"full"}
        position={"fixed"}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        align="center"
        zIndex={10}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Flex flex={{ base: 1, md: "auto" }} ml={-2} display={{ md: "none" }}>
          <IconButton
            icon={
              isOpen ? (
                <Icon as={FaXmark} w={5} h={5} />
              ) : (
                <Icon as={FaBars} w={4} h={4} />
              )
            }
            variant="ghost"
            onClick={onToggle}
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={1} justify={{ base: "center", md: "start" }}>
          <Text textAlign={useBreakpointValue({ base: "center", md: "left" })}>
            <Link to="/">PaluGadaStore</Link>
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <HStack spacing={4}>
              {NAV_MENU.map((item) => (
                <Box key={item}>
                  <Box
                    as="a"
                    href="#"
                    p={2}
                    fontSize="sm"
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: "none",
                      color: { linkColorHover },
                    }}
                  >
                    {item}
                  </Box>
                </Box>
              ))}
            </HStack>
          </Flex>
        </Flex>
        <HStack flex={{ base: 1, md: 0 }} justify="flex-end" spacing={3}>
          <Box>
            <IconButton
              icon={<Icon as={colorMode === "light" ? FaSun : FaMoon} />}
              onClick={toggleColorMode}
              variant={"ghost"}
              rounded={"full"}
            />
          </Box>
          <Link to="/cart">
            <Box position="relative">
              <IconButton
                icon={<Icon as={FaCartShopping} />}
                variant={"ghost"}
              ></IconButton>
              <Badge
                colorScheme="green"
                position="absolute"
                right="0"
                top={0}
                rounded="3xl"
                fontSize={"xs"}
              >
                {cartTotalItem}
              </Badge>
            </Box>
          </Link>
        </HStack>
      </Flex>
      <Collapse in={isOpen} animate>
        <Stack
          bg={useColorModeValue("white", "gray.800")}
          display={{ md: "none" }}
          position={"fixed"}
          w={"full"}
          top="60px"
          zIndex={10}
        >
          {NAV_MENU.map((item) => (
            <Box
              key={item}
              py={2}
              px={1}
              as="a"
              href="#"
              justifyContent="space-between"
              opacity={0.8}
              alignItems="center"
              _hover={{
                opacity: "1",
                bgColor: linkBgColorHover,
              }}
              color={linkColor}
              display="block"
            >
              {item}
            </Box>
          ))}
        </Stack>
      </Collapse>
    </>
  );
}

export default Navbar;
