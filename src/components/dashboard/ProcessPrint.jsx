
import React from 'react'
import processPrintBg from "../../assets/process_print.svg"
import { useSelector } from 'react-redux'
import QRCode from 'qrcode.react'

const ProcessPrint = ({id, processPrintRef, with_header_footer=false}) => {
    const {customer_with_process_products, loading} = useSelector(state => state?.productsForm)
    const getCurrentProcessProductCustomer = customer_with_process_products?.filter(pwpp => pwpp?.id == id)[0]

    const bgImage = {
      backgroundImage: with_header_footer && `url('${processPrintBg}')`
    }


  return (
    <div ref={processPrintRef} className='bg-cover bg-center h-full w-full hidden print:block' style={bgImage}>

      {!with_header_footer && <h4 className="font-semibold text-2xl text-center py-5">সলিড</h4>}

      <div className={`flex flex-col justify-center ${with_header_footer && 'min-h-screen'} w-full px-8`}>
        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">ID No.:</span>
              <span className='font-bold'>{`#${getCurrentProcessProductCustomer?.id}`}</span>
          </p>
          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">নাম:</span>
              <span className='font-bold'>{getCurrentProcessProductCustomer?.product_process_person_name__name}</span>
          </p>
          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">ফোন নম্বর:</span>
              <span className='font-bold'>{getCurrentProcessProductCustomer?.product_process_person_name__phone_number}</span>
          </p>
          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">ঠিকানা:</span>
              <span className='font-bold'>{getCurrentProcessProductCustomer?.product_process_person_name__address}</span>
          </p>
        </div>

        <div className='mt-2 border-b'>
          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">প্রক্রিয়ার আগে গ্রেড :</span>
              <span className='font-bold'>{`${getCurrentProcessProductCustomer?.grade_before_process}`}</span>
          </p>

          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">প্রক্রিয়ার পরে গ্রেড :</span>
              <span className='font-bold'>{`${getCurrentProcessProductCustomer?.grade_after_process}`}</span>
          </p>

          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">প্রক্রিয়ার আগে ওজন :</span>
              <span className='font-bold'>{`${getCurrentProcessProductCustomer?.wight_before_process}`}</span>
          </p>

          <p className="flex justify-between">
              <span className="text-gray-600 font-semibold">প্রক্রিয়ার পরে ওজন :</span>
              <span className='font-bold'>{`${getCurrentProcessProductCustomer?.wight_after_process}`}</span>
          </p>


        </div>

        <div className='mt-2'>
          <p className="flex justify-between">
              <span className="text-gray-800 text-xl font-semibold">পরিমাণ :</span>
              <span className='font-bold text-xl'>{`${getCurrentProcessProductCustomer?.amount}`}</span>
          </p>


        </div>
        <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
          <div style={{ marginTop: '20px' }}>
              <QRCode
              value={getCurrentProcessProductCustomer?.id}
              size={100}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              includeMargin={true}
              />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProcessPrint


