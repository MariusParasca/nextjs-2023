import { ICustomer } from '../models/Customer';
import { MongooseDocument } from '@/types/utils';

export const mapCustomer = (customer: MongooseDocument<ICustomer>) => ({
  id: customer._id.toString(),
  name: customer.name,
  email: customer.email,
  balance: customer.balance,
});
