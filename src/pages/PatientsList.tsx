import { Button } from '@mantine/core';
import { Document, ResourceBadge, useMedplum } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsList } from './CardsList';
import { Patient } from '@medplum/fhirtypes';

export function PatientsList(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const patients = medplum.searchResources('Patient').read();

  return (
   <>
      <h1>Patients</h1>
          {/* {patients.map((patient) => ( */}
            <CardsList patient={patients}></CardsList>
          {/* ))} */}

      <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%', marginTop: 50 }}>
        <Button style={{width:"12%"}} onClick={()=> navigate('/Patient/new')}>New</Button>
        <Button style={{marginLeft:'20px',width:"12%"}}>Import</Button>
      </div>
      </>
  );
}
