import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as yup from "yup";
import Layout from "../components/Layout";
import api from "../api";
import { useDispatch } from "react-redux";
import { login } from "../slices/auth";

function Login() {
  const { isOpen: showPassword, onToggle: onToggleShowPassword } =
    useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, form) => {
    return api
      .get(`/users?q=${values.username}`)
      .then((res) => {
        // login logic
        const { data } = res;
        const filteredUser = data
          .filter((user) => {
            return (
              user.username === values.username ||
              user.email === values.username
            );
          })
          .filter((user) => user.password === values.password);
        if (filteredUser.length === 0) {
          toast({
            status: "error",
            title: "Login failed",
            description: "incorrect username or password",
            isClosable: true,
            duration: 5000,
          });
          return;
        }

        const [userProfile] = filteredUser;
        dispatch(login(userProfile));

        toast({
          status: "success",
          title: "Login is success",
          description: "Redirecting you to timeline",
          isClosable: true,
          duration: 3000,
          onCloseComplete: () => {
            form.resetForm();
            navigate("/");
          },
        });
      })
      .catch((error) => {
        toast({
          status: "error",
          title: "Something wrong",
          description: error.message,
          isClosable: true,
          duration: 5000,
        });
        form.resetForm();
      });
  };

  const loginSchema = yup.object().shape({
    username: yup.string().required("username can't be empty"),
    password: yup
      .string()
      .required("password can't be empty")
      .min(6, "password values is less than 6 characters"),
  });

  return (
    <Layout>
      <Center minH="90vh">
        <Container boxShadow="md" px={5} py={10}>
          <Box mb={7}>
            <Heading mb={3}>Sign in for sharing</Heading>
            <Text>
              Not have account?{" "}
              <Link to="/register">
                <Button fontSize="md" variant="link">
                  Register Now
                </Button>
              </Link>
            </Text>
          </Box>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(forms) => (
              <Form>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                      mb={5}
                    >
                      <FormLabel>Username/Email</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mb={5}
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          mr="4.5rem"
                          borderRightRadius={0}
                        />
                        <InputRightElement w="4.5rem">
                          <Button
                            w="full"
                            onClick={onToggleShowPassword}
                            borderLeftRadius={0}
                            type="button"
                          >
                            <Icon as={showPassword ? FaEyeSlash : FaEye} />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex mb={3}>
                  <Spacer />
                  <Button variant="link">Forgot password ?</Button>
                </Flex>
                <Box>
                  <Button
                    isLoading={forms.isSubmitting}
                    w="full"
                    colorScheme="orange"
                    type="submit"
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Center>
    </Layout>
  );
}

export default Login;
