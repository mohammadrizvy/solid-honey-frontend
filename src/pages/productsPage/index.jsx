
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast';

import { POST_ADD_PRODUCT } from '../../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getProductProcessList } from '../../redux/actions/productFromSlice'
import SearchBox from '../../components/dashboard/SearchBox'
import { Link, useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,

  DropdownMenuSeparator,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Layers, Printer } from 'lucide-react';
import ReactToPrint from 'react-to-print';
import LabelPrint from '../../components/dashboard/LabelPrint';




const ProductsPage = () => {
  const labelPrintRef = useRef()

  const { categories, customer_with_process_products } = useSelector(state => state?.productsForm)
  const [prCustomer, setPrCustomer] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProductProcessList())
  }, [dispatch])


  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(5)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomer = prCustomer.length > 0 && prCustomer.slice(indexOfFirstItem, indexOfLastItem) || customer_with_process_products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customer_with_process_products.length / itemsPerPage);

  const paginateNext = () => setCurrentPage(prev => prev + 1);
  const paginatePrev = () => setCurrentPage(prev => prev - 1);


  const addProductHandler = async (e) => {
    e.preventDefault()

    const form = new FormData(formElement)
    const formData = {}

    for (let [key, value] of form.entries()) {
      formData[key] = value
    }


    setLoading(true)
    const toastId = toast.loading('Loading...');
    await POST_ADD_PRODUCT(formData, (err, data) => {
      if (err) return toast.error(err?.data?.message, { id: toastId });
      toast.success('Saved', { id: toastId })
      navigate(`/products-process/${data?.id}`)
    })
  }



  const searchCustomerWithLableHandler = (e, setValue) => {
    setValue(e.target.value)

    if (e.target.value) {
      const searchPrCu_withLabel = customer_with_process_products?.filter(pr_with_label => pr_with_label?.product_process_person_name__name?.toLowerCase()?.startsWith(e.target.value?.toLowerCase()) || pr_with_label?.product_process_person_name__phone_number?.toLowerCase()?.startsWith(e.target.value?.toLowerCase()))
      setPrCustomer(searchPrCu_withLabel)
    } else {
      setPrCustomer(customer_with_process_products)
    }


  }


  return (
    <div className=''>
      <Toaster />




      <div className='bg-muted/40 p-5 rounded w-full'>
        <form onSubmit={addProductHandler} id='formElement'>

          <div>


            <div className=''>
              <h1>Customer Information</h1>
              <div className='grid md:grid-cols-2 grid-cols gap-3'>

                <div>
                  <div>
                    <label htmlFor='phone_number' className='font-bold'>ফোন নম্বর</label>
                    <Input name="phone_number" id="phone_number" className="mt-1" type="text" placeholder="Phone Number" />
                    {/* <Badge className="shadow-md mt-2 bg-green-400/80 text-gray-800 hover:none">Available</Badge> */}
                  </div>

                  <div className='mt-3'>
                    <label htmlFor='name' className='font-bold'>নাম</label>
                    <Input name="name" id="name" className="mt-1" type="text" placeholder="Name" />
                  </div>
                </div>

                <div>

                  <div>
                    <label htmlFor='address' className='font-bold'>ঠিকানা</label>
                    <Input name="address" id="address" className="mt-1" type="text" placeholder="Address" />
                  </div>


                  <div className='mt-3'>
                    <label htmlFor='category' className='font-bold'>ক্যাটাগরি</label>

                    <select name="psc" id="" className='block w-full py-2 rounded-md px-2 mt-1'>
                      {categories?.map(cat => (
                        <option key={cat?.id} value={cat?.id}>{cat?.product_sub_category}</option>
                      ))}
                    </select>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <Button desabled={loading} className="mt-3" type="submit">Save</Button>
        </form>
      </div>






      <section className="px-4 mt-8">

        <div className="mt-6">

          <h1 className='text-xl font-bold'>লেবেলের তালিকা</h1>

          <div className="flex items-center mt-4 md:mt-0">


            <SearchBox searchHandler={searchCustomerWithLableHandler} />
          </div>
        </div>

        <div className="mt-6">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">

                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* <TableHead className="text-gray-50">ক্রমিক</TableHead> */}
                      <TableHead className="text-gray-50">আইডি</TableHead>
                      <TableHead className="text-gray-50">নাম</TableHead>
                      <TableHead className="text-gray-50">ঠিকানা</TableHead>
                      <TableHead className="text-gray-50">ফোন নম্বর</TableHead>
                      <TableHead className="text-right text-gray-50">অন্যন্য</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCustomer?.map((cus_label, index) => (
                      <TableRow key={index} className="hover:bg-honey hover:text-muted bg-white">
                        {/* <TableCell className="font-medium">{index+1}</TableCell> */}
                        <TableCell>{cus_label?.id}</TableCell>
                        <TableCell>{cus_label.product_process_person_name__name}</TableCell>
                        <TableCell>{cus_label.product_process_person_name__address}</TableCell>
                        <TableCell>{cus_label.product_process_person_name__phone_number}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <EllipsisVertical className='cursor-pointer hover:text-gray-500' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>

                                <ReactToPrint
                                  trigger={() =>
                                    <DropdownMenuItem>
                                      <Printer className="mr-2 h-4 w-4" />
                                      <span>লেবেল প্রিন্ট করুন</span>
                                    </DropdownMenuItem>
                                  }
                                  content={() => labelPrintRef.current}
                                />


                                <LabelPrint labelPrintRef={labelPrintRef} id={cus_label?.id} />



                                <Link to={`/products-process/${cus_label?.id}`}>
                                  <DropdownMenuItem>
                                    <Layers className="mr-2 h-4 w-4" />
                                    <span>প্রক্রিয়া চালিয়ে যান</span>

                                  </DropdownMenuItem>
                                </Link>


                              </DropdownMenuGroup>

                              <DropdownMenuSeparator />

                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="font-medium text-gray-700 dark:text-gray-100">{currentPage} of {totalPages}</span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">

            {currentPage !== 1 && (
              <a onClick={paginatePrev} className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                  previous
                </span>
              </a>
            )}

            {totalPages !== currentPage && (
              <a onClick={paginateNext} className="cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                  Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage