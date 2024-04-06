import React from "react";
import {Card, CardHeader} from "@nextui-org/react";

export default function AboutCardComponent() {
  return (
    <div className="container mx-auto pt-10">
    <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-3">
            <div className="flex justify-center w-full">
                <h4 className="font-bold text-large">About Us</h4>
            </div>
            <small>we have been serving customers around the globe with our commitment to excellence and customer satisfaction.</small>
            <p className="text-tiny uppercase font-bold">Our Products/Services</p>
            <small>
            We offer a wide range of e-commerce designed to meet the diverse needs of our customers. Our products are carefully curated to ensure the highest quality and value. Whether you are looking for luxury shopping, we have something for everyone.
            </small>
            <p className="text-tiny uppercase font-bold">Why Choose Us?</p>
            <small>
                <ul>
                    <li>Quality: We take pride in the quality of our products/services and strive to exceed customer expectations.</li>
                    <li>Customer Service: Our dedicated team is committed to providing exceptional customer service and support.</li>
                    <li>Value: We offer competitive prices and great value for money.</li>
                    <li>Innovation: We are constantly innovating and improving to stay ahead of the curve.</li>
                    <li>Sustainability: We are committed to environmental sustainability and ethical business practices.</li>
                </ul>
            </small>
            <p className="text-tiny uppercase font-bold">Our Team</p>
            <small>Our team consists of passionate individuals who are experts in their respective fields. From product sourcing to customer support, each member of our team plays a crucial role in delivering the best possible experience for our customers.</small>
            <p className="text-tiny uppercase font-bold">Contact Us</p>
            <small>We value your feedback and are here to assist you with any questions or concerns.</small>
        </CardHeader>
    </Card>
</div>
  );
}
