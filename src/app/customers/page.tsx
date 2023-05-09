import Hydrate from '@/components/Hydrate/Hydrate.client';
import Customers, { CustomersWrapper } from '@/components/pages/Customers/Customers.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getCustomers } from '@/lib/services/customers.service';
import { SWRConfig, preload, unstable_serialize } from 'swr';

export default async function CustomerPage() {
  // preload('customers', getCustomers)
  const customers = await getCustomers();
  // const dehydratedState = await prefetch(['customers'], getCustomers);

  return (
    // <Hydrate state={dehydratedState}>

    <CustomersWrapper customers={customers} />
    // </Hydrate>
  );
}
