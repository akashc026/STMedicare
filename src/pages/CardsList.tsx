import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    rem,
    Avatar,
    Badge,
    Table,
    ActionIcon,
  } from '@mantine/core';
import { Patient } from '@medplum/fhirtypes';
import { ResourceBadge } from '@medplum/react';
  import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
    IconPencil,
    IconInfoCircle,
    IconEye,
  } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
  
  const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
    { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
    { title: 'Transfers', icon: IconRepeat, color: 'blue' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
    { title: 'Reports', icon: IconReport, color: 'pink' },
    { title: 'Payments', icon: IconCoin, color: 'red' },
    { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
  ];
  
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,
    },
  
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: theme.radius.md,
      height: rem(90),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
  
      '&:hover': {
        boxShadow: theme.shadows.md,
        transform: 'scale(1.05)',
      },
    },
  }));
  
  export function CardsList(props:{patient:Patient[]}) {
    const { classes, theme } = useStyles();
    const navigate = useNavigate();
    const data = props.patient;
    console.log(typeof(data));
    console.log(data);
    const rows = (data.map((item) => (
        <tr key={item.id}>
          <td>
            <Group spacing="sm">
              <Text fz="sm" fw={500}>
              <ResourceBadge value={item} />
              </Text>
            </Group>
          </td>
          <td>
            <Text fz="sm" c="dimmed">
            {item.birthDate}
            </Text>
          </td>
          <td>
            <Text fz="sm" c="dimmed">
            {item.telecom?.find((cp) => cp.system === 'email')?.value}
            </Text>
          </td>
          <td>
            <Text fz="sm" c="dimmed">
            {item.telecom?.find((cp) => cp.system === 'phone')?.value}
            </Text>
          </td>
          <td>
            <Group spacing={3} position="right">
            <ActionIcon onClick={() => navigate(`/Patient/edit/${item.id}`)}>
            <IconPencil  size="2rem" stroke={3} />
          </ActionIcon>
          <ActionIcon onClick={() => navigate(`/Patient/${item.id}`)} color="green">
            <IconEye size="2rem" stroke={1.5} />
          </ActionIcon>
            </Group>
          </td>
        </tr>
      )));
  
    return (
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
      <Table sx={{ minWidth: 700 }} verticalSpacing="xl">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
        </Group>
      </Card>
    );
  }