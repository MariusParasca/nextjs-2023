import { useQueryClientInstance } from '@/contexts/QueryClientContext';
import { deleteCustomerMutationFn, getCustomerQueryFn } from '@/queryFns/customersQueryFns';
import { Customer } from '@/types/types';
import { useMutation, useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const CustomerComponent = ({}: Props) => {
  const router = useRouter();
  const customerId = router.query.customerId as string;

  const { data, isLoading } = useQuery<Customer>({
    queryKey: ['customers', customerId],
    queryFn: getCustomerQueryFn(customerId),
  });

  const { queryClient } = useQueryClientInstance();
  const { push } = useRouter();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCustomerMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      push('/customers');
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Not found</div>;

  return (
    <div>
      <p>
        Email: <strong>{data.email}</strong>
      </p>
      <p>Name: {data.name}</p>
      <p>Balance: {data.balance}</p>
      <div>{data.customProp}</div>
      {/* <Link to={`/protected/customers/edit/${data.id}`}>Edit</Link> */}
      <button
        onClick={() => {
          mutate(data.id);
        }}
        disabled={isDeleting}
        type='button'
      >
        Delete
      </button>
      <div>
        <Link href={`/customers`}>Back to customers</Link>
      </div>
    </div>
  );
};

export default CustomerComponent;
