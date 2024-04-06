import UserTable from '@/components/tables/ProductTable';
import { Metadata } from 'next';
import React from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is Dashboard page shop",
  keywords: ['shop', 'ecommerce', 'sell',"card"]
};

const page = () => {
  return (
    <>
    <DashboardSidebar/>  
    <UserTable/>
    </>
  )
}

export default page
