"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";


const BASE_API_URL="https://store.istad.co/api/"
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
    })
    .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const CreateProductForm = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTA2NzEwLCJpYXQiOjE3MTIzNDY3MTAsImp0aSI6ImI1MGRjMDdkZWE3NTRjMTNiYmVjNWMzOWFmMmExY2NiIiwidXNlcl9pZCI6MzR9.v7FTGPeL5cFWUMg0PfxKfpD6yFjHzfin8CveD-Sn-A0"
  );
  myHeaders.append(
    "Cookie",
    "csrftoken=GRqwv2b5Hy7cdCEWxJ3awPkre0LuihlQN6iRxWggvNJNIjPhFcKwanvS3vNqYtLF; sessionid=qs5l7g6fua0us31wew30hxgkew3puisp"
  );

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
      const postData = await fetch(`${BASE_API_URL}products/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
        }),
      });
      console.log("post data: ", postData);
      if (postData.ok) {
        // Product creation was successful, show alert
        alert("Product created successfully!");
      } else {
        // Product creation failed, show error message
        alert("Failed to create product. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      // Show error message if an error occurs during product creation
      alert("An error occurred while creating the product. Please try again later.");
    }
  };

  return (
    <div className="w-full pt-1">
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
            icon: "",
          },
          name: "",
          desc: "",
          image: undefined,
          price: 0,
          quantity: 0,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder="Fancy T-shirt"
                className={fieldStyle}
                name="name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category: </label>
              <Field
                placeholder="T-shirt"
                className={fieldStyle}
                name="category.name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder="This is a t-shirt"
                className={fieldStyle}
                name="desc"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder="100"
                className={fieldStyle}
                name="price"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder="1"
                className={fieldStyle}
                name="quantity"
                type="number"
              />
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
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-skin text-white rounded-md"
                disabled={isSubmitting}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;

// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const name = field.name;
  const onChange: any = (event: any) => {
    console.log("event:", event.currentTarget.files);
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input
        type="file"
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded-md"
      />
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
}