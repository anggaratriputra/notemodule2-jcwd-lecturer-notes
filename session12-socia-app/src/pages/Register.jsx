import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
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

function Register() {
  const { isOpen: showPassword, onToggle: onToggleShowPassword } =
    useDisclosure();
  const { isOpen: showConfirmPassword, onToggle: onToggleShowConfirmPassword } =
    useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values, form) => {
    // validate
    try {
      const res = await api.get("/users");
      const { data } = res;
      const existingEmail = data.filter((user) => user.email === values.email);
      const existingUsername = data.filter(
        (user) => user.username === values.username
      );
      if (existingUsername.length > 0) {
        form.setFieldError("username", "username already used");
        return;
      }
      if (existingEmail.length > 0) {
        form.setFieldError("email", "email already used");
        return;
      }

      // create account
      const { confirmPassword, ...body } = values;
      await api.post("/users", body);
      toast({
        status: "success",
        title: "Account has been created",
        description: "redirecting you to login page",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Something wrong",
        description: error.message,
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const registerSchema = yup.object().shape({
    username: yup.string().required("username can't be empty"),
    email: yup
      .string()
      .required("email can't be empty")
      .email("value must be valid email format"),
    password: yup
      .string()
      .required("password can't be empty")
      .min(6, "password values is less than 6 characters"),
    confirmPassword: yup
      .string()
      .required("confirm password can't be empty")
      .oneOf([yup.ref("password")], "confirmation password is not matches"),
  });

  return (
    <Layout>
      <Center minH="90vh">
        <Container boxShadow="md" px={5} py={10}>
          <Box mb={7}>
            <Heading mb={3}>
              Welcome to{" "}
              <Text as="span" color="orange.600">
                SOCIO
              </Text>
            </Heading>
            <Text>
              already have account?{" "}
              <Link to="/login">
                <Button fontSize="md" variant="link">
                  Login Now
                </Button>
              </Link>
            </Text>
          </Box>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
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
                      <FormLabel>Username</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mb={5}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                            type="button  "
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
                <Field name="confirmPassword">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                      mb={5}
                    >
                      <FormLabel>Confirmation Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          mr="4.5rem"
                          borderRightRadius={0}
                        />
                        <InputRightElement w="4.5rem">
                          <Button
                            w="full"
                            onClick={onToggleShowConfirmPassword}
                            borderLeftRadius={0}
                            type="button  "
                          >
                            <Icon
                              as={showConfirmPassword ? FaEyeSlash : FaEye}
                            />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box>
                  <Button
                    isLoading={forms.isSubmitting}
                    w="full"
                    colorScheme="orange"
                    type="submit"
                  >
                    Register
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

export default Register;
