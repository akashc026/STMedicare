import { Button } from '@mantine/core';
import { formatDateTime } from '@medplum/core';
import { Document, useMedplum } from '@medplum/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function FormsList(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const forms = medplum.searchResources('Questionnaire').read();

  return (
    <Document>
      <h1>Forms</h1>
      <table className="foo-table" style={{width:'100%'}}>
        <thead>
          <tr>
            <th align='left'>Title</th>
            <th align='left'>Publisher</th>
            <th align='left'>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.title}</td>
              <td>{form.publisher}</td>
              <td>{formatDateTime(form.meta?.lastUpdated)}</td>
              <td>
                <Button size="sm" onClick={() => navigate(`/Questionnaire/${form.id}`)}>
                  View
                </Button>
                <Button style={{marginLeft:'20px'}} size="sm" onClick={() => navigate(`/Questionnaire/${form.id}/editor`)}>
                  Edit
                </Button>
                <Button style={{marginLeft:'20px'}} size="sm" onClick={() => navigate(`/Questionnaire/${form.id}/assign`)}>
                  Assign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:'flex', justifyContent:'center', marginTop: 50 }}>
        <Button style={{width:"12%"}} onClick={()=> navigate('/Questionnaire/new')} >New</Button>
        <Button style={{marginLeft:'20px',width:"12%"}}>Import</Button>
      </div>
    </Document>
  );
}
