import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table"

const ProductsTables = ({type="", products}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage] = useState(10)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProduct = products.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={`p-10 ${type == 'BUY' || type === 'RETURN' ? '' : 'bg-black/60'} mt-3 rounded-md text-honey`}>
        <Table>
        <TableHeader>   
            <TableRow>
            <TableHead className="text-gray-50">প্রোডাক্ট নাম</TableHead>
            <TableHead className="text-gray-50">Status</TableHead>
            <TableHead className="text-gray-50">Method</TableHead>
            <TableHead className="text-gray-50">Date</TableHead>
            <TableHead className="text-right text-gray-50">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {currentProduct?.map((product, index) => (
            <TableRow key={index} className="hover:bg-honey hover:text-muted">
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.method}</TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell className="text-right">{product.totalAmount}</TableCell>

            </TableRow>
            ))}
        </TableBody>

        </Table>

        {!type.includes("PAGE") && <div className="flex items-center justify-center mt-2 select-none font-mono object-bottom">
                <h1 className="px-4 py-1 shadow-lg shadow-gray-500/50 opacity-70 bg-black/60 text-white rounded-lg text-[15px] cursor-pointer 
                    active:scale-[.97]">
                    See All
               </h1>
        </div> }



        {type.includes("PAGE") && <div className={`flex gap-2 justify-center items-center mt-5`}>
      
        {Array.from({ length: totalPages }, (_, i) => (
          <button className={`text-white py-1 px-2 hover:bg-honey ${i === (currentPage - 1) ? 'bg-honey' : 'bg-indigo-500'}`} key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>}
    </div>
  )
}

export default ProductsTables
