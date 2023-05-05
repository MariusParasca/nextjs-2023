import { getCustomerQueryFn } from '@/queryFns/customersQueryFns';
import { Customer } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

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
        // onClick={() => {
        //   deleteCustomer(data.id)
        //     .unwrap()
        //     .then((result) => navigate(`/protected/customers`));
        // }}
        // disabled={isDeleting}
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
