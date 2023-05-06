import { useQueryClientInstance } from '@/contexts/QueryClientContext';
import { createCustomerMutationFn } from '@/queryFns/customersQueryFns';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const CreateCustomer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const { queryClient } = useQueryClientInstance();
  const { push } = useRouter();

  const { isLoading, mutate, isError, error } = useMutation({
    mutationFn: createCustomerMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      push('/customers');
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            email,
            name,
            balance,
          });
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block' }}>Email: </label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block' }}>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: 'block' }}>Balance: </label>
          <input type='number' value={balance} onChange={(e) => setBalance(e.target.valueAsNumber)} />
        </div>
        {isError && <p style={{ color: 'red' }}>{(error as any)?.message}</p>}
        <button disabled={isLoading} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};
