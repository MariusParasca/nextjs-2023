import { mapCustomer } from '@/lib/mappers/customers.mapper';
import { getCustomer } from '@/lib/services/customers.service';
import { checkSeverRequestSession } from '@/lib/session';
import { Customer } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function customerHandler(req: NextApiRequest, res: NextApiResponse<Customer>) {
  const isLogged = await checkSeverRequestSession(req, res);
  if (!isLogged) return;

  const customerId = req.query.customerId as string;

  if (!customerId) {
    res.status(400);
  }

  const customer = await getCustomer(customerId);

  if (!customer) {
    return res.status(404);
  }

  res.status(200).json(mapCustomer(customer));
}
