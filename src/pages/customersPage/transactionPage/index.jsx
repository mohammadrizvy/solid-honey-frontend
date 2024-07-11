import React from 'react'
import { Button } from "@/components/ui/button"

const TransactionPage = () => {


    return (
        <div>
            <div className='bg-muted rounded-md'>
                <div className="rounded-t px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-honey">বকেয়া এবং অগ্রিম গ্রহণ</h3>
                        </div>
                        <h1 className="bg-honey p-2 rounded-lg">অনুসন্ধান</h1>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <select class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" name="" id="">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 h-screen py-2">
                    <div className="container mx-auto px-4">
                        <br />
                        <div className="flex flex-col md:flex-row gap-1">
                            <div className="md:w-3/4">
                                <div className="bg-white shadow-md p-6 mb-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="w-full">
                                                <th className="text-left font-semibold text-honey">ক্রেতার নাম :</th>
                                                <th className="text-left font-semibold">
                                                    <select className='border-black p-1 bg-honey text-white mt-1' name="" id="">
                                                        <option value="">92849365964283489217409</option>
                                                        <option value="">3094092374892368473546</option>
                                                    </select>

                                                </th>
                                                <th className="text-left bg-honey text-white font-semibold p-2 rounded-lg">0.000</th>
                                            </tr>
                                            <tr>
                                                <th className="text-left font-semibold text-honey">নগদ জমা :</th>
                                                <input className='w-full border-black p-1 bg-gray-200 rounded-lg mt-1' type="number" name="" id="" placeholder="Enter Phone Number " />
                                            </tr>
                                            <tr>
                                                <th className="text-left font-semibold text-honey">তারিখ :</th>
                                                <input className='w-full border-black p-1 bg-gray-200 rounded-lg mt-1' type="text" name="" id="" placeholder="Enter a text " />
                                            </tr>
                                            <tr>
                                                <th className="text-left font-semibold text-honey">মন্তব্য :</th>
                                                <input className='w-full border-black p-1 bg-gray-200 rounded-lg mt-1' type="text" name="" id="" placeholder="Enter a text " />
                                            </tr>
                                        </thead>

                                    </table>
                                </div>
                            </div>

                            <div className="md:w-1/4 ">
                                <div className="bg-white text-center rounded-lg shadow-md p-6 mt-2">
                                    <div className="bg-gray-300 p-2">
                                        <a href="#" className="font-semibold text-center text-honey">নতুন</a>
                                    </div>
                                    <hr />
                                    <div class="text-center bg-gray-300 p-2">
                                        <a href="#" type="button" className="font-semibold text-honey"> প্রিন্ট</a>
                                    </div>
                                    <hr />
                                    <div class="text-center bg-gray-300 p-2">
                                        <a href="#" className="font-semibold text-honey">সেভ</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>















            </div>
        </div>
    )
}

export default TransactionPage
