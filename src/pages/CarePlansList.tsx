import { ActionIcon, Button, Card, Group ,Table,Text, createStyles} from '@mantine/core';
import { formatDateTime } from '@medplum/core';
import { Document, ResourceBadge, useMedplum } from '@medplum/react';
import { IconEye, IconPencil } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}));

export function CarePlansList(): JSX.Element {
  const { classes, theme } = useStyles();
  const medplum = useMedplum();
  const navigate = useNavigate();
  const planDefinitions = medplum.searchResources('PlanDefinition').read();

  

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <h1>Care Plans</h1>
          <Table sx={{ minWidth: 700 }} verticalSpacing="xl">
            <thead>
              <tr>
                <th>Title</th>
                <th>Publisher</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {planDefinitions.map((planDefinition) => (
                <tr key={planDefinition.id}>
                  <td>
                    <Text fz="sm" c="dimmed">
                      {planDefinition.title}
                    </Text>
                  </td>
                  <td>
                    <Text fz="sm" c="dimmed">
                      {planDefinition.publisher}
                    </Text>
                  </td>
                  <td>
                    <Text fz="sm" c="dimmed">
                      {formatDateTime(planDefinition.meta?.lastUpdated)}
                    </Text>
                  </td>
                  <td>
                    <Group spacing={3} position="right">
                      <ActionIcon onClick={() => navigate(`/PlanDefinition/${planDefinition.id}/editor`)}>
                        <IconPencil size="2rem" stroke={3} />
                      </ActionIcon>
                      <ActionIcon onClick={() => navigate(`/PlanDefinition/${planDefinition.id}`)} color="green">
                        <IconEye size="2rem" stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon onClick={() => navigate(`/PlanDefinition/${planDefinition.id}/assign`)} color="green">
                        <IconEye size="2rem" stroke={1.5} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
                // <tr key={planDefinition.id}>
                //   <td>{planDefinition.title}</td>
                //   <td>{planDefinition.publisher}</td>
                //   <td>{formatDateTime(planDefinition.meta?.lastUpdated)}</td>
                //   <td>
                //     <Button size="sm" onClick={() => navigate(`/PlanDefinition/${planDefinition.id}`)}>
                //       View
                //     </Button>
                //     <Button size="sm" onClick={() => navigate(`/PlanDefinition/${planDefinition.id}/editor`)}>
                //       Edit
                //     </Button>
                //     <Button size="sm" onClick={() => navigate(`/PlanDefinition/${planDefinition.id}/assign`)}>
                //       Assign
                //     </Button>
                //   </td>
                // </tr>
              ))}
            </tbody>
          </Table>
        </Group>
      </Card>
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',width:'100%', marginTop: 50 }}>
        <Button radius="xl" size="md" onClick={() => { navigate('/CarePlan/new'); } }>New</Button>
        <Button radius="xl" style={{marginLeft:'20px'}} size="md">Import</Button>
      </div></>
    
  );
}
