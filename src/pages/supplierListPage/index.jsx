import React, { useEffect } from "react";
import CommonTable from "../../components/ui/commonTable";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliers } from "../../redux/actions/supplierSlice";
import { Link } from "react-router-dom";

const SupplierListPage = () => {
	const dispatch = useDispatch();
	const { loading, error, suppliers } = useSelector((state) => state.suppliers);

	useEffect(() => {
		dispatch(getSuppliers());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	console.log("Suppliers data:", suppliers);

	return (
		<div className="w-full">
			<CommonTable data={suppliers} action index Component={DetailsLink} header_title={"সরবরাহকারী"} />
		</div>
	);
};

const DetailsLink = ({ id }) => (
	<Link to={`/account/suppliers/${id}`} className="cursor-pointer text-blue-500 underline">
		Details
	</Link>
);

export default SupplierListPage;

