import CustomerComponent from '@/components/pages/Customer/Customer';
import { prefetch } from '@/lib/reactQueryClientServer';
import { checkServerSideSession } from '@/lib/session';
import { getCustomerQueryFn } from '@/queryFns/customersQueryFns';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

// TODO: middlerware api validation

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

  const queryClient = await prefetch(['customers', customerId], getCustomerQueryFn(customerId, req.headers.cookie));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CustomerPage;
