import { AspectRatio, Box, Button, Card, Container, Group, Overlay, SimpleGrid, Table, Title ,createStyles,Image,Text} from '@mantine/core';
import { formatGivenName } from '@medplum/core';
import { HumanName, Patient, Practitioner, Reference, Task } from '@medplum/fhirtypes';
import { Document, ResourceBadge, StatusBadge, useMedplum, useMedplumProfile } from '@medplum/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReassignDialog } from './ReassignDialog';
import { getTaskActions, getTaskType } from './utils';
import  HeroImage from '../img/107555825-doctor-team-with-medical-clinic-background.png'
import { IconGift, IconInbox, IconMessage2 } from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
  // Hero

  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  hero: {
    position: 'relative',
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  heroContainer: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: '4.5rem',
    paddingBottom: '6rem',
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      paddingTop: '3rem',
      paddingBottom: '4.5rem',
    },
  },

  callToAction: {
    backgroundColor: '#51CF66',
    color: theme.white,
    padding: theme.spacing.md,
    textAlign: 'center',
  },

  heroTitle: {
    color: theme.white,
    fontSize: 50,
    fontWeight: 500,
    lineHeight: 1.2,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 30,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  }
}));


const mockdata = [
  {
    title: 'Appointment',
    image:
      'https://www.shutterstock.com/image-photo/booking-meeting-appointment-on-laptop-260nw-1930285112.jpg',
    date: 'Check scheduled appointment',
  },
  {
    title: 'Create care Plans',
    image:
      'https://www.shutterstock.com/shutterstock/photos/179662781/display_1500/stock-photo-nursing-care-plan-word-circle-concept-white-center-with-great-terms-such-as-planning-evaluation-179662781.jpg',
    date: 'Care Plans',
  },
  {
    title: 'Vaccine',
    image: 'https://icma.org/sites/default/files/vaccine%20lead%20image.png',
    date: 'Vaccine',
  }
];


export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const medplum = useMedplum();
  const { classes } = useStyles();
  const profile = useMedplumProfile() as Practitioner;
  const [reassignTask, setReassignTask] = useState<Task>();
  const tasks = medplum.searchResources('Task', '_sort=patient').read();


  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  

  return (
    <>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.heroContainer}>
          <Title className={classes.heroTitle}>
            Hi <span className="text-teal-600">{formatGivenName(profile.name?.[0] as HumanName)}</span>,<br /> welcome to Doctor's portal
          </Title>
        </Container>
      </div>
      <Box className={classes.callToAction}>
        <Group position="center">
          <IconMessage2 />
          <p>Check Inbox here</p>
          <Button variant="light" color='blue' onClick={() => navigate('/messagepage')}>
            Chat
          </Button>
        </Group>
      </Box>


      <Container py="xl" size='xl'>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xl', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>

    
      <Document width={1200}>

        {/* <h1>Welcome {formatGivenName(profile.name?.[0] as HumanName)}</h1> */}
        <Table>
          <tbody>
            {tasks.map((task, taskIndex) => (
              <tr key={task.id}>
                {isPatientVisible(tasks, taskIndex) && (
                  <td rowSpan={getPatientRowSpan(tasks, taskIndex)} style={{ verticalAlign: 'top', paddingTop: 10 }}>
                    <ResourceBadge value={task.for as Reference<Patient>} />
                  </td>
                )}
                <td>{getTaskType(task)}</td>
                <td>{task.description}</td>
                <td>
                  <StatusBadge status={task.status as string} />
                  {task.priority && <StatusBadge status={task.priority as string} />}
                </td>
                <td>
                  <Group spacing="xs">
                    {getTaskActions(task).map((action, actionIndex) => (
                      <Button
                        key={`action-${actionIndex}`}
                        size="xs"
                        variant="outline"
                        onClick={() => navigate(action.href)}
                      >
                        {action.label}
                      </Button>
                    ))}
                    <Button size="xs" variant="outline" onClick={() => setReassignTask(task)}>
                      Reassign
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Document>
      <ReassignDialog
        task={reassignTask}
        onOk={() => setReassignTask(undefined)}
        onCancel={() => setReassignTask(undefined)}
      />
    </>
  );
}

function isPatientVisible(tasks: Task[], index: number): boolean {
  return index === 0 || tasks[index].for?.reference !== tasks[index - 1].for?.reference;
}

function getPatientRowSpan(tasks: Task[], index: number): number {
  let count = 1;
  for (let i = index + 1; i < tasks.length; i++) {
    if (tasks[i].for?.reference === tasks[index].for?.reference) {
      count++;
    } else {
      break;
    }
  }
  return count;
}
