import { Document } from '@medplum/react';
import { ReactComponent as Logo } from '../components/logo-white.svg';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex } from '@mantine/core';

export function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Document style={{ height: 500, width: 800 }}>
      {/* <h1>ST Medicare</h1> */}
      <div>
        <Logo style={{ width: 200, height: 80, marginLeft: '-3%' }} />
        <p>
          <div>
            <img
              style={{ float: 'right', width: '50%', height: '35%', borderRadius: '45%' }}
              src="https://www.statnews.com/wp-content/uploads/2017/02/AP78991782.jpg"
            />
          </div>
         

          <div className="mantine-Container-root mantine-norobh">
            <div className="mantine-2i4u6y">
              <div className="mantine-651e11">
                <h1 className="mantine-Text-root mantine-Title-root mantine-15e4rx9">
                  An extraordinary
                  <br />
                  <span className="mantine-thcc18">doctor's office</span>
                </h1>
                <div className="mantine-Text-root mantine-1euknw2">
                  Hello Welcome to ST Medicare.One stop shop for all your medical care.
                </div>
                <div className="mantine-Group-root mantine-1fcmy3z" style={{marginTop:'15%',marginLeft:'15%'}}>
                <Button style={{ marginLeft: '-15%' }} onClick={() => navigate('/signin')}>Sign In</Button>
                <Button style={{ marginLeft: '20%' }} onClick={() => navigate('/register')}>
              Register
            </Button>
                </div>
              </div>
            </div>
          </div>

          {/* <Link to="/signin">Sign in</Link> */}
        </p>
      </div>
    </Document>
  );
}
