import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWorkerById } from '../../../redux/actions/workersSlice';
import { Button } from "../../../components/ui/button"

const WorkerDetails = () => {
    const dispatch = useDispatch();
    const { loading, error, singleWorker } = useSelector((state) => state.workers);
    const { workerId } = useParams();

    useEffect(() => {
        if (workerId) {
            dispatch(fetchWorkerById(workerId));
        }
    }, [dispatch, workerId]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({
        name: '',
        email: '',
        phone_number: '',
        backup_phone_number: '',
        address: '',
        nid: '',
        joining_date: '',
        status: '',
        role: '',
    });

    useEffect(() => {
        if (singleWorker) {
            setEditedWorker(singleWorker.employees[0]);
        }
    }, [singleWorker]);

    const handleChange = (e) => {
        setEditedWorker({
            ...editedWorker,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        // Save the edited worker to the backend
        // Assuming you have a function to update the worker
        // updateWorker(editedWorker);

        setIsEditing(false);
    };

    const handleCancelClick = () => {
        if (singleWorker) {
            setEditedWorker(singleWorker.employees[0]);
        }
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const {
        name,
        email,
        phone_number,
        backup_phone_number,
        address,
        nid,
        joining_date,
        status,
        role,
    } = editedWorker;

    console.log(editedWorker)


    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">কর্মী বিস্তারিত</h2>
                <div className="flex items-center space-x-3">
                    <Button className="mr-3" variant="default">
                        Reset Password
                    </Button>
                    {!isEditing && (
                        <Button onClick={handleEditClick} variant="destructive">
                            Edit
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="text-blueGray-700 text-base">
                            কর্মী নাম :
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{name}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="text-blueGray-700 text-base">
                            ইমেইল :
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="text-blueGray-700 text-base">
                            মোবাইল নাম্বার :
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone_number"
                                value={phone_number}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{phone_number}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="backup_phone_number" className="text-blueGray-700 text-base">
                            ব্যাকআপ মোবাইল নাম্বার :
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="backup_phone_number"
                                value={backup_phone_number}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">
                                {backup_phone_number}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="address" className="text-blueGray-700 text-base">
                            ঠিকানা :
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{address}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="nid" className="text-blueGray-700 text-base">
                            এনএইডি নাম্বার :
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="nid"
                                value={nid}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{nid}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="joining_date" className="text-blueGray-700 text-base">
                            জোগদান তারিখ :
                        </label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="joining_date"
                                value={joining_date}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">
                                {joining_date}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="status" className="text-blueGray-700 text-base">
                            স্টাটাস :
                        </label>
                        {isEditing ? (
                            <select
                                name="status"
                                value={status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{status}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="text-blueGray-700 text-base">
                            রোল :
                        </label>
                        {isEditing ? (
                            <select
                                name="role"
                                value={role}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="1">Role 1</option>
                                <option value="2">Role 2</option>
                            </select>
                        ) : (
                            <div className="text-base p-2 border border-gray-300 rounded-md">{role}</div>
                        )}
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end mt-4">
                    <Button
                        className="mr-3"
                        variant="default"
                        onClick={handleSaveClick}
                    >
                        Save
                    </Button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default WorkerDetails;
