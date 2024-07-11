// WorkersTable.jsx

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa";


const WorkersTable = ({ data, header_title, action }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = data?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='p-5 bg-muted rounded-md'>
            <div className='flex md:flex-row flex-col justify-between md:items-center items-start mb-4'>
                <h1 className='text-2xl font-bold mb-4 text-honey'>{header_title}</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-honey text-center text-lg ">নাম</TableHead>
                        <TableHead className="text-honey text-lg text-center">মোবাইল নম্বর</TableHead>
                        {/* {action && <TableHead className=" font-bold px-4 py-2">বিবরণ </TableHead>} */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentUsers?.map((d, i) => (
                        <TableRow key={i} className="hover:bg-honey hover:text-muted">
                            <TableCell className="font-medium border-r-2 text-center">{d?.name}</TableCell>
                            <TableCell>{d?.phone_number}</TableCell>
                            {action && (
                                <TableCell className=" px-4 py-2 text-blue-500 underline whitespace-nowrap ">
                                    <Link to={`/account/workers/${d.id}`} className="cursor-pointer">
                                        বিস্তারিত
                                    </Link>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='text-center mt-8'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        className={`text-white py-1 px-2 hover:bg-honey ${i === (currentPage - 1) ? 'bg-honey' : 'bg-indigo-500'}`}
                        key={i}
                        onClick={() => paginate(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WorkersTable;
