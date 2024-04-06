import Link from "next/link"
export default function HeroBannerComponent() {
    return (
        <>
        <div className="hero min-h-20">
            <div className="hero-content text-center text-neutral-content">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-7 max-w-full min-h-20 items-center p-7">
                    <div className="flex items-center flex-col gap-5">
                        <div className="bg-lighter-skin  flex w-80 text-center justify-center items-center pt-4 rounded-xl">
                        <h1 className="mb-5 text-5xl font-bold">Hello there!</h1>
                        </div>
                    <p className="mb-5">Shop the latest trends with confidence and find your perfect fit today. <br /> Join us and experience the joy of shopping reimagined!</p>
                    <button className="btn bg-skin text-white p-3 rounded-lg">
                        <Link href={"/about-us"}>
                        Get Started
                        </Link>
                    </button>
                    </div>
                    <div>
                        <img src="https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298cf3bb93c3f_6309fc4305a883fc64b964cc_DrawKit0041_E-commerce_and_Online_Shopping_Banner.png"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}