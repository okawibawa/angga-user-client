import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { HostContext } from '../context/HostContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { parseCookies, setCookie } from 'nookies';

// chakra
import { Divider, Text, Box, Heading, Grid, GridItem, Stack } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import { Order, Address } from '../components/ProfileForms/ProfileForms';
import { getProfile, updateProfile, getPaymentByProfile } from '../apis/api';

interface UserProps {
  address: string;
  phone: string;
  postal_code: string;
  district: string;
  regency: string;
}

interface UpdateUserProps {
  url: string;
  jwt: string;
  userId: string;
  body: UserProps;
}

const Profile = () => {
  const host = useContext(HostContext);
  const cookies = parseCookies();
  const router = useRouter();

  const [currentMenu, setCurrentMenu] = useState('detail');
  const [details, setDetails] = useState<any>([]);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  useEffect(() => {}, [currentMenu]);

  const { data, isLoading, isError, error }: any = useQuery([`profile-${cookies.sfUsername}`], () =>
    getProfile(host?.url, cookies.sfJwt, cookies.sfUsername)
  );

  const { data: dataTransaction, isLoading: isLoadingTransaction }: any = useQuery(
    ['profile-${cookies.sfUsername}'],
    () => getPaymentByProfile(host?.url, cookies.sfUsername)
  );

  const handleDetails = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleUpdate = async () => {
    const body: any = [
      {
        address: details.address ? details.address : data.data.data[0].attributes.address,
        phone: details.phone ? details.phone : data.data.data[0].attributes.phone,
        postal_code: details.postal_code ? details.postal_code : data.data.data[0].attributes.postal_code,
        district: details.district ? details.district : data.data.data[0].attributes.district,
        regency: details.regency ? details.regency : data.data.data[0].attributes.regency,
      },
    ];

    setIsLoadingUpdate(true);

    const result: any = await updateProfile(host?.url, cookies.sfJwt, cookies.sfUserId, body);

    if (result.status == 200) {
      router.reload();
    }
  };

  return (
    <Layout>
      <Box>
        <Grid gridTemplateColumns={['1fr', '16rem 1fr']} gap={8}>
          <GridItem>
            <Stack border="1px solid lightgrey" p={2} borderRadius={4}>
              <Text
                as="p"
                onClick={() => setCurrentMenu('detail')}
                cursor="pointer"
                color={currentMenu === 'detail' ? 'rgb(49, 130, 206)' : 'black'}
              >
                Detail Profil
              </Text>

              {/* <Text
                as="p"
                onClick={() => setCurrentMenu('order')}
                cursor="pointer"
                color={currentMenu === 'order' ? 'rgb(49, 130, 206)' : 'black'}
              >
                Pesanan Saya
              </Text> */}
            </Stack>
          </GridItem>

          <GridItem mb={[6, 0]}>
            {!isLoading ? (
              <>
                {currentMenu === 'order' && (
                  <Order isLoadingTransactions={isLoadingTransaction} data={dataTransaction} />
                )}

                {currentMenu === 'detail' && (
                  <Address
                    data={data}
                    isLoadingUpdate={isLoadingUpdate}
                    details={details}
                    handleDetails={handleDetails}
                    handleUpdate={handleUpdate}
                  />
                )}
              </>
            ) : (
              <Heading>Mohon tunggu...</Heading>
            )}
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Profile;
