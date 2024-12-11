import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestResource = () => {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState('');
    const [quantity, setQuantity] = useState(1);
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        const res = await axios.get('http://localhost:3000/admin/resources');
        setResources(res.data.resources);
    };

    const handleRequest = async () => {
        await axios.post('http://localhost:3000/teacher/request-resource', {
            teacherId: savedAuth.id,
            resourceId: selectedResource,
            quantity,
        });
        alert('Resource requested successfully');
    };

    return (
        <div>
            <h1>Request Resource</h1>
            <select onChange={(e) => setSelectedResource(e.target.value)}>
                <option value="">Select Resource</option>
                {resources.map(resource => (
                    <option key={resource._id} value={resource._id}>{resource.name}</option>
                ))}
            </select>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
            />
            <button onClick={handleRequest}>Request</button>
        </div>
    );
};

export default RequestResource;