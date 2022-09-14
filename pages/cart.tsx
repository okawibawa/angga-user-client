import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { HostContext } from '../context/HostContext';
import { parseCookies } from 'nookies';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
  Skeleton,
  Grid,
  Box,
  Divider,
  Checkbox,
  CheckboxGroup,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';

import Layout from '../components/Layout';

import { deleteCart, getVa, getProfile, getCart, createVa } from '../apis/api';

interface VAProps {
  name: string;
  code: string;
  is_activated: boolean;
}

const Cart = () => {
  const host = useContext(HostContext);
  const cookies = parseCookies();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [msg, setMsg] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [va, setVA] = useState('');
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const { isLoading, data } = useQuery(['cart'], () => getCart(host?.url, cookies.sfUsername));

  const { isLoading: isLoadingVA, data: dataVA } = useQuery(['va'], () => getVa(host?.url));

  const { data: dataProfile, isLoading: isLoadingProfile }: any = useQuery([`profile-${cookies.sfUsername}`], () =>
    getProfile(host?.url, cookies.sfJwt, cookies.sfUsername)
  );

  const formatter = new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
  });

  const handleSelectVA = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVA(event.currentTarget.value);
  };

  const handleCreateVa = async () => {
    if (!va) {
      setMsg('Pilih metode pembayaran terlebih dahulu!');
      onOpen();
      return;
    }

    setIsLoadingPayment(true);

    const result = await createVa(
      host?.url,
      dataProfile.data.data[0].attributes.phone,
      va,
      dataProfile.data.data[0].attributes.full_name,
      Number(total),
      data.data.data[0].id,
      cookies.sfUserId,
      5 // qty
    );

    if (result.status != 200) {
      setMsg('Proses pembuatan pembayaran gagal. Hubungi admin.');
      onOpen();
      setIsLoadingPayment(false);
      return;
    }

    router.push({ pathname: '/invoice/[index]', query: { index: result.data.data.id } });
  };

  const handleDeleteCart = async (id: number) => {
    const result = await deleteCart(host?.url, id);

    if (result) {
      router.reload();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{msg}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Baik
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Layout>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" width="100%" py={4}>
          <Stack width={['100%', '64%']}>
            <Heading as="h2" size="md">
              Keranjang
            </Heading>

            <Checkbox>Pilih semua</Checkbox>

            <Divider width="100%" />

            {isLoading ? (
              <Heading>Tunggu dulu...</Heading>
            ) : (
              data.data.map((product: any) => (
                <Stack
                  key={product.id}
                  direction="row"
                  justifyContent="space-between"
                  border="1px"
                  borderRadius={6}
                  py={2}
                  px={3}
                  spacing={2}
                >
                  <Stack>
                    <Link
                      href={{
                        pathname: '/product-detail/[index]',
                        query: { index: product.attributes.product.data.attributes.slug },
                      }}
                    >
                      <a>
                        <Stack direction="row">
                          <Text as="p" size="md">
                            Nama Produk:{' '}
                          </Text>
                          <Text as="p" size="md">
                            {product.attributes.product.data.attributes.name}
                          </Text>
                        </Stack>
                      </a>
                    </Link>

                    <Stack direction="row">
                      <Text as="p">Jumlah: </Text>
                      <Text as="p">{product.attributes.qty}</Text>
                    </Stack>

                    <Stack direction="row">
                      <Text as="p">Harga: </Text>
                      <Text as="p">{formatter.format(product.attributes.product.data.attributes.price)}</Text>
                    </Stack>

                    <Stack direction="row">
                      <Text as="p">Subtotal: </Text>
                      <Text as="p">{formatter.format(product.attributes.price)}</Text>
                    </Stack>
                  </Stack>

                  <Text cursor="pointer" as="p" onClick={() => handleDeleteCart(product.id)}>
                    Hapus
                  </Text>
                </Stack>
              ))
            )}
          </Stack>

          <Stack spacing={4} width={['100%', '32%']}>
            <Box border="1px solid #ddd" borderRadius={4} p={6} mb={[4, 0]}>
              <Stack direction="column" spacing={4}>
                <Heading as="h6" size="md">
                  Informasi Pengiriman
                </Heading>

                <Stack spacing={2}>
                  {isLoadingProfile ? (
                    <Skeleton height="20px" width="100%" />
                  ) : (
                    <Text as="p">
                      {dataProfile.data.data[0].attributes.full_name} - ({dataProfile.data.data[0].attributes.phone})
                    </Text>
                  )}

                  {isLoadingProfile ? (
                    <Skeleton height="20px" width="100%" />
                  ) : (
                    <Text as="p">
                      {dataProfile.data.data[0].attributes.address}, {dataProfile.data.data[0].attributes.district},{' '}
                      {dataProfile.data.data[0].attributes.regency} ({dataProfile.data.data[0].attributes.postal_code})
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Box>

            <Box border="1px solid #ddd" borderRadius={4} p={6} mb={[4, 0]}>
              <Stack direction="column" spacing={4}>
                <Heading as="h6" size="md">
                  Virtual Account
                </Heading>

                <Box>
                  <Select
                    placeholder="Pilih virtual account"
                    onChange={handleSelectVA}
                    disabled={isLoadingPayment ? true : false}
                  >
                    {!isLoadingVA &&
                      dataVA.length > 0 &&
                      dataVA.map((va: VAProps) => (
                        <option key={va.code} value={va.code}>
                          {va.name}
                        </option>
                      ))}
                  </Select>
                </Box>
              </Stack>
            </Box>

            <Box border="1px solid #ddd" borderRadius={4} p={6} mb={[4, 0]}>
              <Stack direction="column" spacing={4}>
                <Heading as="h6" size="md">
                  Ringakasan Belanja
                </Heading>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Heading as="h6" size={['sm', 'sm']} color="gray" mb={4}>
                    Total Tagihan
                  </Heading>

                  <Heading as="h6" size={['sm', 'md']} mb={4}>
                    {!isLoading ? formatter.format(total) : <Skeleton height="20px" width="32px" />}
                  </Heading>
                </Box>

                {!isLoading && (
                  <Button
                    colorScheme="blue"
                    // onClick={handleCreateVa}
                    // isLoading={isLoadingPayment}
                    loadingText="Mohon tunggu..."
                    disabled={data.data.length > 0 ? false : true}
                  >
                    Bayar
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Layout>
    </>
  );
};

export default Cart;
