'use client';
import { Modal } from '@/components/Modal/Modal';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <h1>Hello, Next.js!</h1>
        <button onClick={() => setOpen(true)}>Open Modal</button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p>HEEEY</p>
      </Modal>
    </>
  );
}
