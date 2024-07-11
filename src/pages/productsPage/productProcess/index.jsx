import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux'
import { getProductProcessList } from '../../../redux/actions/productFromSlice'
import ReactToPrint from 'react-to-print'
import LabelPrint from '../../../components/dashboard/LabelPrint'
import { Printer } from 'lucide-react'
import { POST_PRODUCT_PROCESS } from '../../../../axios'
import toast, { Toaster } from 'react-hot-toast'
import { useToast } from "@/components/ui/use-toast"
import ProcessPrint from '../../../components/dashboard/ProcessPrint'

function ProductProcess() {
    const labelPrintRef = useRef()
    const processPrintRef = useRef()
    const { toast } = useToast()
    const dispatch = useDispatch()
    const {id} = useParams()
    const [with_header_footer, setWith_header_footer] = useState(false)
    const {customer_with_process_products} = useSelector(state => state?.productsForm)

    const getCurrentProcessProductCustomer = customer_with_process_products?.filter(pwpp => pwpp?.id == id)[0]
    

    useEffect(() => {
        dispatch(getProductProcessList())
    }, [dispatch])







    const productProcessSubmitHandler = async (event, product_process_id) => {
        event.preventDefault()

        const form = new FormData(formElement)

        const formData = {}

        for (let [key, value] of form.entries()) {
            formData[key] = value
        }

        formData['pp_id'] = product_process_id
        

        POST_PRODUCT_PROCESS(formData, (error, data) => {
            if (error) return console.log(error);

            dispatch(getProductProcessList())


            return toast({
                description: `পণ্য প্রক্রিয়া সফলভাবে সংরক্ষণ করা হয়েছে!! প্রিন্ট করার জন্য উপরের প্রিন্ট বাটনে ক্লিক করুন`,
              })
        })
    }



  return (
    <div>
        <Toaster />

        <h1 className='text-xl font-bold mb-3'>Product Process</h1>

        <div>

            <div className='flex flex-row'>
                <div className='mr-4'>
                    <ReactToPrint
                        trigger={() => 
            
                            <Button className="my-3">
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Label Print</span>
                            </Button>
        
                        }
                        content={() => labelPrintRef.current}
                    />
                </div>

                <div>

                    {
                        getCurrentProcessProductCustomer?.grade_after_process && getCurrentProcessProductCustomer?.wight_before_process && getCurrentProcessProductCustomer?.grade_before_process && getCurrentProcessProductCustomer?.wight_after_process && getCurrentProcessProductCustomer?.grade_after_process && getCurrentProcessProductCustomer?.amount && <ReactToPrint
                        trigger={() => 
            
                            <Button className="my-3">
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Print</span>
                            </Button>
        
                        }
                        content={() => processPrintRef.current}
                    />
                    }
                    
                    
                </div>


                {getCurrentProcessProductCustomer?.grade_after_process && getCurrentProcessProductCustomer?.wight_before_process && getCurrentProcessProductCustomer?.grade_before_process && getCurrentProcessProductCustomer?.wight_after_process && getCurrentProcessProductCustomer?.grade_after_process && getCurrentProcessProductCustomer?.amount && <div className="flex items-center space-x-2 ml-3">
                    <Checkbox checked={with_header_footer} onCheckedChange={e => setWith_header_footer(e)} id="with_header_footer" />
                    <label
                        htmlFor="with_header_footer"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted"
                    >
                        Need Header and Footer for Print
                    </label>
                </div> }


                <LabelPrint labelPrintRef={labelPrintRef} id={getCurrentProcessProductCustomer?.id} />
            </div>

        <Table>
            <TableHeader>   
                <TableRow>
                <TableHead className="text-gray-50">আইডি</TableHead>
                <TableHead className="text-gray-50">নাম</TableHead>
                <TableHead className="text-gray-50">ঠিকানা</TableHead>
                <TableHead className="text-gray-50">ফোন নম্বর</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
    
                <TableRow className="hover:bg-honey hover:text-muted bg-white">
                    <TableCell>{getCurrentProcessProductCustomer?.id}</TableCell>
                    <TableCell>{getCurrentProcessProductCustomer?.product_process_person_name__name}</TableCell>
                    <TableCell>{getCurrentProcessProductCustomer?.product_process_person_name__address}</TableCell>
                    <TableCell className="text-right">{getCurrentProcessProductCustomer?.product_process_person_name__phone_number}</TableCell>
                </TableRow>

            </TableBody>

            </Table>
        </div>
      <div className="bg-white p-5 rounded-md mt-8">

        <div className="">
          <form onSubmit={e => productProcessSubmitHandler(e, getCurrentProcessProductCustomer?.id)} id="formElement">
              <div className="mb-5">
                  <label for="" className="mb-3 block text-base font-medium text-[#07074D]">
                    প্রক্রিয়ার আগে গ্রেড
                  </label>
                  <input type="number" name="gbp" id="" defaultValue={getCurrentProcessProductCustomer?.grade_before_process} placeholder="Grade before process"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
              <div className="mb-5">
                  <label for="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    প্রসেস পরে গ্রেড
                  </label>
                  <input defaultValue={getCurrentProcessProductCustomer?.grade_after_process} type="number" name="gap" id="" placeholder="Wight after process"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
              <div className="mb-5">
                  <label for="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    প্রক্রিয়ার আগে ওজন
                  </label>
                  <input defaultValue={getCurrentProcessProductCustomer?.wight_before_process} type="number" name="wbp" id="" placeholder="Grade after process"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>


              <div className="mb-5">
                  <label for="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    প্রক্রিয়ার পরে ওজন
                  </label>
                  <input defaultValue={getCurrentProcessProductCustomer?.wight_after_process} type="number" name="wap" id="" placeholder="Grade after process"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>
  
              <div className="mb-5">
                  <label for="" className="mb-3 block text-base font-medium text-[#07074D]">
                    পরিমাণ
                  </label>
                  <input defaultValue={getCurrentProcessProductCustomer?.amount} type="number" name="amount" id="" placeholder="Enter Ammount"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
              </div>

              <div>
                  <button type="submit"
                      className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                      সংরক্ষণ
                  </button>
              </div>
          </form>
      </div>
      </div>
      
      <ProcessPrint processPrintRef={processPrintRef} id={getCurrentProcessProductCustomer?.id} with_header_footer={with_header_footer} />
            
    </div>
  )
}

export default ProductProcess
