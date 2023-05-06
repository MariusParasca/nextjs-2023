import axiosCustomized from '@/axiosCustomized';
import { getRequest } from '@/axiosCustomized';
import { CustomerBody } from '@/lib/validators/customers.validator';
import { Customer } from '@/types/types';
import { QueryFunction, QueryKey } from '@tanstack/react-query';

export const getCustomerQueryFn =
  (customerId: string, cookie?: string): QueryFunction<Customer, QueryKey> =>
  () =>
    getRequest(`/customers/${customerId}`, cookie);

export const getCustomersQueryFn =
  (cookie?: string): QueryFunction<Customer[], QueryKey> =>
  () =>
    getRequest(`/customers`, cookie);

export const createCustomerMutationFn = (body: CustomerBody) =>
  axiosCustomized.post('/customers', body).then((res) => res.data);
