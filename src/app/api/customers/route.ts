import { mapCustomer } from '@/lib/mappers/customers.mapper';
import CustomerModel from '@/lib/models/Customer';
import { getCustomers } from '@/lib/services/customers.service';
import { customerBodyValidation } from '@/lib/validators/customers.validator';
import { NextResponse } from 'next/server';

export async function GET() {
  const customers = await getCustomers();

  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error } = customerBodyValidation(body);
    if (error) return NextResponse.json({ error: true, message: error.details[0].message }, { status: 400 });

    const customer = await CustomerModel.findOne({ email: body.email });
    if (customer)
      return NextResponse.json({ error: true, message: 'Customer with given email already exist' }, { status: 400 });

    const customerCreated = await CustomerModel.create(body);
    return NextResponse.json(mapCustomer(customerCreated));
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
