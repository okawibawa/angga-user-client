import { useState, useContext } from 'react';
import { HostContext } from '../context/HostContext';
import { useRouter } from 'next/router';
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
import { resetPassword } from '../apis/api';
import { url } from 'inspector';

interface ContactFormProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const ContactUs = () => {
  const host = useContext(HostContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();

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

    if (data.passwordConfirmation !== data.password) {
      setMsg('Pastikan konfirmasi password sudah sama.');
      onOpen();
      return;
    }

    const result: any = await resetPassword(host?.url, data.email, data.password);

    if (result.status !== 200) {
      setMsg('Pastikan email sudah benar.');
      onOpen();
      return;
    }

    onOpenSuccess();
    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{msg}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Oke!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenSuccess} onClose={onCloseSuccess}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Password berhasil dirubah!</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                router.replace('/login');
              }}
            >
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

            <FormControl isInvalid={errors.password ? true : false}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Minimal 6 gabungan huruf dan angka."
                {...register('password', { required: 'Masukkan password.' })}
                disabled={isLoading ? true : false}
              />
              {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.passwordConfirmation ? true : false}>
              <FormLabel>Konfirmasi Password</FormLabel>
              <Input
                type="password"
                placeholder="Minimal 6 gabungan huruf dan angka."
                {...register('passwordConfirmation', { required: 'Masukkan password.' })}
                disabled={isLoading ? true : false}
              />
              {errors.passwordConfirmation && (
                <FormErrorMessage>{errors.passwordConfirmation.message}</FormErrorMessage>
              )}
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
