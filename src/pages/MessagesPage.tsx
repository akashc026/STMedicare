import { Button, Divider, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { createReference, formatDateTime, getReferenceString } from '@medplum/core';
import { Communication, Patient, Practitioner, ResourceType } from '@medplum/fhirtypes';
import { Document, Form, ResourceAvatar, ResourceName, useMedplum, useMedplumProfile } from '@medplum/react';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import React from 'react';

export function Messages(): JSX.Element {
  const medplum = useMedplum();
  const profile = useMedplumProfile() as Practitioner;
  const [messages, setMessages] = useState<Communication[]>();
  const user_patient = medplum.readResource('Patient' as ResourceType, 'eac64381-6c4f-4cb2-b429-ea85487788e9' as string).read() as Patient;
  //console.log(user_patient);
  let data = new Set();





  useEffect(() => {

    if (profile) {
     
    const prom =  medplum.searchResources('Communication', `sender=${getReferenceString(profile)}`)
    const prom2 =  medplum.searchResources('Communication', `recipient=${getReferenceString(profile)}`)
    Promise.all([prom,prom2]).then(data=>setMessages([...data[0],...data[1]]))
    
  }
 
    // medplum
    //   .graphql(
    //     `
    //     {
    //       CommunicationList(subject: "${getReferenceString(user_patient)}") {
    //         resourceType
    //         id
    //         meta {
    //           lastUpdated
    //         }
    //         payload {
    //           contentString
    //           contentAttachment {
    //             url
    //             contentType
    //           }
    //         }
    //         sender {
    //           reference
    //           resource {
    //             ... on Patient {
    //               resourceType
    //               id
    //               name {
    //                 given
    //                 family
    //               }
    //               photo {
    //                 contentType
    //                 url
    //               }
    //             }
    //             ... on Practitioner {
    //               resourceType
    //               id
    //               name {
    //                 given
    //                 family
    //               }
    //               photo {
    //                 contentType
    //                 url
    //               }
    //             }
    //           }
    //         }
    //       }
    //   }
    //     `
    //   )
    //   .then((value) => setMessages(value.data.CommunicationList as Communication[]))
    //   .catch((err) => console.error(err));
  }, [medplum, profile]);

  var msg = messages?.sort((a, b) => {
    let fi = new Date(a?.meta?.lastUpdated as string);
    let fg = new Date(b?.meta?.lastUpdated as string);
    return Number(fi) - Number(fg);
  })
  console.log(msg);
  if (!messages) {
    return <Loading />;
  }

  return (
    <Document width={800}>
      <Title>Messages</Title>
      <Divider my="xl" />
      <Stack spacing="xl">
        {messages.map((resource) => (
          <div key={resource.id}>
            <Group align="top">
              <ResourceAvatar size="lg" radius="xl" value={resource.sender as Patient | Practitioner} />
              <div>
                <Text size="sm" weight={500}>
                  <ResourceName value={resource.sender as Patient | Practitioner} />
                </Text>
                <Text size="xs" color="dimmed">
                  {formatDateTime(resource?.meta?.lastUpdated)}
                </Text>
                <Text size="md" my="sm">
                  {resource.payload?.[0].contentString}
                </Text>
              </div>
            </Group>
          </div>
        ))}
        <div style={{ margin: '0 -20px -20px -20px', padding: 20, background: '#f8f8f8' }}>
          <Form
            onSubmit={(formData: Record<string, string>) => {
              medplum
                .createResource({
                  resourceType: 'Communication',
                  status: 'completed',
                  subject: createReference(user_patient),
                  recipient: [createReference(user_patient)],
                  sender: createReference(profile),
                  payload: [{ contentString: formData.contentString }],
                })
                .then((result) => setMessages([...messages, result]))
                .catch(console.log);
            }}
          >
            <Group align="top">
              <ResourceAvatar size="lg" radius="xl" value={profile} />
              <Textarea name="contentString" style={{ flex: 1 }} placeholder="Add note" autosize />
            </Group>
            <Group position="right" mt="md">
              <Button type="submit">Send</Button>
            </Group>
          </Form>
        </div>
      </Stack>
    </Document>
  );
}
