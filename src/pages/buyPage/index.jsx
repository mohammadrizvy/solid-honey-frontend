import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "../../redux/actions/categoriesSlice";
import { Toaster, toast } from "react-hot-toast";
import { POST_BUY_PRODUCTS, instance } from "../../../axios";
import { FaPlusCircle, FaSave } from "react-icons/fa";

const BuyPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.category);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [buyProduct, setBuyProduct] = useState([]);
  const sellFormRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [showAddress, setShowAddress] = useState(false);
  const [dhor, setDhor] = useState(0);
  const [poriman, setPoriman] = useState(0);
  const [phonenumbererror, setPhonenumbererror] = useState("");

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  const searchHandlerWithNumber = async (e) => {
    const value = e?.target?.value;
    const phoneNumberRegex = /^\d{11}$/;

    if (!phoneNumberRegex.test(value)) {
      return setPhonenumbererror("Invalid phone number format");
    } else {
      setPhonenumbererror("");
    }

    try {
      const { data } = await instance.post(
        `${import.meta.env.VITE_BACKEND_URL}/buyer/product/saler/user/all`,
        { phone_number: value }
      );
      setUserData(data);
    } catch ({ response }) {
      console.log(response?.data);
    }
  };

  const getSubCategory = (id) => {
    const subCategory = categories?.find((c) => c?.id == id);
    setSubCategoryList([...subCategory?.subcategories]);
  };

  const buySubmitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(sellFormRef.current);
    const formData = {};
  
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
  
    formData["dhor"] = dhor;
  
    if (
      !formData["name"] ||
      !formData["phone_number"] ||
      !formData["address"] ||
      !formData["poriman"] ||
      !formData["dhor"]
    ) {
      return toast.error("Please enter all fields in the form");
    }
  
    // Add files to formData separately
    formData["p_img"] = form.get("userImage");
    formData["nid"] = form.get("voterIdImage");
    formData["lichance"] = form.get("licenseImage");
  
    setBuyProduct((prev) => {
      const existingUserIndex = prev.findIndex(
        (product) => product.phone_number === formData.phone_number
      );
  
      if (existingUserIndex > -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingUserIndex].buys.push({
          sub_category: formData.dhoron,
          date: new Date().toISOString().split("T")[0],
          quintity: formData.poriman,
          unit_price: formData.dhor,
        });
        return updatedProducts;
      } else {
        return [
          ...prev,
          {
            id: prev.length + 1,
            name: formData.name,
            phone_number: formData.phone_number,
            address: formData.address,
            p_img: formData.userImage,
            nid: formData.voterIdImage,
            lichance: formData.licenseImage,
            buys: [
              {
                sub_category: formData.dhoron,
                date: new Date().toISOString().split("T")[0],
                quintity: formData.poriman,
                unit_price: formData.dhor,
              },
            ],
          },
        ];
      }
    });
  
    toast.success("Product added successfully");
    sellFormRef.current.reset();
  };

  const submitHandler = () => {
    if (buyProduct.length === 0) {
      return toast.error("Please add products");
    }

    POST_BUY_PRODUCTS(buyProduct, (err, data) => {
      if (err) {
        toast.error("Something went wrong");
        console.log(err);
      } else {
        toast.success("Buyers successfully added");
        console.log("Data saved successfully", data);
        setBuyProduct([]);
      }
    });
  };

  const calCulateTotalPoriman = (e) => {
    const poriman = Number(e.target.value);
    setPoriman(poriman);
  };

  const calCulateTotalDhor = (e) => {
    const dhor = Number(e.target.value);
    setDhor(dhor);
  };

  console.log("This are buy products from frontend:", buyProduct)

  return (
    <div>
      <Toaster />
      <div className="bg-gray-100 h-screen py-8">
        <div className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
          <div className="flex items-center">
            <h2 className="font-bold text-2xl text-honey pl-1">বিল/মেমো</h2>
          </div>
        </div>
        <div className="container mx-auto p-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <form className="" onSubmit={buySubmitHandler} ref={sellFormRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    ক্রেতার নাম :
                  </label>
                  <input
                    defaultValue={userData?.user?.name}
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                    type="text"
                    name="name"
                    placeholder="Enter name "
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    মোবাইল নাম্বার :
                  </label>
                  <input
                    onKeyUp={searchHandlerWithNumber}
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                    type="number"
                    name="phone_number"
                    placeholder="Enter Phone Number "
                  />
                  <p className="text-red-300">{phonenumbererror}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    ঠিকানা :
                    {userData?.user?.address && (
                      <input
                        onChange={() => setShowAddress((prev) => !prev)}
                        checked={showAddress}
                        type="checkbox"
                        className="ml-2"
                      />
                    )}
                  </label>
                  <input
                    defaultValue={
                      userData && showAddress ? userData?.user?.address : ""
                    }
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                    type="text"
                    name="address"
                    placeholder="Enter address"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">ছবি আপলোড :</label>
                  <input
                    type="file"
                    name="userImage"
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    ভোটার আইডি কার্ড :
                  </label>
                  <input
                    type="file"
                    name="voterIdImage"
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-left font-semibold">
                    লাইসেন্স আপলোড :
                  </label>
                  <input
                    type="file"
                    name="licenseImage"
                    className="border p-2 bg-gray-200 rounded-lg mt-1 w-full"
                  />
                </div>
              </div>

              {userData?.last_purchase && (
                <div className="my-4 bg-white p-5">
                  <h1 className="font-bold">Last Purchase Details</h1>
                  <div className="mt-4">
                    <p>Unit price : {userData?.last_purchase?.unit_price}</p>
                    <p>Quantity : {userData?.last_purchase?.quintity}</p>
                    <p>Date : {userData?.last_purchase?.date}</p>
                  </div>
                </div>
              )}

              <table className="w-full mt-5">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-left font-semibold">
                      পণ্য বাছাই করুন :
                    </th>
                    <th className="text-left font-semibold">ধরণ:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-blue-500">
                    <td className="py-2 px-4">
                      <select
                        className="py-2 px-4 w-full"
                        name="category_id"
                        onChange={(e) => getSubCategory(e.target.value)}
                      >
                        <option value="">Select category ....</option>
                        {categories?.map((c, i) => (
                          <option key={i} value={c?.id}>
                            {c?.category}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td colSpan={2} className="py-2 px-4">
                      <select className="py-2 px-4 w-full" name="dhoron">
                        <option value="">Select subcategory ....</option>
                        {subCategoryList.map((sc) => (
                          <option key={sc.id} value={sc.id}>
                            {sc.product_sub_category}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-blue-500">
                    <td className="py-2 px-4 bg-gray-300">
                      পরিমান :{" "}
                      <input
                        onKeyUp={calCulateTotalPoriman}
                        type="number"
                        name="poriman"
                        className="w-full text-center bg-white pr-20"
                      />
                    </td>
                    <td className="py-2 px-4 bg-gray-300">
                      দর :{" "}
                      <input
                        onKeyUp={calCulateTotalDhor}
                        type="number"
                        name="dhor"
                        className="w-full text-center bg-white pr-20"
                      />
                    </td>
                    <td className="py-2 px-4 bg-gray-300">
                      মোট :{" "}
                      <input
                        readOnly
                        value={dhor * poriman}
                        name="mot"
                        className="w-full text-center bg-white pr-20"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5">
                <Button type="submit">
                  Add <FaPlusCircle className="ml-2" />
                </Button>
              </div>
            </form>

            <div className="container mx-auto mt-4">
              <div className="wrapper bg-white rounded shadow w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        ক্রেতার নাম
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        মোবাইল নাম্বার
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        ঠিকানা
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        ধরণ
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        তারিখ
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        পরিমান
                      </th>
                      <th className="p-2 bg-honey text-white border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                        দর
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyProduct?.map((p, i) => (
                      <tr key={i}>
                        <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                          {p?.name}
                        </td>
                        <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                          {p?.phone_number}
                        </td>
                        <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                          {p?.address}
                        </td>
                        {p?.buys.map((buy, j) => (
                          <React.Fragment key={j}>
                            <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                              {buy?.sub_category}
                            </td>
                            <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                              {buy?.date}
                            </td>
                            <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                              {buy?.quintity}
                            </td>
                            <td className="p-2 text-center border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                              {buy?.unit_price}
                            </td>
                          </React.Fragment>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {buyProduct?.length > 0 && (
                <Button onClick={submitHandler} className="mt-5">
                  Save <FaSave className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
