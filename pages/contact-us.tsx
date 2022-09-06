import Layout from '../components/Layout';
import Footer from '../components/Footer';

import {
  Button,
  Text,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';

const ContactUs = () => {
  return (
    <>
      <Layout>
        <Stack direction="column" maxW={512} mx="auto" spacing={4}>
          <FormControl
          // isInvalid={isError}
          >
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              // value={input} onChange={handleInputChange}
            />
            {/* {!isError ? (
              <FormHelperText>Enter the email you'd like to receive the newsletter on.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
          </FormControl>

          <FormControl
          // isInvalid={isError}
          >
            <FormLabel>Subject</FormLabel>
            <Input
              type="text"
              // value={input} onChange={handleInputChange}
            />
            {/* {!isError ? (
              <FormHelperText>Enter the email you'd like to receive the newsletter on.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
          </FormControl>

          <FormControl
          // isInvalid={isError}
          >
            <FormLabel>Subject</FormLabel>
            <Textarea placeholder="Here is a sample placeholder" size="md" maxHeight={48} />
            {/* {!isError ? (
              <FormHelperText>Enter the email you'd like to receive the newsletter on.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )} */}
          </FormControl>

          <Button colorScheme="blue">Submit</Button>
        </Stack>
      </Layout>

      <Footer />
    </>
  );
};

export default ContactUs;
