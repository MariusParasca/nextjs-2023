import CustomerComponent from '@/components/pages/Customer/Customer';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getCustomerQueryFn } from '@/queryFns/customersQueryFns';
import { dehydrate } from '@tanstack/react-query';
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

  const queryClient = await prefetch(['customers', customerId], getCustomerQueryFn(customerId, req.headers.cookie));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CustomerPage;
