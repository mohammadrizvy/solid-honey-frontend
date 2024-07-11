import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchSellHistory = async () => {
  const response = await fetch(
    "/saler/product/sale/report"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SellHistoryPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sellHistory"],
    queryFn: fetchSellHistory,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-center py-5 text-white text-2xl font-semibold">
          পন্য বিক্রয় তালিকা
        </h1>
        <div className="relative flex items-center md:inline-flex">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-md py-1 px-2"
          />
          <svg
            className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <div className="wrapper bg-white rounded shadow w-full">
          <table className="w-full">
            <thead>
              <tr>
              <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">Sl</th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  নাম
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  পণ্যের নাম
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  নম্বর
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  ঠিকানা
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  পরিমান
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  দর
                </th>
                <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                  মোট
                </th>
              </tr>
            </thead>
            <tbody>
              {data.product_sales.map((item, index) => (
                <tr key={index}>
                     <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">{index + 1}</td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.product_buyer}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.product_sub_category}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.phone_number}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.address}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.unit_price}
                  </td>
                  <td className="p-2 text-center border-b-2  border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellHistoryPage;
