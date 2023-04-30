import { Button } from '@mantine/core';
import { Document, ResourceBadge, useMedplum } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function PatientsList(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const patients = medplum.searchResources('Patient').read();

  return (
    <Document>
      <h1>Patients</h1>
      <table className="foo-table" style={{width:'100%'}}>
        <thead>
          <tr>
            <th align='left'>Name</th>
            <th align='left'>DoB</th>
            <th align='left'>Email</th>
            <th align='left'> Click To View</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>
                <ResourceBadge value={patient} />
              </td>
              <td>{patient.birthDate}</td>
              <td>{patient.telecom?.find((cp) => cp.system === 'email')?.value}</td>
              <td>
                <Button size="sm" onClick={() => navigate(`/Patient/${patient.id}`)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%', marginTop: 50 }}>
        <Button style={{width:"12%"}} onClick={()=> navigate('/Patient/new')}>New</Button>
        <Button style={{marginLeft:'20px',width:"12%"}}>Import</Button>
      </div>
    </Document>
  );
}
