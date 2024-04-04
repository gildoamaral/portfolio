import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen, onClose } = useAlertContext();

  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        onOpen(response.type, response.message)
        formik.resetForm();
        setTimeout(() => {
          onClose(); // Close the alert after 5=3 seconds
        }, 3000);
        return
      }
      if (response.type === "error") {
        onOpen(response.type, response.message)
        setTimeout(() => {
          onClose(); // Close the alert after 3 seconds
        }, 3000);
        return
      }
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: '',
    },
    onSubmit: async (values) => {
      try {
        await submit('your-api-endpoint', values)
        console.log('Submit Call')
      } catch (error) {
        // Handle error
        console.error('Error submitting form:', error)
      }
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .required('O nome é obrigatório'),
      email: Yup
        .string()
        .email('Email inválido')
        .required('O email é obrigatório'),
      type: Yup
        .string()
        .required('O tipo é obrigatório'),
      comment: Yup
        .string()
        .required('O comentário é obrigatório')
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>

              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  {...formik.getFieldProps('email')}
                  type="email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.type && formik.errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" {...formik.getFieldProps('type')} >
                  <option />
                  <option value="hireMe" style={{ color: "black" }}>Freelance project proposal</option>
                  <option value="openSource" style={{ color: "black" }}>Open source consultancy session</option>
                  <option value="other" style={{ color: "black" }}>Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  {...formik.getFieldProps('comment')}
                  height={250}

                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading} loadingText={"Loading . . ."}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
