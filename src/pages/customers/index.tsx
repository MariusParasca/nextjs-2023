import Customers from '@/components/pages/Customers/Customers';
import { prefetch } from '@/lib/reactQueryClientServer';
import { checkServerSideSession } from '@/lib/session';
import { getCustomersQueryFn } from '@/queryFns/customersQueryFns';
import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {}

function CustomersPage({}: Props) {
  return <Customers />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const { sessionExpired, options } = await checkServerSideSession(req, '/customers');
  if (sessionExpired) return options;

  // const customers = await getCustomers();

  const queryClient = await prefetch(['customers'], getCustomersQueryFn(req.headers.cookie));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // customers: customers.map((customer) => mapCustomer(customer)),
    },
  };
};

export default CustomersPage;
