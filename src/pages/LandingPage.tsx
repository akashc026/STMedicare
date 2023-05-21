import {
  Box,
  Button,
  Container,
  createStyles,
  CSSObject,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Footer } from '../components/Footer';
import DoctorImage from '../img/doctor.jpg';
import EngineeringImage from '../img/engineering.jpg';
import LabImage from '../img/engineering.jpg';
import WorkingEnvironmentImage from '../img/working-environment.jpg';
import { Header } from '../components/Header';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const heroImageStyles: CSSObject = {
  position: 'absolute',
  borderRadius: '50%',
  objectFit: 'cover',
};

const useStyles = createStyles((theme) => ({
  outer: {
    overflow: 'hidden',
    backgroundImage: `radial-gradient(640px at top left, ${theme.fn.lighten(theme.fn.primaryColor(), 0.92)}, white)`,
  },

  inner: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    marginTop: '6rem',
    marginBottom: '6rem',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    maxWidth: 480,
    marginRight: '4.5rem',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 56,
    lineHeight: 1.2,
    fontWeight: 600,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  highlight: {
    color: theme.fn.primaryColor(),
  },

  heroImage1: {
    ...heroImageStyles,
    top: 180,
    right: 150,
    width: 384,
    height: 384,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  heroImage2: {
    ...heroImageStyles,
    top: 400,
    left: 435,
    width: 288,
    height: 288,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
    },
  },

  heroImage3: {
    ...heroImageStyles,
    top: 0,
    right: -128,
    width: 448,
    height: 448,
  },

  heroImage4: {
    ...heroImageStyles,
    top: -48,
    left: -432,
    width: 864,
    height: 864,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
      width: 288,
      height: 288,
    },
  },

  featureSection: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },

  featureBox: {
    backgroundColor: theme.fn.lighten(theme.fn.primaryColor(), 0.9),
    borderRadius: theme.radius.xl,
    padding: '2.25rem',
    width: 512,
  },

  featureTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: theme.spacing.md,
  },

  featureDescription: {
    fontSize: 18,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },
}));

const features = [
  {
    title: 'Comprehsive Care Plans',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: '24/7 Messaging',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'Clinically rigorous',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
];

export function LandingPage(): JSX.Element {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  return (
    <div>
      <Header />
      <img className={classes.heroImage1} src={DoctorImage} alt="Working Environment" />
      <Container  >
        <div className={classes.inner} >
          <div className={classes.content} style={{marginLeft:'-50px'}}>
            <Title className={classes.title}>
              An extraordinary
              <br />
              <span className={classes.highlight}>doctor&apos;s office</span>
            </Title>
            <Text size="lg" color="dimmed" mt="md">
            Hello Welcome to ST Medicare.One stop shop for all your medical care.
            </Text>
            <Group mt={30}>
              <Button radius="xl" size="md" onClick={() => navigate('/signin')} className={classes.control}>
                Login
              </Button>
              <Button variant="default" radius="xl" size="md" onClick={() => navigate('/register')} className={classes.control}>
                Sign Up
              </Button>
            </Group>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}













// import { Document } from '@medplum/react';
// import { ReactComponent as Logo } from '../components/logo-white.svg';
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Flex } from '@mantine/core';

// export function LandingPage(): JSX.Element {
//   const navigate = useNavigate();
//   return (
//     <Document style={{ height: 500, width: 800 }}>
//       {/* <h1>ST Medicare</h1> */}
//       <div>
//         <Logo style={{ width: 200, height: 80, marginLeft: '-3%' }} />
//         <p>
//           <div>
//             <img
//               style={{ float: 'right', width: '50%', height: '35%', borderRadius: '45%' }}
//               src="https://www.statnews.com/wp-content/uploads/2017/02/AP78991782.jpg"
//             />
//           </div>
         

//           <div className="mantine-Container-root mantine-norobh">
//             <div className="mantine-2i4u6y">
//               <div className="mantine-651e11">
//                 <h1 className="mantine-Text-root mantine-Title-root mantine-15e4rx9">
//                   An extraordinary
//                   <br />
//                   <span className="mantine-thcc18">doctor's office</span>
//                 </h1>
//                 <div className="mantine-Text-root mantine-1euknw2">
//                   Hello Welcome to ST Medicare.One stop shop for all your medical care.
//                 </div>
//                 <div className="mantine-Group-root mantine-1fcmy3z" style={{marginTop:'15%',marginLeft:'15%'}}>
//                 <Button style={{ marginLeft: '-15%' }} onClick={() => navigate('/signin')}>Sign In</Button>
//                 <Button style={{ marginLeft: '20%' }} onClick={() => navigate('/register')}>
//               Register
//             </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* <Link to="/signin">Sign in</Link> */}
//         </p>
//       </div>
//     </Document>
//   );
// }
