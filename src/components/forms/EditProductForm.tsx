"use client"

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { ProductType } from "@/types/product";

const BASE_API_URL = "https://store.istad.co/api/";
const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => !value || value.size <= FILE_SIZE)
    .test("fileFormat", "Unsupported Format", (value: any) => !value || SUPPORTED_FORMATS.includes(value.type))
});

const fieldStyle = "border border-gray-300 rounded-md";

const EditProductForm = ({ Pro }: { Pro: ProductType }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(Pro.image);

  const handleSubmitToServer = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post(`${BASE_API_URL}file/product/`, formData);
      return response.data.image;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload image");
    }
  };

  const handleUpdateProduct = async (values: any) => {
    try {
      const requestBody: any = {};
      if (values.name !== Pro.name) requestBody.name = values.name;
      if (values.desc !== Pro.desc) requestBody.desc = values.desc;
      if (values.price !== Pro.price) requestBody.price = values.price;
      if (values.quantity !== Pro.quantity) requestBody.quantity = values.quantity;
      if (values.image) {
        const imageUrl = await handleSubmitToServer(values.image);
        requestBody.image = imageUrl;
      }
      if (Object.keys(requestBody).length > 0) {
        await axios.patch(`${BASE_API_URL}products/${Pro.id}`, requestBody);
        console.log("Product updated successfully");
      } else {
        console.log("No updates to submit.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pt-9">
      <Formik
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleUpdateProduct(values);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          name: Pro.name,
          desc: Pro.desc,
          image: undefined,
          price: Pro.price,
          quantity: Pro.quantity,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder={Pro.name}
                className={fieldStyle}
                name="name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder={Pro.desc}
                className={fieldStyle}
                name="desc"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder={Pro.price}
                className={fieldStyle}
                name="price"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder={Pro.quantity}
                className={fieldStyle}
                name="quantity"
                type="number"
              />

              {/* Image  */}
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
                {previewImage && (
                  <Image
                    className="rounded-md"
                    src={previewImage}
                    alt="preview Image"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-skin text-white rounded-md"
                disabled={isSubmitting}
              >
               Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductForm;

// custom Input
function CustomInput({ field, form, ...props }: any) {
  const onChange = (event: any) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    form.setFieldTouched(field.name, true);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input
        type="file"
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
}
