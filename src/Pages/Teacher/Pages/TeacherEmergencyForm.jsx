import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftSideNavbar from '../../Student/Components/LeftSideNavBar';
import toast from 'react-hot-toast';

function TeacherEmergencyForm() {
    const [formData, setFormData] = useState({
        emergencyType: '',
        severity: '',
        location: '',
    });

    const [classes, setClasses] = useState([]);

    // Fetch classes dynamically (simulate API call)
    // useEffect(() => {
        // Example: Replace with your actual API endpoint
        // const fetchClasses = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/classes');
    //             setClasses(response.data);
    //         } catch (error) {
    //             console.error('Error fetching classes:', error);
    //         }
    //     };
    //     fetchClasses();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/teacher/emergency', formData);
            toast.success("Added successfully");
            setFormData({ emergencyType: '', severity: '', location: '' });
            // Notify the admin (if needed) by triggering a signal on the backend or using a WebSocket here
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 shadow-md ml-[25%] mt-[10%] rounded w-1/2">
        
            <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Emergency Type</label>
                <input
                    type="text"
                    value={formData.emergencyType}
                    onChange={(e) =>
                        setFormData({ ...formData, emergencyType: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Severity</label>
                <select
                    value={formData.severity}
                    onChange={(e) =>
                        setFormData({ ...formData, severity: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="" disabled>
                        Select severity
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>
            <div className="mb-3    ">
                <label className="block text-sm font-medium mb-1">Class</label>
                <select
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                >
                    {/* <option value="" disabled>
                        Select class
                    </option>
                    {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.name}>
                            {classItem.name}
                        </option>
                    ))} */}
                    <option value="class1">Class1</option>
                    <option value="class2">class2</option>

                    <option value="class3">class3</option>

                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Send Alert
            </button>
        </form>
    );
}

export default TeacherEmergencyForm;
