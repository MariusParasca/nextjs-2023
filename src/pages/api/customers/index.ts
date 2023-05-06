// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mapCustomer } from '@/lib/mappers/customers.mapper';
import { getCustomers } from '@/lib/services/customers.service';
import { checkSeverRequestSession } from '@/lib/session';
import { Customer } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function customersHandler(req: NextApiRequest, res: NextApiResponse<Customer[]>) {
  const isLogged = await checkSeverRequestSession(req, res);

  if (!isLogged) return;

  const customerId = req.query.customerId as string;

  if (!customerId) {
    res.status(400);
  }

  const customers = await getCustomers();

  res.status(200).json(customers.map((customer) => mapCustomer(customer)));
}
