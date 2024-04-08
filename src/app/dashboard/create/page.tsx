import React from 'react'
import CreateProductForm from '@/components/forms/CreateProductForm'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create",
  description: "This is Create page shop",
  keywords: ['shop', 'ecommerce', 'sell',"card"]
};

export default function page() {
  return (
    <div>
      <CreateProductForm/>
    </div>
  )
}
