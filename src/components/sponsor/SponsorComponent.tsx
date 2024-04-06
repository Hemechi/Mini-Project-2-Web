import Image from "next/image"

export default function SponsorComponent(){
    return(
        <section className="flex bg-orange-200 p-3 flex-wrap items-center justify-center gap-10">
        <div className="col-lg-2 col-md-4 col-6 flex  flex-wrap items-center justify-center gap-10">
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-1.png" className="img-fluid" alt=""/>
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-2.png" className="img-fluid" alt=""/>
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-3.png" className="img-fluid" alt=""/>
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-4.png" className="img-fluid" alt=""/>
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-5.png" className="img-fluid" alt=""/>
            <Image width={68} height={30} src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-6.png" className="img-fluid" alt=""/>
        </div>
        </section>
    )
}