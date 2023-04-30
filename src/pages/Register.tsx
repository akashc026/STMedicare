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

  return ( 
    <RegisterForm type="patient" recaptchaSiteKey={"6LfB3s0lAAAAAIsM0lEJoBX2VRccXuaWo0vfrsjj"}  onSuccess={() => navigate('/')}>
       <Logo style={{ width: 200, height: 80}} />
      <Title>Register new account</Title>
    </RegisterForm>
    );
}