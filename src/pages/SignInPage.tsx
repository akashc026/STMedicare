import { BackgroundImage, Box, Container, SimpleGrid, Text } from '@mantine/core';
import { SignInForm } from '@medplum/react';
import React from 'react';
import { ReactComponent as Logo } from '../components/logo-white.svg';
import { useNavigate } from 'react-router-dom';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();

  return (

    
    <SimpleGrid cols={1}>
      <BackgroundImage style={{minHeight:'100%'}} src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1567&amp;q=80">
      <Box pt={100} pb={200}>

        <Container mih={450}>
    <SignInForm
      projectId="d08db73d-28cd-4590-ace8-06c924a97793"
      googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"
      
      onSuccess={() => navigate('/')}
    >
      <Logo style={{ width: 200, height: 80 }} />
      <Text size="lg">Sign in to Softype Medplum</Text>
    </SignInForm>
    </Container>
        
      </Box>
      </BackgroundImage>
   
    </SimpleGrid>
  );
}
