import { Text } from '@mantine/core';
import { Logo, SignInForm } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SignInPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <SignInForm
      projectId="a4c92ea7-da43-40e4-91ad-d0f4b76cac5e"
      googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"
      
      onSuccess={() => navigate('/')}
    >
      <Logo size={32} />
      <Text size="lg">Sign in to Foo Provider</Text>
    </SignInForm>
  );
}
