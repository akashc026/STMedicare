import { Navbar, Group, Code, ScrollArea, createStyles, rem, Menu, Button, Burger, CloseButton } from '@mantine/core';
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    IconChecklist,
    IconForms,
    IconReport,
    IconMedicalCross,
    IconVaccine,
} from '@tabler/icons-react';
import { Logo } from './Logo';
import React, { useState } from 'react';
import { LinksGroup } from './LinksGroup';
import { UserButton } from './UserButton';
import { useDisclosure } from '@mantine/hooks';
import { measurementsMeta } from '../pages/Measurement';

const mockdata = [

    {
        label: 'Care Plans',
        icon: IconChecklist,
        link: '/careplans'
    },
    {
        label: 'Forms',
        icon: IconForms,
        link: '/forms'
    },
    {
        label: 'Report',
        icon: IconReport,
        links: [
            // { label: 'Specimens', link: '/Specimen/new' },
            { label: 'Observations', link: '/Observation/new' },
            { label: 'Diagnostic Reports', link: '/DiagnosticReport/new' },
        ],
    },
    {
        label: 'Medication',
        icon: IconMedicalCross,
        link: '/MedicationRequest/new'
    },
    {
        label: 'Vitals',
        icon: IconVaccine,
        links: Object.values(measurementsMeta).map(({ title, id }) => ({
            label:title,link:`/${id}`
            }))
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
}));

export function HamburgerMenu() {

    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const label = opened ? 'Close navigation' : 'Open navigation';


    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <>
            <div style={{ position: 'sticky' }}>
                <Menu position="left" onChange={setOpened} opened={opened}>
                    <Menu.Target>
                        <Burger opened={opened} aria-label={label} />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Navbar height={750} width={{ sm: 300 }} p="sm" className={classes.navbar}>
                            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                                <Group position="right">
                                    <CloseButton title="Close popover" size="xl" iconSize={20} onClick={() => { setOpened(false) }} />
                                </Group>
                                <div className={classes.linksInner}>{links}</div>
                            </Navbar.Section>
                        </Navbar>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </>
    );
}