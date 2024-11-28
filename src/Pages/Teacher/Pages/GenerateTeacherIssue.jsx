import React, { useState } from 'react';
import axios from 'axios';

const GenerateTeacherIssue = () => {
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('low');
  const [classroomId, setClassroomId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/teacher/classrooms/${classroomId}/generate-issue`, {
        description,
        severity,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error generating issue:', error);
      alert('Failed to generate issue');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Generate Issue</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Classroom ID</label>
            <input
              type="text"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Generate Issue</button>
        </form>
      </div>
    </div>
  );
};

export default GenerateTeacherIssue;