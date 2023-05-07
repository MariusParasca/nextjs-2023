import { mapCustomer } from '@/lib/mappers/customers.mapper';
import CustomerModel from '@/lib/models/Customer';
import { getCustomer } from '@/lib/services/customers.service';
import { checkSeverRequestSession } from '@/lib/session';
import { ApiError, Customer } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseApi = NextApiResponse<Customer | ApiError>;

async function getCustomerRequest(req: NextApiRequest, res: ResponseApi) {
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

async function deleteCustomerRequest(req: NextApiRequest, res: ResponseApi) {
  try {
    const customer = await CustomerModel.findByIdAndRemove(req.query.customerId);
    if (customer) {
      res.send(mapCustomer(customer));
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

export default async function customerHandler(req: NextApiRequest, res: ResponseApi) {
  const isLogged = await checkSeverRequestSession(req, res);
  if (!isLogged) return;

  if (req.method === 'GET') {
    return getCustomerRequest(req, res);
  } else if (req.method === 'DELETE') {
    return deleteCustomerRequest(req, res);
  }
}
