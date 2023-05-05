import CustomerComponent from '@/components/pages/Customer/Customer';
import { mapCustomer } from '@/lib/mappers/customers.mapper';
import { getCustomer } from '@/lib/services/customers.service';
import { checkServerSideSession } from '@/lib/session';
import { getCustomerQueryFn } from '@/queryFns/customersQueryFns';
import { Customer } from '@/types/types';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

interface Params extends ParsedUrlQuery {
  customerId: string;
}

interface Props {}

const CustomerPage = ({}: Props) => {
  return <CustomerComponent />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { req } = context;
  const { customerId } = context.params as Params;

  const { sessionExpired, options } = await checkServerSideSession(req, `/customers/${customerId}`);
  if (sessionExpired) return options;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['customers', customerId], getCustomerQueryFn(customerId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CustomerPage;
