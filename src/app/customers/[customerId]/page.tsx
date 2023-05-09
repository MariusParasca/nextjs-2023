import Hydrate from '@/components/Hydrate/Hydrate.client';
import CustomerComponent from '@/components/pages/Customer/Customer.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getCustomer } from '@/lib/services/customers.service';
import { RequestParams } from '@/types/utils';

export default async function CustomerPage({ params }: RequestParams<{ customerId: string }>) {
  const dehydratedState = await prefetch(['customers', params.customerId], () => getCustomer(params.customerId));

  return (
    <Hydrate state={dehydratedState}>
      <CustomerComponent />
    </Hydrate>
  );
}
