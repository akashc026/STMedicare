/// <reference types="vite-plugin-svgr/client" />

import { Burger, Container, createStyles, Group, Menu, Tabs, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { formatHumanName, ProfileResource } from '@medplum/core';
import { HumanName } from '@medplum/fhirtypes';
import { ResourceAvatar, useMedplumContext, useMedplumProfile } from '@medplum/react';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { HamburgerMenu } from './HamburgerMenu';




const useStyles = createStyles((theme) => ({

  logoButton: {
    float: 'left',
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background as string,
        0.95
      ),
    },
  },


  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.fn.variant({ variant: 'filled', color:"yellow.0"}).background,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: 'black',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color:'green.1' }).background!,
        0.1
      ),
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    ),
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: 'black',
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: 'blue.0' }).background!,
        0.1
      ),
    },

    '&[data-active]': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: 'green.1' }).background!,
        0.1
      )
    },
  },
}));

const tabs: Record<string, string> = {
  Worklist: '/',
  Patients: '/patients',
  Messages: '/messagepage',

  Appointment: '/appointment'

};

export function HeaderBar(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = useMedplumProfile() as ProfileResource;
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const auth = useMedplumContext();



  const items = Object.keys(tabs).map((tab) => (
    <Tabs.Tab style={{ width: '20%' }} value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (

    <div className={classes.header}>
      <Container fluid className={classes.mainSection}>

        <Group position="left">
          <HamburgerMenu />
          <UnstyledButton className={classes.logoButton} onClick={() => navigate('/')}>
            <Logo width={240} />
          </UnstyledButton>
          </Group>
          <Group position="right" style={{marginTop:'-40px'}}>
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            shadow="xl"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                <Group spacing={7}>
                  <ResourceAvatar value={profile} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1, color: 'black' }} mr={3}>
                    {formatHumanName(profile.name?.[0] as HumanName)}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>Change account</Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={() => { auth.medplum.signOut().then(() => navigate("/")) }} >Logout</Menu.Item>

              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          variant="outline"
          value={getActiveTab(location)}
          onTabChange={(value: string) => navigate(tabs[value])}
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

function getActiveTab(location: Location): string {
  const currentPath = location.pathname;
  let bestTab = 'Worklist';
  let bestCount = 0;

  for (const [tab, url] of Object.entries(tabs)) {
    if (currentPath.startsWith(url) && url.length > bestCount) {
      bestTab = tab;
      bestCount = url.length;
    }
  }

  return bestTab;
}
