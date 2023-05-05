import CustomerModel from '../models/Customer';
import dbConnect from '../mondodb';

export const getCustomers = async () => {
  await dbConnect();
  const customers = await CustomerModel.find({});

  return customers;
};

export const getCustomer = async (id: string) => {
  await dbConnect();
  const customer = await CustomerModel.findById(id);

  return customer;
};
