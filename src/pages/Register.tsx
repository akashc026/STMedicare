// import { Title } from "@mantine/core";
// import { Logo, RegisterForm } from "@medplum/react";

// export function Register(): JSX.Element {
//     return ( 
//         <RegisterForm type="project"  onSuccess={() => alert('Registered!')} googleClientId="xyz">
//           <Logo size={32} />
//           <Title>Register new account</Title>
//         </RegisterForm>
//         );
//   }


import React from 'react';
import { Title } from "@mantine/core";
import { RegisterForm } from "@medplum/react";
import { ReactComponent as Logo } from '../components/logo-white.svg';
import { useNavigate } from 'react-router-dom';

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const googleClientId="921088377005-3j1sa10vr6hj86jgmdfh2l53v3mp7lfi.apps.googleusercontent.com"
  const siteKey = "6Ldc5M0lAAAAAEXzwXD_RgOGpUts36eRac3SGGSj"

//   console.log("process",process.env.SITE_KEY )
  return ( 
    <RegisterForm type="patient" projectId="7cfa6392-9d79-4738-b560-fa1fc9029c96" recaptchaSiteKey={siteKey} googleClientId={googleClientId} onSuccess={() => navigate('/')}>
       <Logo style={{ width: 200, height: 80}} />
      <Title>Register new account</Title>
    </RegisterForm>
    );
}