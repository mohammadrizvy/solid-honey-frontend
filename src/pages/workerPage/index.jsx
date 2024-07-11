import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchBox from '../../components/dashboard/SearchBox';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getWorkers } from "../../redux/actions/workersSlice";
import WorkersTable from "./WorkersTable/WorkersTable";
import { POST_ADD_WORKER } from '../../../axios';
import { getRoles } from '../../redux/actions/rolesSlice';
import { Toaster, toast } from "react-hot-toast"

const WorkerPage = () => {
	const dispatch = useDispatch();
	const { loading: workersLoading, error: workersError, workers } = useSelector((state) => state.workers);
	const { roles, loading: rolesLoading, error: rolesError } = useSelector((state) => state.roles);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(getWorkers());
		dispatch(getRoles());
	}, [dispatch]);

	useEffect(() => {
		// console.log('Workers:', workers);
		// console.log('Roles:', roles);
	}, [workers, roles]);

	if (workersLoading || rolesLoading) {
		return <div>Loading...</div>;
	}

	if (workersError || rolesError) {
		return <div>Error: {workersError || rolesError}</div>;
	}

	const filteredWorkers = workers.filter(worker =>
	(worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(worker.phone_number && worker.phone_number.includes(searchTerm)))
	);

	return (
		<div>
			<div className='mb-5'>
				<Link to={"/account/workers/attendance"}>
					<Button>কর্মী হাজিরা</Button>
				</Link>
			</div>
			<div className='mb-4 flex justify-between '>
				<div className="">
					<SearchBox searchValue={searchTerm} setSearchValue={setSearchTerm} />
				</div>
				<div className="">
					<AddModal roles={roles} />
				</div>
			</div>
			<div>
				<WorkersTable header_title={"কর্মী বিস্তারিত"} data={filteredWorkers} action />
			</div>
		</div>
	);
};

export default WorkerPage;



const AddModal = ({ roles }) => {
	const formRef = useRef(null);

	const addHandler = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const formData = {};
		for (let [key, value] of form.entries()) {
			formData[key] = value;
		}

		console.log("This is from the frontend", formData);

		//? Axios POST request
		POST_ADD_WORKER(formData, (err, data) => {
			if (err) {
				console.error('Error:', err);
				toast.error("Something went wrong");
			} else {
				toast.success("Employee added successfully");
				console.log('Success:', data);
				formRef.current.reset();
			}
		});
	};

	console.log("The roles ", roles);

	return (
		<Dialog>
			<Toaster />
			<DialogTrigger asChild>
				<Button variant="outline">কর্মী জোগদান +</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[1000px]">
				<DialogHeader>
					<DialogTitle>কর্মী জোগদান</DialogTitle>
				</DialogHeader>
				<form onSubmit={addHandler} ref={formRef} className="grid gap-4 py-4" id="formElement">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid grid-cols-1 gap-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									কর্মী নাম :
								</Label>
								<Input
									placeholder=""
									name="name"
									id="name"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="phone_number" className="text-right">
									মোবাইল নম্বর :
								</Label>
								<Input
									placeholder="01*********"
									name="phone_number"
									id="phone_number"
									type="tel"
									maxLength="11"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="backup_phone_number" className="text-right">
									ব্যাকআপ মোবাইল নম্বর :
								</Label>
								<Input
									placeholder="01*********"
									name="backup_phone_number"
									type="tel"
									id="backup_phone_number"
									maxLength="11"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									ইমেইল :
								</Label>
								<Input
									placeholder="example@gmail.com"
									name="email"
									id="email"
									type="email"
									className="col-span-3"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="address" className="text-right">
									ঠিকানা :
								</Label>
								<Input
									placeholder=""
									name="address"
									id="address"
									className="col-span-3"
									type="text"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="joining_date" className="text-right">
									জোগদান তারিখ :
								</Label>
								<Input
									name="joining_date"
									id="joining_date"
									className="col-span-3"
									type="date"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="nid" className="text-right">
									এনএইডি নম্বর :
								</Label>
								<Input
									placeholder="******************"
									name="nid"
									id="nid"
									className="col-span-3"
									type="number"
									maxLength="20"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									কর্মী Status :
								</Label>
								<select className="py-2 px-4 w-full" name="status" id="status">
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</select>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="role" className="text-right">
									রোল :
								</Label>
								<select className="py-2 px-4 w-full" name="role" id="role">
									{roles.map((role) => (
										<option key={role.id} value={role.id}>
											{role.role_name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<DialogFooter className="col-span-2">
						<Button type="submit">সেভ</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
