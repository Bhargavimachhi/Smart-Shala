import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../../../components/SideNavbar"; // Adjust the import path as needed
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, Typography } from "@mui/material";

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newResource, setNewResource] = useState({ name: "", quantity: 0 });
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    fetchResources();
    fetchRequests();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/${savedAuth.id}/resources`
      );
      console.log("Resources:", res.data.resources); // Debug log
      setResources(res.data.resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Error fetching resources");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/${savedAuth.id}/resource-requests`
      );
      console.log("Requests:", res.data.requests); // Debug log
      setRequests(res.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Error fetching requests");
    }
  };

  const handleAddResource = async () => {
    try {
      await axios.post(
        `http://localhost:3000/${savedAuth.id}/add-resource`,
        newResource
      );
      fetchResources();
      setNewResource({ name: "", quantity: 0 });
      toast.success("Resource added successfully");
    } catch (error) {
      console.error("Error adding resource:", error);
      toast.error("Error adding resource");
    }
  };

  const approveRequest = async (i) => {
    try {
      await axios.post(
        `http://localhost:3000/${savedAuth.id}/resource-request/${i}/approve`
      );
      fetchRequests();
      fetchResources();
      toast.success("Request approved successfully");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Error approving request");
    }
  };

  return (
   <>
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <SideNavbar />
    
    {/* Main Content */}
    <div className="flex-1 p-8">
      <Toaster />
      <h1 className="mb-8 text-4xl font-bold text-gray-800">Resource Management</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Resource Section */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">Add New Resource</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Resource Name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newResource.quantity}
              onChange={(e) => setNewResource({ ...newResource, quantity: Number(e.target.value) })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddResource}
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Resource
            </button>
          </div>
        </div>

        {/* Resources List */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">Available Resources</h2>
          <ul className="space-y-4">
            {resources.map((resource) => (
              <li key={resource._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-800">{resource.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({resource.quantity} available)</span>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                  In Stock
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requests Section */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">Pending Requests</h2>
          <div className="space-y-4">
            {requests.map((request, index) => (
              <div key={request._id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{request.name}</span>
                  <span className="text-sm text-gray-500">Qty: {request.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Requested by: {request.requestedBy}</p>
                    <p>For Classroom: {request.requestedFor}</p>
                  </div>
                  <button
                    onClick={() => approveRequest(index)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  );
};

export default ResourceManagement;
