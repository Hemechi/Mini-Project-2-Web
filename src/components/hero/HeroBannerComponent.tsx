import Link from "next/link"
import Image from "next/image"

export default function HeroBannerComponent() {
    return (
        <>
        <div className="hero min-h-20">
            <div className="hero-content text-center text-neutral-content">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-7 max-w-screen min-h-20 items-center py-7 px-2">
                    <div className="flex items-center flex-col gap-5">
                        <div className="bg-lighter-skin flex w-80 text-center justify-center items-center pt-4 rounded-xl">
                        <h1 className="mb-5 text-5xl font-bold">Hello there!</h1>
                        </div>
                    <p>Shop the latest trends with confidence and find your perfect fit today. <br /> Join us and experience the joy of shopping reimagined!</p>
                    <button className="btn bg-skin text-white p-3 rounded-lg">
                        <Link href={"/about-us"}>
                        Get Started
                        </Link>
                    </button>
                    </div>
                    <div>
                        <Image width={1000} height={1000} src="https://store.istad.co/media/brand_images/HeroBanner.png" alt=''/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}