import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from '../../../components/SideNavbar'; // Adjust the import path as needed
import toast, { Toaster } from 'react-hot-toast';
import {
    Card,
    CardContent,
    Typography
  } from "@mui/material";

const ResourceManagement = () => {
    const [resources, setResources] = useState([]);
    const [requests, setRequests] = useState([]);
    const [newResource, setNewResource] = useState({ name: '', quantity: 0});
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    useEffect(() => {
        fetchResources();
        fetchRequests();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/${savedAuth.id}/resources`);
            console.log('Resources:', res.data.resources); // Debug log
            setResources(res.data.resources);
        } catch (error) {
            console.error('Error fetching resources:', error);
            toast.error('Error fetching resources');
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/${savedAuth.id}/resource-requests`);
            console.log('Requests:', res.data.requests); // Debug log
            setRequests(res.data.requests);
        } catch (error) {
            console.error('Error fetching requests:', error);
            toast.error('Error fetching requests');
        }
    };

    const handleAddResource = async () => {
        try {
            await axios.post(`http://localhost:3000/${savedAuth.id}/add-resource`, newResource);
            fetchResources();
            setNewResource({ name: '', quantity: 0});
            toast.success('Resource added successfully');
        } catch (error) {
            console.error('Error adding resource:', error);
            toast.error('Error adding resource');
        }
    };

    const approveRequest = async (i) => {
        try {
            await axios.post(`http://localhost:3000/${savedAuth.id}/resource-request/${i}/approve`);
            fetchRequests();
            fetchResources();
            toast.success('Request approved successfully');
        } catch (error) {
            console.error('Error approving request:', error);
            toast.error('Error approving request');
        }
    };

    return (
        <>
        <div className="flex min-h-screen bg-gray-200">
            <SideNavbar />
            <div className="flex-1 p-6">
                <Toaster />
                <h1 className="text-3xl font-bold mb-6">Resource Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Add New Resource</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newResource.name}
                            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={newResource.quantity}
                            onChange={(e) => setNewResource({ ...newResource, quantity: Number(e.target.value) })}
                            className="w-full p-2 mb-4 border rounded"
                        />
                        <button onClick={handleAddResource} className="w-full bg-blue-500 text-white p-2 rounded">Add Resource</button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Resources</h2>
                        <ul>
                            {resources.map(resource => (
                                <li key={resource._id} className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{resource.name}</span>
                                        <span>{resource.quantity} remaining</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                    <div className="bg-white p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Requests</h2>
                        <div className='mt-4'>
                            {requests.map((request,i) => (
                                // <li key={request._id} className="mb-2">
                                //     {request?.requestedBy || 'Unknown Teacher'} requested {request.quantity} {request.name || 'Unknown Resource'} for Classroom {request.requestedFor || 'Unknown Resource'}
                                    
                                // </li>
                                <Card className='mt-4'>
                                <CardContent>
                                  {/* <Typography variant="h6" gutterBottom>
                                    {student.name}
                                  </Typography> */}
                                  <Typography color="textSecondary">Resourses Needed: {request.quantity} {request.name}</Typography>
                                  <Typography color="textSecondary">Requested By {request.requestedBy} </Typography> 
                                  <Typography color="textSecondary">Requested For Classroon {request.requestedFor}</Typography>
                                  <Typography color="textSecondary"><button onClick={() => approveRequest(i)} className="ml-2 bg-green-500 text-white p-1 rounded">Approve</button></Typography>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                    </div>
                    <br />
                    
                </div>
            </div>
        </div>
        </>
    );
};

export default ResourceManagement;