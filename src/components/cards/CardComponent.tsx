import React from "react";
import {Card, CardFooter, CardBody, Image} from "@nextui-org/react";
import { ProductType } from "@/types/product";

export default function CardComponent(props: ProductType) {
  return (
    <>
    <div className="flex flex-wrap container justify-center">
        <Card isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0 w-72">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
            
              className="w-full h-60 object-cover "
              src={props.image}
            />

          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{props.name}</b>
            <p className="text-default-500">${props.price}</p>
          </CardFooter>
        </Card>
     
    </div>
    </>
  );
}
