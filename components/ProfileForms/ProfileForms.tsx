import React from 'react';

// interfaces
interface ProfileFormsProps {
  data: any;
  handleDetails: any;
  details: any;
  handleUpdate: () => void;
  isLoadingUpdate: boolean;
}

// chakra
import { Button, Box, Text, Heading, Divider, Input, VStack } from '@chakra-ui/react';

export const ProfileInfo = () => {
  return (
    <Box>
      <Heading as="h6" fontSize="md">
        Profile Saya
      </Heading>
      <Text as="p" fontSize="md">
        Kelola Informasi profile Anda
      </Text>

      <Divider my={8} />

      <Text as="p">Username</Text>
    </Box>
  );
};

export const Address = ({ data, handleDetails, details, handleUpdate, isLoadingUpdate }: ProfileFormsProps) => {
  // console.log({ data });

  return (
    <Box>
      <Heading as="h6" fontSize="md">
        Detail Profil
      </Heading>

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
