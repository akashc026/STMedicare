import { Document} from '@medplum/react';
import { ReactComponent as Logo } from '../components/logo-white.svg';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

export function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Document>
      {/* <h1>ST Medicare</h1> */}
      <Logo style={{ width: 200, height: 80, marginLeft:"-3%"}} />
      <p>

      <Button onClick={()=> navigate("/signin")}>Sign In</Button>
      <Button onClick={()=> navigate("/register")}>Register</Button>
        {/* <Link to="/signin">Sign in</Link> */}
      </p>
    </Document>
  );
}
