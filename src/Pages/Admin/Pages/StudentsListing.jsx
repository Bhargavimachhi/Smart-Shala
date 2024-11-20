import React from 'react';
import { Mail, Phone, MoreVertical, User, BookOpen, Database, Calendar } from 'lucide-react';


import SideNavbar from '../../../components/SideNavbar';

const StudentsListingpage = () => {

    const students = [
        {
          id: "STD001",
          name: "Alice Johnson",
          email: "alice.j@school.com",
          phone: "+1 234-567-8901",
          grade: "A",
        },
        {
          id: "STD002",
          name: "Bob Smith",
          email: "bob.s@school.com",
          phone: "+1 234-567-8902",
          grade: "B+",
        },
        {
          id: "STD003",
          name: "Carol White",
          email: "carol.w@school.com",
          phone: "+1 234-567-8903",
          grade: "A-",
        },
        {
          id: "STD004",
          name: "David Brown",
          email: "david.b@school.com",
          phone: "+1 234-567-8904",
          grade: "B",
        },
        {
          id: "STD005",
          name: "Eva Green",
          email: "eva.g@school.com",
          phone: "+1 234-567-8905",
          grade: "A+",
        },
      ];
  return (
  <>
  <div className="flex min-h-screen bg-gray-100">
     <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Students List</h1>
              <div className="flex gap-4">
                <input
                  type="search"
                  placeholder="Search students..."
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Add New Student
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <button 
                          className="hover:text-blue-500" 
                          title={student.email}
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                        <button 
                          className="hover:text-blue-500"
                          title={student.phone}
                        >
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="hover:text-blue-500">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing 1 to 5 of 5 entries
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default StudentsListingpage;