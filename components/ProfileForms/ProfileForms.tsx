import React from 'react';
import Countdown from 'react-countdown';
import Link from 'next/link';

// interfaces
interface ProfileFormsProps {
  data: any;
  handleDetails: any;
  details: any;
  handleUpdate: () => void;
  isLoadingUpdate: boolean;
}

// chakra
import { Skeleton, Stack, Alert, Button, Box, Text, Heading, Divider, Input, VStack } from '@chakra-ui/react';

export const Order = ({ data, isLoadingTransactions }: { data: any; isLoadingTransactions: boolean }) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  
  console.log({ trx: data })

  return (
    <Box>
      <Heading as="h6" size="md">
        Pesanan Saya
      </Heading>
      <Text as="p" size="md">
        Informasi pesanan Anda
      </Text>

      <Divider my={8} />

      <Stack>
        <Stack spacing={4} maxWidth="32rem" py={4}>
          {data.data.data.map((data: any) => (
            <Link
              key={data.id}
              href={{ pathname: '/invoice/[index]', query: { index: data.attributes.payment.data.id } }}
            >
              <a>
                <Stack spacing={2} py={2} px={2} border="1px" borderRadius={6}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Text>Status</Text>
                    {isLoadingTransactions ? (
                      <Skeleton height="32px" width="3rem" />
                    ) : (
                      <Alert width="min-content" borderRadius={6} status="warning" fontWeight="bold">{data.attributes.payment.data.attributes.xendit_va_object.status}</Alert>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Text>Bank</Text>
                    {isLoadingTransactions ? (
                      <Skeleton height="32px" width="3rem" />
                    ) : (
                      <Text as="p">{data.attributes.payment.data.attributes.xendit_va_object.bank_code.replace("_", " ")}</Text>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Text>Nomor VA</Text>
                    {isLoadingTransactions ? (
                      <Skeleton height="32px" width="3rem" />
                    ) : (
                      <Text as="p">{data.attributes.payment.data.attributes.xendit_va_object.account_number}</Text>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Text>Jumlah</Text>
                    {isLoadingTransactions ? (
                      <Skeleton height="32px" width="3rem" />
                    ) : (
                      <Text as="p">
                        {formatter.format(data.attributes.payment.data.attributes.xendit_va_object.expected_amount)}
                      </Text>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Text>Bayar sebelum</Text>
                    {isLoadingTransactions ? (
                      <Skeleton height="32px" width="3rem" />
                    ) : (
                      <Text as="p">
                        {new Date(data.attributes.payment.data.attributes.xendit_va_object.expiration_date).toLocaleString()}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </a>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export const Address = ({ data, handleDetails, details, handleUpdate, isLoadingUpdate }: ProfileFormsProps) => {
  return (
    <Box>
      <Heading as="h6" size="md">
        Detail Profil
      </Heading>
      <Text as="p" size="md">
        Informasi pesanan Anda
      </Text>

      <Divider my={8} />

      <VStack align="stretch" spacing={4} mb={6}>
        <Box>
          <Text as="p">Nama</Text>
          <Input
            placeholder="Nama"
            readOnly
            defaultValue={
              details.full_name
                ? details.full_name
                : data.data.data[0].attributes.full_name
                ? data.data.data[0].attributes.full_name
                : ''
            }
            onChange={handleDetails('full_name')}
          />
        </Box>

        <Box>
          <Text as="p">Nomor Telepon</Text>
          <Input
            placeholder="Nomor Telepon"
            disabled={isLoadingUpdate ? true : false}
            defaultValue={
              details.phone
                ? details.phone
                : data.data.data[0].attributes.phone
                ? data.data.data[0].attributes.phone
                : ''
            }
            onChange={handleDetails('phone')}
          />
        </Box>

        <Box>
          <Text as="p">Alamat</Text>
          <Input
            placeholder="Alamat"
            disabled={isLoadingUpdate ? true : false}
            defaultValue={
              details.address
                ? details.address
                : data.data.data[0].attributes.address
                ? data.data.data[0].attributes.address
                : ''
            }
            onChange={handleDetails('address')}
          />
        </Box>

        <Box>
          <Text as="p">Kecamatan</Text>
          <Input
            placeholder="Alamat"
            disabled={isLoadingUpdate ? true : false}
            defaultValue={
              details.district
                ? details.district
                : data.data.data[0].attributes.district
                ? data.data.data[0].attributes.district
                : ''
            }
            onChange={handleDetails('district')}
          />
        </Box>

        <Box>
          <Text as="p">Kabupaten</Text>
          <Input
            placeholder="Alamat"
            disabled={isLoadingUpdate ? true : false}
            defaultValue={
              details.regency
                ? details.regency
                : data.data.data[0].attributes.regency
                ? data.data.data[0].attributes.regency
                : ''
            }
            onChange={handleDetails('regency')}
          />
        </Box>

        <Box>
          <Text as="p">Kode Pos</Text>
          <Input
            placeholder="Kode Pos"
            disabled={isLoadingUpdate ? true : false}
            defaultValue={
              details.postal_code
                ? details.postal_code
                : data.data.data[0].attributes.postal_code
                ? data.data.data[0].attributes.postal_code
                : ''
            }
            onChange={handleDetails('postal_code')}
          />
        </Box>
      </VStack>

      <Button colorScheme="blue" onClick={handleUpdate} isLoading={isLoadingUpdate} loadingText="Memperbarui Data">
        Simpan
      </Button>
    </Box>
  );
};
