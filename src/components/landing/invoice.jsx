import React from "react";

const Invoice = () => {
return (
<div className="container mx-auto my-[20px]">
<div className="bg-white w-full">
      <div className="w-full h-auto">
        <img
          src="/header.png"
          alt="invoice"
          className="w-full h-auto object-fill"
        />
      </div>
      <div className="mt-[50px] container mx-auto md:max-w-5xl">
        <div className="w-full pb-6">
          <h1 className="text-[24px] font-bold text-center">চালান</h1>
          <div className="mt-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-3 sm:gap-y-0 gap-y-6 lg:justify-items-center sm:justify-items-start justify-items-center">
            <div className="col-span-1">
              <div className="text-[18px]"> চালান নম্বর : 10068</div>
              <div className="text-[18px] mt-2">তারিখ : ০৪/০৫/২৪</div>
            </div>
            <div className="col-span-1">
              <div className="text-[18px] ">নাম : মাজেদুল ইসলাম</div>
              <div className="text-[18px] mt-2">ঠিকানা : মহিপাল , ফেনী</div>
              <div className="text-[18px] mt-2">Mobile : 01814874161</div>
            </div>
            <div className="col-span-1">
              <img
                src="/barcode.png"
                alt="barcode"
                className="w-[100px] h-[50px]"
              />
            </div>
          </div>
        </div>
        
        {/* Table with Scrollbar */}
        <div className="sm:overflow-x-auto overflow-x-scroll">
          <table className="w-full table-auto border-collapse border border-slate-300 min-w-max">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 h-10">
              <tr>
                <th className="border border-slate-300 font-bold px-4 py-2">ক্রম</th>
                <th className="border border-slate-300 font-bold px-4 py-2">পণ্যের নাম</th>
                <th className="border border-slate-300 font-bold px-4 py-2">পণ্যের ধরণ</th>
                <th className="border border-slate-300 font-bold px-4 py-2">পরিমান</th>
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-100">
              <tr>
                <td className="border border-slate-300 px-4 py-2 whitespace-nowrap">1</td>
                <td className="border border-slate-300 px-4 py-2 whitespace-nowrap">মধু</td>
                <td className="border border-slate-300 px-4 py-2 whitespace-nowrap">সুন্দরবনের মধু</td>
                <td className=" border-slate-300 px-4 py-2 whitespace-nowrap flex justify-between">
                  <span>কেজি</span>
                  <span>২.০০</span>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        
        <div className="flex flex-col gap-y-2 mt-5">
          <div className="flex justify-between">
            <span className="w-[80px]">পরিবহন :</span>
            <div className="pb-2 border-b border-slate-300 flex-1 font-bold">জননী</div>
          </div>
          <div className="flex justify-between">
            <span className="w-[80px]">কন্ডিশন :</span>
            <div className="pb-2 border-b border-slate-300 flex-1 font-bold">নরমাল</div>
          </div>
          <div className="flex justify-between">
            <span className="w-[80px]">মন্তব্য :</span>
            <div className="pb-2 border-b border-slate-300 flex-1 font-bold">এক কাটুন মধু</div>
          </div>
        </div>
        
        <div className="flex justify-between gap-x-4 mt-28">
          <div className="pt-2 border-t text-center md:w-[40%] w-[50%]">
            ক্রেতার স্বাক্ষর
          </div>
          <div className="pt-2 border-t text-center md:w-[40%] w-[50%]">
            বিক্রেতার স্বাক্ষর
          </div>
        </div>

        <div className="text-center mt-10">   
        <span>05/04/2024 06:02:50 PM</span>         
        </div>
      </div>
      
      <div className="w-full mt-[120px]">
        <img
          src="/footer.png"
          alt="invoice"
          className="w-full h-auto object-fill"
        />
      </div>
    </div>
    </div>
    
  );
};

export default Invoice;
