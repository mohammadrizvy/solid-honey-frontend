import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSupplierById } from "../../redux/actions/supplierSlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SupplierPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, singleSupplier } = useSelector((state) => state.suppliers);

  useEffect(() => {
    if (productId) {
      dispatch(fetchSupplierById(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const baseUrl = "http://localhost:3000"


  console.log(singleSupplier)


  return (
    <div className="w-full h-full bg-muted rounded-md p-4">
      {singleSupplier && (
        <div className="bg-white shadow-lg rounded-md p-6">
          <div className="flex flex-wrap items-center mb-4">
            <div className="w-full flex-grow flex-1">
              <h3 className="font-semibold text-base  text-blueGray-700">সরবরাহকারী তথ্য</h3>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="w-1/2 pr-4">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <th className="text-blueGray-700 border-r-2 border-l-2 border-t-2 border-b-2 text-base p-4">সরবরাহকারী :</th>
                    <td className="text-base border-r-2 border-l-2  border-t-2 border-b-2  p-4">{singleSupplier.psu.name}</td>
                  </tr>
                  <tr>
                    <th className="text-blueGray-700  border-r-2    border-l-2 border-t-2 border-b-2  text-base p-4">ঠিকানা :</th>
                    <td className="text-base border-r-2 border-l-2  border-t-2 border-b-2  p-4">{singleSupplier.psu.address}</td>
                  </tr>
                  <tr>
                    <th className="text-blueGray-700  border-r-2    border-l-2 border-t-2 border-b-2  text-base p-4">মোবাইল নাম্বার :</th>
                    <td className="text-base border-r-2 border-l-2  border-t-2 border-b-2  p-4">{singleSupplier.psu.phone_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/2 pl-4 flex flex-col items-center">
              <p className="text-base font-semibold mb-2">সরবরাহকারীর ছবি</p>
              <img
                src={`${baseUrl}${singleSupplier.psu.p_img}`}
                alt="Supplier"
                className="rounded-sm shadow-lg w-48 h-48 object-cover cursor-pointer"
              />
            </div>
          </div>

          {/* NID/License Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-base text-blueGray-700 mb-4 flex justify-center">NID/LINCENSE</h3>
            <div className="flex justify-between items-center">
              <div className="w-1/2 pr-4 flex flex-col items-center">
                <p className="text-base font-semibold mb-2 underline">NID ছবি</p>
                <img
                  src={`${baseUrl}${singleSupplier.psu.nid}`}
                  alt="NID"
                  className="rounded-sm shadow-lg w-100 h-60 object-cover cursor-pointer"
                />
              </div>
              <div className="w-1/2 pl-4 flex flex-col items-center">
                <p className="text-base font-semibold underline mb-2">লাইসেন্স ছবি</p>
                <img
                  src={`${baseUrl}${singleSupplier.psu.lichance}`}
                  alt="License"
                  className="rounded-sm shadow-lg w-100 h-60 object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Buy History Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-base  text-blueGray-700 mb-4 flex justify-center">Buy History</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="text-blueGray-700 text-base text-center border-l-2 border-t-2 border-r-2 border-b-2 p-4">Sl</th>
                  <th className="text-blueGray-700 text-base border-t-2 text-center border-r-2 border-b-2 p-4">ধরন</th>
                  <th className="text-blueGray-700 text-base border-t-2 text-center border-r-2 border-b-2 p-4">তারিখ</th>
                  <th className="text-blueGray-700 text-base border-t-2 text-center border-r-2 border-b-2 p-4">পরিমাণ</th>
                  <th className="text-blueGray-700 text-base border-t-2 text-center border-r-2 border-b-2 p-4">দর</th>
                  <th className="text-blueGray-700 text-base border-t-2 text-center border-r-2 border-b-2 p-4">মোট টাকা</th>
                </tr>
              </thead>
              <tbody>
                {singleSupplier.buys.map((item, index) => (
                  <tr key={index}>
                    <td className="text-base border-r-2 border-l-2 border-b-2   p-4">{index + 1}</td>
                    <td className="text-base border-r-2 border-b-2 text-center p-4">{item.sub_category}</td>
                    <td className="text-base border-r-2 border-b-2 text-center p-4">{item.date}</td>
                    <td className="text-base border-r-2 border-b-2 text-center p-4">{item.quintity}</td>
                    <td className="text-base border-r-2 border-b-2 text-center p-4">{item.unit_price}</td>
                    <td className="text-base border-r-2 border-b-2 text-center p-4">{item.unit_price * item.quintity}</td> {/* Calculate total price */}
                  </tr>
                ))}
                <tr>
                  <td className="text-base p-4 text-center font-semibold" colSpan="5"></td>
                  <td className="text-base p-4 text-center border-r-2 border-b-2 border-l-2 font-semibold">
                    সর্বমোট টাকা:  {singleSupplier.buys.reduce((total, item) => total + item.unit_price * item.quintity, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;
