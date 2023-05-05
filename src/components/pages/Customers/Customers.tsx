import React from 'react';
import { Customer } from '../../../types/types';
import Link from 'next/link';

const CustomerElement = ({ customer }: { customer: Customer }) => {
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
          // onClick={() => {
          //   deleteCustomer(customer.id);
          // }}
          // disabled={isLoading}
          type='button'
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
};

interface Props {
  customers: Customer[];
}

const Customers = ({ customers }: Props) => {
  if (customers?.length === 0) return <div>No data</div>;

  return (
    <div>
      <h3>Customers</h3>
      {customers.map((customer) => (
        <CustomerElement customer={customer} key={customer.id} />
      ))}

      {/* <NavLink to={`/protected/customers/create`}>Create Customer</NavLink> */}
    </div>
  );
};

export default Customers;