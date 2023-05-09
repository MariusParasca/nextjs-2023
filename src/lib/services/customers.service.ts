import CustomerModel from '../models/Customer';
import dbConnect from '../mondodb';
import { mapCustomer } from '../mappers/customers.mapper';

export const getCustomers = async () => {
  await dbConnect();
  const customers = await CustomerModel.find({});

  return customers.map((customer) => mapCustomer(customer));
};

export const getCustomer = async (id: string) => {
  await dbConnect();
  const customer = await CustomerModel.findById(id);

  if (customer) {
    return mapCustomer(customer);
  }

  return null;
};
