"use client"
import React from 'react';
import CardComponent from '@/components/cards/CardComponent';
import { ProductType } from '@/types/product';
import LoadingComponent from './loading';
import { Suspense } from 'react';
import Link from 'next/link';
import HeroBannerComponent from '@/components/hero/HeroBannerComponent';
import SponsorComponent from '@/components/sponsor/SponsorComponent';
import AboutCardComponent from '@/components/cards/AboutCardComponent';

async function fetchProduct() {
  const product = await fetch("https://store.istad.co/api/products/", {
    cache: "no-store"
  });
  const res = await product.json();
  return res.results;
}

export default function Home() {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await fetchProduct();
        setProduct(productsData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <HeroBannerComponent/>
    <SponsorComponent/>
    <section className='my-5 container mx-auto'>
      <div className='flex justify-center pb-5 w-full' id="items">
      <h1 className='mt-7 text-3xl font-bold'>Our Products</h1>
      </div>
    <div className="w-[90%] mt-[20px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-8 container ">
      <Suspense fallback={<LoadingComponent/>} >
        {!loading && (
          product?.map((pro: ProductType) => (
            <Link href={`/product/${pro.id}`} key={pro.id}>
            <CardComponent
              name={pro.name}
              key={pro.id}
              price={pro.price}
              image={pro.image}
              quantity={pro.quantity}
              category={pro.category}
            />
            </Link>
          ))
        )}
      </Suspense>
    </div>
    </section>
    <section className='my-5 container mx-auto'>
      <div className='flex justify-center pb-5 w-full' id="items">
      <AboutCardComponent/>
      </div>
    </section>
    </>
  );
}
