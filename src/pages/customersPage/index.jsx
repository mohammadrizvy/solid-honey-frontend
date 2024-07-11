import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../redux/actions/customerSlice';
import UsersTable from '../../components/dashboard/UsersTable';

const CustomerPage = () => {
	const dispatch = useDispatch();
	const { loading, error, customers } = useSelector((state) => state.customers);

	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const filteredCustomers = customers.filter(customer =>
		customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.phone_number.includes(searchTerm)
	);

	const searchHandler = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			<div className='mb-5'>
				<Link to={"/account/customer/transaction"}>
					<Button>কাস্টমার লেনদেন</Button>
				</Link>
			</div>
			<div className='mb-4'>
				<Input
					type="text"
					placeholder="Search by name or phone number"
					value={searchTerm}
					onChange={searchHandler}
				/>
			</div>
			<div>
				<UsersTable header_title={"Customer"} data={filteredCustomers} action />
			</div>
		</div>
	);
};

export default CustomerPage;
