import React from 'react'
import PolicyComponent from '@/components/cards/PolicyComponent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Policy",
  description: "This is Policy page shop",
  keywords: ['shop', 'ecommerce', 'sell',"card"]
};

export default function page() {
  return (
    <div>
        <PolicyComponent/>
    </div>
  )
}
