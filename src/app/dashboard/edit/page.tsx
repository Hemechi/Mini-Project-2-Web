import React from 'react'
import EditProductForm from '@/components/forms/EditProductForm'

export default function page() {
  return (
    <div>
      <EditProductForm Pro={{
        id: undefined,
        name: undefined,
        image: undefined,
        desc: undefined,
        category: undefined,
        quantity: undefined,
        price: undefined
      }}/>
    </div>
  )
}
