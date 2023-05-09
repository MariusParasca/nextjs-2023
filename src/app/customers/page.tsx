import Hydrate from '@/components/Hydrate/Hydrate.client';
import Customers from '@/components/pages/Customers/Customers.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getCustomers } from '@/lib/services/customers.service';

export default async function CustomerPage() {
  const dehydratedState = await prefetch(['customers'], getCustomers);

  return (
    <Hydrate state={dehydratedState}>
      <Customers />
    </Hydrate>
  );
}
