import mongoose, { Model } from 'mongoose';

export interface ICustomer extends mongoose.Document {
  name: string;
  email: string;
  balance: number;
}

const CustomerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  balance: {
    type: Number,
    default: 0,
  },
});

const CustomerModel =
  (mongoose.models.Customer as Model<ICustomer>) || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default CustomerModel;
