import { ActionIcon, Button, Group } from '@mantine/core';
import { formatDateTime } from '@medplum/core';
import { Appointment } from '@medplum/fhirtypes';
import { Document, useMedplum } from '@medplum/react';
import { IconCheck, IconCross } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AppointmentList(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const profile = medplum.getProfile();
  const appointments = medplum.searchResources('Appointment',`practitioner=${profile?.id}`).read();
  const handleClick = (appointment:Appointment,action:string)=>{
    medplum.updateResource({
      resourceType:'Appointment',
      id:appointment.id,
      participant:[
        {
          actor:{
            id:profile?.id
          },
          status:action as any
        }
      ]
    })
  }


  return (
    <Document>
      <h1>Appointments</h1>
      <table className="foo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start time</th>
            <th>End time</th>
            <th>last update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              
              <td>{appointment.participant?.find((op)=>op.actor?.type === "Patient")?.actor?.display}</td>
              <td>{appointment.start}</td>

              <td>{appointment.end}</td>
              <td>{formatDateTime(appointment.meta?.lastUpdated)}</td>
              <td>
              <Group spacing={3} position="right">
            <ActionIcon onClick={() =>{ handleClick(appointment,"accepted")}}>
            <IconCheck size="2rem" stroke={3} />
          </ActionIcon>
          <ActionIcon onClick={() => handleClick(appointment,"cancelled")} color="green">
            <IconCross size="2rem" stroke={1.5} />
          </ActionIcon>
            </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 50 }}>
        <Button>New</Button>
        <Button>Import</Button>
      </div>
    </Document>
  );
}
