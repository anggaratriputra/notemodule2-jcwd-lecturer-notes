import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/auth";

function Layout(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.needLogin && !isLoggedIn) {
      navigate("/login");
    }
  }, [props.needLogin, navigate, isLoggedIn]);

  return (
    <>
      <Box as="header" borderBottom="1px" borderColor="gray.300">
        <Container maxW="container.xl" py={2}>
          <Flex>
            <Center>
              <Link to="/">
                <Text as="span" color="orange.600" fontSize="2xl">
                  SO
                  <Text as="span" fontWeight="extrabold">
                    CIO.
                  </Text>
                </Text>
              </Link>
            </Center>
            <Spacer />
            <HStack>
              {isLoggedIn ? (
                <>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<FaChevronDown />}
                      rounded="full"
                      variant="outline"
                      colorScheme="orange"
                    >
                      {profile.username}
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button colorScheme="orange">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button colorScheme="orange" variant="outline">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
