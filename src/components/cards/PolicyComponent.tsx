import React from "react";
import { Card, CardHeader } from "@nextui-org/react";

export default function PolicyComponent() {
    return (
        <div className="container mx-auto pt-10">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-3">
                    <div className="flex justify-center w-full">
                        <h4 className="font-bold text-large">Privacy Policy</h4>
                    </div>
                    <small>This Privacy Policy describes how we collects, uses, and discloses your personal information when you use our website Heechi.comand the services offered on the Site.</small>
                    <p className="text-tiny uppercase font-bold">Information We Collect</p>
                    <small>
                        We may collect personal information that you provide to us when you:
                        <ul>
                            <li>Register for an account on our Site.</li>
                            <li>Place an order for products or services.</li>
                            <li>Subscribe to our newsletter or promotional emails.</li>
                            <li>Contact us through our customer support channels.</li>
                        </ul>
                    </small>
                    <p className="text-tiny uppercase font-bold">How We Use Your Information</p>
                    <small>
                    We may use the personal information we collect for the following purposes:
                        <ul>
                            <li>To process and fulfill your orders</li>
                            <li>To communicate with you about your orders, account, or inquiries</li>
                            <li>To send you marketing communications, newsletters, and promotional offers</li>
                            <li>To improve our products and services</li>
                            <li>To personalize your experience on our Site</li>
                            <li>To detect and prevent fraud or other illegal activities</li>
                        </ul>
                    </small>
                    <p className="text-tiny uppercase font-bold">Data Security</p>
                    <small>We take reasonable measures to protect the security of your personal information to prevent unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</small>
                    <p className="text-tiny uppercase font-bold">Changes to This Privacy Policy</p>
                    <small>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on this page.</small>
                </CardHeader>
            </Card>
        </div>
    );
}
