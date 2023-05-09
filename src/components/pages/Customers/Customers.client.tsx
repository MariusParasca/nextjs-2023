'use client';

import React from 'react';
import { Customer } from '../../../types/types';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCustomerMutationFn, getCustomersQueryFn } from '@/queryFns/customersQueryFns';
import { useQueryClientInstance } from '@/contexts/QueryClientContext.client';

const CustomerElement = ({ customer }: { customer: Customer }) => {
  const { queryClient } = useQueryClientInstance();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCustomerMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  return (
    <div>
      <p>
        Email: <strong>{customer.email}</strong>
      </p>
      <p>Name: {customer.name}</p>
      <p>Balance: {customer.balance}</p>
      <div>{customer.customProp}</div>
      <div style={{ marginTop: '10px' }}>
        <Link href={`/customers/${customer.id}`}>View</Link>
        <button
          onClick={() => {
            mutate(customer.id);
          }}
          disabled={isLoading}
          type='button'
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
};

interface Props {}

const Customers = ({}: Props) => {
  const { data: customers, isLoading } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: getCustomersQueryFn,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!customers || customers?.length === 0) return <div>No data</div>;

  return (
    <div>
      <h3>Customers</h3>
      {customers.map((customer) => (
        <CustomerElement customer={customer} key={customer.id} />
      ))}

      <Link href={`/customers/create`}>Create Customer</Link>
    </div>
  );
};

export default Customers;
