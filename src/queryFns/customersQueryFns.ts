import axiosCustomized from '@/axiosCustomized';
import { getRequest } from '@/axiosCustomized';
import { CustomerBody } from '@/lib/validators/customers.validator';
import { Customer } from '@/types/types';
import { QueryFunction, QueryKey } from '@tanstack/react-query';

export const getCustomerQueryFn =
  (customerId: string): QueryFunction<Customer, QueryKey> =>
  () =>
    getRequest(`/customers/${customerId}`);

export const getCustomersQueryFn = () => getRequest(`/customers`);

export const createCustomerMutationFn = (body: CustomerBody) =>
  axiosCustomized.post('/customers', body).then((res) => res.data);

export const deleteCustomerMutationFn = (customerId: string) =>
  axiosCustomized.delete(`/customers/${customerId}`).then((res) => res.data);
