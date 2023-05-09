import CustomerModel from '@/lib/models/Customer';
import { getCustomer } from '@/lib/services/customers.service';
import { RequestParams } from '@/types/utils';
import { NextRequest, NextResponse } from 'next/server';

type CustomerParams = {
  customerId: string;
};

export async function GET(_: NextRequest, { params }: RequestParams<CustomerParams>) {
  const customerId = params.customerId;

  if (!customerId) {
    return NextResponse.json('CustomerId is required', { status: 400 });
  }

  const customer = await getCustomer(customerId);

  if (!customer) {
    return NextResponse.json('Customer not found', { status: 404 });
  }

  return NextResponse.json(customer);
}

export async function DELETE(_: Request, { params }: RequestParams<CustomerParams>) {
  const customerId = params.customerId;

  if (!customerId) {
    return NextResponse.json('CustomerId is required', { status: 400 });
  }

  try {
    const customer = await CustomerModel.findByIdAndRemove(customerId);
    if (customer) {
      return NextResponse.json(customer);
    } else {
      return NextResponse.json('Customer not found', { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
