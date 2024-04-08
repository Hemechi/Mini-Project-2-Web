import React from 'react'
import AboutCardComponent from '@/components/cards/AboutCardComponent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description: "This is About us page shop",
  keywords: ['shop', 'ecommerce', 'sell',"card"]
};

export default function page() {
  return (
    <div>
        <AboutCardComponent/>
    </div>
  )
}
