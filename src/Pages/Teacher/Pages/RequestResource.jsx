import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const RequestResource = () => {
    const [resources, setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState('');
    const [quantity, setQuantity] = useState(1);
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    const [isExpanded, setIsExpanded] = useState(false);
    const [classroom, setClassroom] = useState("");
    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
    };
    const {id} = useParams();

    useEffect(() => {
        async function fetchClassroom() {
            try {
                const res = await axios.get(`http://localhost:3000/classroom/${id}`);
                setClassroom(res.data.classroom);
                fetchResources(res.data.classroom.admin);
            } catch (error) {
                toast.error('Classroom does not exist');
            }
        }
    
        async function fetchResources (id){
            try {
                const res = await axios.get(`http://localhost:3000/${id}/resources`);
                setResources(res.data.resources);
            } catch (error) {
                toast.error('Error fetching resources:', error);
            }
        };

        fetchClassroom();
    }, []);

    const handleRequest = async () => {
        // console.log("request-rersource fucntion called");
        try {
            await axios.post(`http://localhost:3000/${classroom.admin}/request-resource`, {
                teacherId: savedAuth.id,
                name: selectedResource,
                quantity:Number(quantity),
            });
            toast.success('Resource requested successfully');
        } catch (error) {
            console.error('Error requesting resource:', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <h1 className="text-3xl font-bold mb-6 bg-sky-800 text-white text-center w-full p-6 ">Request Resource</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Select Resource</h2>
                    <h5 className="text-2xl font-bold mb-4">Classroom Name : {classroom.name}</h5>
                    <select
                        value={selectedResource}
                        onChange={(e) => setSelectedResource(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    >
                        <option value="" change="ResourceMan">Select Resource</option>
                        {resources.map(resource => (
                            <option key={resource._id} value={resource.name}>{resource.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button
                        onClick={handleRequest}
                        className="w-full bg-sky-800 text-white p-2 rounded hover:bg-sky-600"
                    >
                        Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestResource;