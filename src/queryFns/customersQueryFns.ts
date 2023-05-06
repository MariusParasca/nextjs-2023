import { getRequest } from '@/axiosCustomized';
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
