import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { ProductType } from "@/types/product";

const BASE_API_URL = "https://store.istad.co/api/";
const FILE_SIZE = 1024 * 1024 * 5;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    }),
});

const fieldStyle = "border border-gray-300 rounded-md";

const EditProductForm = ({ pro }: { pro: ProductType }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  const myHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTA2NzEwLCJpYXQiOjE3MTIzNDY3MTAsImp0aSI6ImI1MGRjMDdkZWE3NTRjMTNiYmVjNWMzOWFmMmExY2NiIiwidXNlcl9pZCI6MzR9.v7FTGPeL5cFWUMg0PfxKfpD6yFjHzfin8CveD-Sn-A0",
      Cookie:
        "csrftoken=oj4kVPKicYgWw6ppqnUlkxbsIjARq6gYbmJKhxl3GEoArkenGSgwfUb4T9UGl8VJ; sessionid=e2k7ty0e7g6wbreo2q0wq5d6tj92t2cc",
    },
  };

  const handleSubmitToServer = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}file/product/`,
        values.image
      );
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData);
      console.log("data: ", values);
      const patchedData: { [key: string]: any } = {};
      for (const key in values) {
        if (values[key] !== undefined) {
          patchedData[key] = values[key];
        }
      }
      if (imageUrl) {
        patchedData["image"] = imageUrl;
      }
      console.log("patchedData: ", patchedData);
      const postData = await axios.patch(
        `${BASE_API_URL}products/${pro.id}`,
        patchedData,
        myHeaders
      );
      console.log("post data: ", postData);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange: any = (event: any, setFieldValue: any) => {
    console.log("event:", event.currentTarget.files);
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full pt-9">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          console.log(values);
          const formData = new FormData();
          formData.append("image", values.image);
          handleCreateProduct(values, { image: formData });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          category: {
            name: "",
            icon:"",
          },
          name: pro.name || "",
          desc: pro.desc || "",
          image: undefined,
          price: pro.price || 0,
          quantity: pro.quantity || 0,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder={pro.name}
                className={fieldStyle}
                name="name"
                type="text"
              />
            </div>
            {/* category */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category: </label>
              <Field
                placeholder={pro.category}
                className={fieldStyle}
                name="category.name"
                type="text"
              />
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder={pro.desc}
                className={fieldStyle}
                name="desc"
                type="text"
              />
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder={pro.price}
                className={fieldStyle}
                name="price"
                type="number"
              />
            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder={pro.quantity}
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              <div>
                <input
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  onChange={(e) => onChange(e, setFieldValue)}
                />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
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
  );
};

export default EditProductForm;
