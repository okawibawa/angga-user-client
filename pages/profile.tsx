import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { HostContext } from '../context/HostContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { parseCookies, setCookie } from 'nookies';

// chakra
import { Divider, Text, Box, Heading, Grid, GridItem } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import { ProfileInfo, Address } from '../components/ProfileForms/ProfileForms';
import { getProfile, updateProfile } from '../apis/api';

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

  const { data, isLoading, isError, error }: any = useQuery([`profile-${1}`], () =>
    getProfile(host?.url, cookies.sfJwt, cookies.sfUsername)
  );

  if (!isLoading) {
    setCookie(null, 'sfUserId', data.data.data[0].id, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }

  const handleDetails = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [name]: e.target.value });
  };

  // const mutation = useMutation<UpdateUserProps>(updateProfile);

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

    // await mutation.mutate({
    //   url: host?.url,
    //   jwt: cookies.sfJwt,
    //   userId: cookies.sfUserId,
    //   body: body,
    // });

    const result: any = await updateProfile(host?.url, cookies.sfJwt, cookies.sfUserId, body);

    if (result.statusText === 'OK') {
      router.reload();
    }
  };

  return (
    <Layout>
      <Box>
        <Grid gridTemplateColumns="16rem 1fr" gap={8}>
          <GridItem>
            <Box border="1px solid lightgrey" p={2} borderRadius={4}>
              {/* <Text
              as="p"
              onClick={() => setCurrentMenu('profile')}
              cursor="pointer"
              color={currentMenu === 'profile' ? 'blue' : 'black'}
            >
              Profil
            </Text> */}

              <Text
                as="p"
                onClick={() => setCurrentMenu('detail')}
                cursor="pointer"
                my={4}
                color={currentMenu === 'detail' ? 'rgb(49, 130, 206)' : 'black'}
              >
                Detail Profil
              </Text>
            </Box>
          </GridItem>
          <GridItem>
            {!isLoading ? (
              <>
                {/* {currentMenu === 'profile' && <ProfileInfo />} */}

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
