import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerById } from '../../redux/actions/customerSlice';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, singleCustomer } = useSelector((state) => state.customers);

  useEffect(() => {
    if (customerId) {
      console.log("Fetching customer with ID:", customerId);
      dispatch(fetchCustomerById(customerId));
    }
  }, [dispatch, customerId]);

  useEffect(() => {
    console.log("singleCustomer state updated:", singleCustomer);
  }, [singleCustomer]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleCustomer || !singleCustomer.customer || !singleCustomer.customer.length) {
    return <div>No customer found.</div>;
  }

  const customerDetails = singleCustomer.customer[0];
  const sales = singleCustomer.sales || [];

  return (
    <div className="w-full h-full bg-muted rounded-md p-4">
      <div className="bg-white shadow-lg rounded-md p-6">
        <div className="flex flex-wrap items-center mb-4">
          <div className="w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">কাস্টমার
              তথ্য</h3>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/2 pr-4">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="text-blueGray-700 text-base p-4">কাস্টমার
                    :</th>
                  <td className="text-base p-4">{customerDetails.name}</td>
                </tr>
                <tr>
                  <th className="text-blueGray-700 text-base p-4">ঠিকানা :</th>
                  <td className="text-base p-4">{customerDetails.address}</td>
                </tr>
                <tr>
                  <th className="text-blueGray-700 text-base p-4">মোবাইল নাম্বার :</th>
                  <td className="text-base p-4">{customerDetails.phone_number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Buy History Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-base  text-blueGray-700 mb-4 flex justify-center">Buy History</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-blueGray-700 text-base p-4">Sl</th>
                <th className="text-blueGray-700 text-base p-4">ধরন</th>
                <th className="text-blueGray-700 text-base p-4">তারিখ</th>
                <th className="text-blueGray-700 text-base p-4">পরিমাণ</th>
                <th className="text-blueGray-700 text-base p-4">দর</th>
                <th className="text-blueGray-700 text-base p-4">মোট টাকা</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((item, index) => (
                  <tr key={index}>
                    <td className="text-base p-4">{index + 1}</td>
                    <td className="text-base p-4">{item.sub_category}</td>
                    <td className="text-base p-4">{item.date}</td>
                    <td className="text-base p-4">{item.quantity}</td>
                    <td className="text-base p-4">{item.unit_price}</td>
                    <td className="text-base p-4">{item.unit_price * item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-base p-4" colSpan="6">No sales data available</td>
                </tr>
              )}
              {sales.length > 0 && (
                <tr>
                  <td className="text-base p-4 font-semibold" colSpan="5"></td>
                  <td className="text-base p-4 font-semibold">
                   সর্বমোট টাকা: {sales.reduce((total, item) => total + item.unit_price * item.quantity, 0)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
