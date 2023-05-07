import { mapCustomer } from '@/lib/mappers/customers.mapper';
import CustomerModel from '@/lib/models/Customer';
import { getCustomers } from '@/lib/services/customers.service';
import { checkSeverRequestSession } from '@/lib/session';
import { customerBodyValidation } from '@/lib/validators/customers.validator';
import { ApiError, Customer } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseApi = NextApiResponse<Customer[] | Customer | ApiError>;

async function postCustomerRequest(req: NextApiRequest, res: ResponseApi) {
  try {
    const { error } = customerBodyValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    const customer = await CustomerModel.findOne({ email: req.body.email });
    if (customer) return res.status(400).json({ error: true, message: 'Customer with given email already exist' });

    const customerCreated = await CustomerModel.create(req.body);
    res.send(mapCustomer(customerCreated));
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

async function getCustomersRequest(req: NextApiRequest, res: ResponseApi) {
  const customers = await getCustomers();

  return res.status(200).json(customers.map((customer) => mapCustomer(customer)));
}

export default async function customersHandler(req: NextApiRequest, res: ResponseApi) {
  const isLogged = await checkSeverRequestSession(req, res);
  if (!isLogged) return;

  if (req.method === 'POST') {
    return postCustomerRequest(req, res);
  } else if (req.method === 'GET') {
    return getCustomersRequest(req, res);
  } else {
    res.status(405).send('Only POST and GET requests allowed');
  }
}
