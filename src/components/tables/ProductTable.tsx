"use client"

import LoadingComponent from "@/app/loading";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ProductType } from "@/types/product";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";


const BASE_URL = "https://store.istad.co/api/products/"

export default function ProductTable() {
  const [getData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productDetail, setProductDetail] = useState({} as ProductType)
  const [borderColor, setBorderColor] = useState("#ff8b00");

  const handleDetail = (value: ProductType) => {
    onOpen();
    setProductDetail(value)
  }
  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
    setBorderColor('#00ff00');
  }
  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`${BASE_URL}${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NTA2NzEwLCJpYXQiOjE3MTIzNDY3MTAsImp0aSI6ImI1MGRjMDdkZWE3NTRjMTNiYmVjNWMzOWFmMmExY2NiIiwidXNlcl9pZCI6MzR9.v7FTGPeL5cFWUMg0PfxKfpD6yFjHzfin8CveD-Sn-A0', // 
          'Cookie': 'csrftoken=your_csrf_token_here; sessionid=your_session_id_here', // Replace with your actual CSRF token and session ID
        },
      });
      const data = await response.json();
      console.log('Deleted product:', data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns: TableColumn<ProductType>[] = [
    {
      name: "ID",
      selector: (row): any => (
        <div className=" font-bold text-blue-600">{row.id}</div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Image",
      selector: (row): any => (
        <img src={row.image} width={80} height={80} alt="product" />
      ),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div className="rounded-[50%] bg-gray-50 w-max p-2">
            <Dropdown >
              <DropdownTrigger>
                <button>
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="detail"
                  onClick={() => handleDetail(row)}
                >
                  <Link href={`/product/${row.id}`}>View Detail</Link>
                </DropdownItem>
                <DropdownItem key="edit">
                  <Link href={`/dashboard/edit?id=${row.id}`}>Edit</Link>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => row.id && handleDelete(row.id)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetch(BASE_URL).then(res => res.json())
      .then(data => setData(data.results))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!search) {
      setFilter(getData);
      return;
    }
    const result = getData.filter((item: ProductType) => {
      return item.name?.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [getData, search]);

  return (
    <>
      <div className="flex flex-col w-full text-center gap-5 pt-5">
        <h1 className="font-bold text-xl">Product Data</h1>
        <DataTable
          columns={columns}
          fixedHeader={true}
          fixedHeaderScrollHeight="500px"
          pagination
          subHeader
          subHeaderComponent={
            <input
              className="bg-white border-[1px] px-9 py-2 w-max rounded-md"
              style={{ borderColor: borderColor }}
              placeholder="Search"
              value={search}
              onChange={handleInputChange}
            ></input>
          }
          progressComponent={<LoadingComponent />}
          progressPending={isLoading}
          data={filter}
        />
      </div>
    </>
  )
}