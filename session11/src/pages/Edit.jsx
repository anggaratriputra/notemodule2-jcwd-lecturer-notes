import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import Layout from "../components/Layout";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../slices/users";
import { useParams } from "react-router-dom";

YupPassword(yup);

function Edit() {
  const { userID } = useParams();
  const initialValues = useSelector((state) => {
    const users = state.users.users;
    const index = users.findIndex((user) => user.id === parseInt(userID));
    return users[index];
  });
  const { isOpen: showPassword, onToggle: onTogglePassword } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (values, forms) => {
    api
      .patch(`/users/${userID}`, values)
      .then((res) => {
        dispatch(update(res.data));
        toast({
          title: "User is updated",
          description: "user data is successfully updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to updated user",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        forms.resetForm();
      });
  };

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required("name can't be empty")
      .min(6, "minium characters is 6"),
    email: yup
      .string()
      .required("email can't be empty")
      .email("email value is not email format"),
    password: yup
      .string()
      .required("password can't be empty")
      .min(6, "minimum characters is 6")
      .minLowercase(1, "value must contain lowercase")
      .minUppercase(1, "value must contain uppercase")
      .minNumbers(1, "value must contain number")
      .minSymbols(1, "value must contain symbols"),
  });

  return (
    <Layout>
      <Container maxW="sm" bgColor="blue.100" borderRadius="md" mt={5}>
        <Box pt={7} px={5} pb={5}>
          <Heading as="h1" fontSize="2xl" mb={5}>
            Edit User
          </Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack gap={4}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="name" bgColor="white" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input {...field} placeholder="email" bgColor="white" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        isDisabled={isSubmitting}
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            placeholder="password"
                            bgColor="white"
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement w="4.5rem">
                            <Button size="sm" onClick={onTogglePassword}>
                              {showPassword ? "hide" : "show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Center>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme="gray"
                      variant="solid"
                    >
                      Submit
                    </Button>
                  </Center>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Layout>
  );
}

export default Edit;
