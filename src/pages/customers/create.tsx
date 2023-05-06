import SecurePageWrapper from '@/components/SecurePageWrapper/SecurePageWrapper';
import { CreateCustomer } from '@/components/pages/CreateCustomer/CreateCustomer';
import React from 'react';

function CreateCustomerPage() {
  return (
    <SecurePageWrapper>
      <CreateCustomer />
    </SecurePageWrapper>
  );
}

export default CreateCustomerPage;
