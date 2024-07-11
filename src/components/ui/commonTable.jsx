import React, { useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const CommonTable = ({ data, action, index, Component, header_title }) => {
  const searchItemRef = useRef("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    const searchTerm = searchItemRef.current.value.toLowerCase().trim();

    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.phone_number.toLowerCase().includes(searchTerm) ||
        item.address.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filtered);
    }

    // Reset to first page after search
    setCurrentPage(1);
  };

  const paginateNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <div className="w-full">
      <div className="relative my-4">
        <input
          className="w-full outline-1 border outline-[#B3B3B380] border-[#B3B3B380] border-opacity-50 rounded focus:border-primary focus:outline-primary h-fit pl-7 pr-4 py-2 text-base font-bold text-black"
          ref={searchItemRef}
          onChange={handleSearch}
          placeholder={"অনুসন্ধান করুন"}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <FiSearch
          className="absolute top-3.5 right-2.5 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <div className="bg-white w-full">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start mb-4 container pt-4">
          <h1 className="text-xl font-bold mb-4 text-honey">{header_title}</h1>
          {/* <Component /> */}
        </div>
        <div className="md:overflow-x-auto overflow-x-scroll">
          <table className="w-full table-auto border-collapse border border-slate-300 min-w-max">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-honey h-16">
              <tr>
                {index && <th className="px-4 py-2 border-r-2 border-b-2 whitespace-nowrap">SL</th>}
                <th className="font-bold px-4 border-r-2 border-b-2 py-2">নাম</th>
                <th className="font-bold border-r-2 border-b-2 px-4 py-2">ফোন নাম্বার</th>
                <th className="font-bold border-r-2 border-b-2 px-4 py-2">ঠিকানা</th>
                {action && <th className="font-bold border-r-2 border-b-2 px-4 py-2">বিবরণ</th>}
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-100">
              {getCurrentPageData().map((d, i) => (
                <tr key={i} className="h-16 hover:bg-honey hover:text-white">
                  {index && (
                    <td className="px-4 border-r-2 border-b-2 py-2 whitespace-nowrap">
                      {i + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                  )}
                  <td className="px-4 py-2 border-r-2 border-b-2 whitespace-nowrap">{d?.name}</td>
                  <td className="px-4 py-2 border-r-2 border-b-2 whitespace-nowrap">{d?.phone_number}</td>
                  <td className="px-4 py-2 border-r-2 border-b-2 whitespace-nowrap">{d?.address}</td>
                  {action && (
                    <td className="px-4 border-r-2 border-b-2 py-2 text-blue-500 underline whitespace-nowrap">
                      <Link
                        to={`/account/suppliers/${d?.id}`}
                        className="cursor-pointer"
                      >
                        বিস্তারিত
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 sm:flex sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            {currentPage !== 1 && (
              <a
                onClick={paginatePrev}
                className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>Previous</span>
              </a>
            )}

            {totalPages !== currentPage && (
              <a
                onClick={paginateNext}
                className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <span>Next</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:-scale-x-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
