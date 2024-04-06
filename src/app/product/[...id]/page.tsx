import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ParamProps = {
  params :{
    id:  number
  }
}

export async function generateMetadata({params} : ParamProps){
  const id = params.id
  const product = await getDetail(id)
  return {
    title: product?.title,
    describe: product.description,
    openGraph: {
      images: product.thumbnail,
    },
  }
}

async function getDetail(id:number){
  const productDetail= await fetch(`https://store.istad.co/api/products/${id}`)
  return productDetail.json()
}
async function page  ({params}: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id)
  return (
    <main >
      <section className='grid md:grid-cols-2 grid-cols-1 gap-5 container mx-auto md:pt-10 '>
       <div className='w-full h-auto flex items-center justify-center'>
        <Image width={1000} height={1000} src={productDetail.image} alt={productDetail.name}/>
       </div>
       <div className='px-7'>
        <div className='bg-lighter-skin w-auto h-auto text-center rounded-lg px-3'>
        <h1 className='text-[24px] text-black font-bold mb-3'>{productDetail.name}</h1>
        </div>
        <p>{productDetail.desc}</p>
        <div>
          <p className=' my-4 text-xl md:text-xl lg:text-2xl font-semibold text-skin dark:text-white'>${productDetail.price}</p>
        </div>
        <Link className='hover:text-lighter-skin' href="/">&lt;- <span className='underline'>Go Back</span></Link>
       </div>
    </section>
    </main>
  )
}

export default page
