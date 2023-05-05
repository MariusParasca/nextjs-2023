import axiosCustomized from '@/axiosCustomized';
import { Customer } from '@/types/types';
import { QueryFunction, QueryKey } from '@tanstack/react-query';

export const getCustomerQueryFn =
  (customerId: string): QueryFunction<Customer, QueryKey> =>
  () =>
    axiosCustomized.get(`/customers/${customerId}`).then((res) => res.data);
