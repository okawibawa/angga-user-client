import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  subject: string;
  text: string;
}

const ContactUs = () => {
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

  const handleSubmitForm = (data: ContactFormProps) => {
    setIsLoading(true);

    setTimeout(() => {
      setValue('email', '');
      setValue('subject', '');
      setValue('text', '');

      setIsLoading(false);
      onOpen();
    }, 3000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Berhasil!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Data berhasil dikirim.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Oke!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Layout>
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

            <FormControl isInvalid={errors.subject ? true : false}>
              <FormLabel>Subjek</FormLabel>
              <Input
                type="text"
                placeholder="Pertanyaan Tentang Ikan."
                {...register('subject', { required: 'Masukkan subjek.' })}
                disabled={isLoading ? true : false}
              />
              {errors.subject && <FormErrorMessage>{errors.subject.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.text ? true : false}>
              <FormLabel>Teks</FormLabel>
              <Textarea
                placeholder="Halo, perkenalkan nama saya..."
                size="md"
                maxHeight={48}
                {...register('text', { required: 'Masukkan teks.' })}
                disabled={isLoading ? true : false}
              />
              {errors.text && <FormErrorMessage>{errors.text.message}</FormErrorMessage>}
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
