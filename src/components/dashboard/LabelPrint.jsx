import React, { useEffect } from 'react'
import QRCode from 'qrcode.react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductProcessList } from '../../redux/actions/productFromSlice';
import Loading from '../Loading';


const LabelPrint = ({id, labelPrintRef}) => {
    const {customer_with_process_products, loading} = useSelector(state => state?.productsForm)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductProcessList())
    }, [dispatch])


    

    const getCurrentProcessProductCustomer = customer_with_process_products?.filter(pwpp => pwpp?.id == id)[0]


  return (
    loading ? <Loading /> :
    <div>



        <div className="flex items-center justify-center w-full print:h-screen">
            <div ref={labelPrintRef} className="w-a5 h-a5-height rounded hidden print:block bg-gray-50 print:bg-transparent px-6 pt-8 shadow-lg print:shadow-none">
                <div className="flex flex-col justify-center items-center gap-2">
                <h4 className="font-semibold text-2xl">সলিড</h4>
                </div>
                <div className="flex flex-col gap-3 border-b py-6 text-xs">
                <p className="flex justify-between">
                    <span className="text-gray-400">ID No.:</span>
                    <span>{`#${getCurrentProcessProductCustomer?.id}`}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span>{getCurrentProcessProductCustomer?.product_process_person_name__name}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-gray-400">Phone Number:</span>
                    <span>{getCurrentProcessProductCustomer?.product_process_person_name__phone_number}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-gray-400">Address:</span>
                    <span>{getCurrentProcessProductCustomer?.product_process_person_name__address}</span>
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




    </div>
  )
}

export default LabelPrint
