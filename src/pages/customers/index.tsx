import Customers from '@/components/pages/Customers/Customers';
import { mapCustomer } from '@/lib/mappers/customers.mapper';
import { getCustomers } from '@/lib/services/customers.service';
import { checkServerSideSession } from '@/lib/session';
import { Customer } from '@/types/types';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  customers: Customer[];
}

function CustomersPage({ customers }: Props) {
  return <Customers customers={customers} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const { sessionExpired, options } = await checkServerSideSession(req, '/customers');
  if (sessionExpired) return options;

  const customers = await getCustomers();

  // Pass data to the page via props
  return {
    props: {
      customers: customers.map((customer) => mapCustomer(customer)),
    },
  };
};

export default CustomersPage;
