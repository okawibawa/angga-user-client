import { useState, useContext } from 'react';
import { HostContext } from '../context/HostContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

interface ContactFormProps {
  email: string;
}

import { forgotPassword } from '../apis/api';

const ContactUs = () => {
  const host = useContext(HostContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    setValue,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>();

  const handleSubmitForm = async (data: ContactFormProps) => {
    setIsLoading(true);

    const result: any = await forgotPassword(host?.url, data.email);

    if (result.status === 200) {
      onOpen();
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Berhasil!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>URL untuk merubah password berhasil dikirim. Silahkan cek email anda.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Oke!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Layout>
        <Heading as="h2" size="md" textAlign="center" mb={8}>
          Reset password Anda.
        </Heading>
        <form>
          <Stack direction="column" maxW={512} mx="auto" spacing={4}>
            <FormControl isInvalid={errors.email ? true : false}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="putra@gmail.com"
                {...register('email', { required: 'Masukkan email.' })}
                disabled={isLoading ? true : false}
              />
              {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              onClick={handleSubmit(handleSubmitForm)}
              isLoading={isLoading}
              loadingText="Mohon tunggu..."
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Layout>

      <Footer />
    </>
  );
};

export default ContactUs;
