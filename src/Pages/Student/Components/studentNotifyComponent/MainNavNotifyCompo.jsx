import React, { useState } from "react";
import NotificationList from "./NotificationList"; // Importing NotificationList component
import { FaTrash, FaSort, FaFilter } from "react-icons/fa"; // Importing necessary icons from react-icons

const MainNavNotifyCompo = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [notifications, setNotifications] = useState({
    Inbox: [
      {
        id: 1,
        title: "Maths",
        description: "This is a sample notification for Maths.",
        time: "Now",
      },
      {
        id: 2,
        title: "Science",
        description: "This is a sample notification for Science.",
        time: "10 min ago",
      },
      {
        id: 3,
        title: "History",
        description: "This is a sample notification for History.",
        time: "1 hour ago",
      },
    ],
    Holidays: [
      {
        id: 4,
        title: "Summer Break",
        description: "The school will remain closed for summer vacation.",
        time: "2 days ago",
      },
      {
        id: 5,
        title: "Holiday Notice",
        description: "Holiday on account of Independence Day.",
        time: "1 week ago",
      },
    ],
    ClassWork: [
      {
        id: 6,
        title: "Math Assignment",
        description: "Submit the math assignment by tomorrow.",
        time: "5 hours ago",
      },
      {
        id: 7,
        title: "Science Project",
        description: "Prepare a science project model.",
        time: "3 days ago",
      },
    ],
  });
  const [filter, setFilter] = useState("");

  const activeNotifications = notifications[activeTab] || [];

  // Delete notification handler
  const handleDelete = (id) => {
    const updatedNotifications = { ...notifications };
    updatedNotifications[activeTab] = updatedNotifications[activeTab].filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  // Sort notifications by time (newest first)
  const handleSort = () => {
    const updatedNotifications = { ...notifications };
    updatedNotifications[activeTab] = updatedNotifications[activeTab].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    setNotifications(updatedNotifications);
  };

  // Filter notifications by title (case-insensitive)
  const handleFilter = () => {
    const updatedNotifications = { ...notifications };
    updatedNotifications[activeTab] = updatedNotifications[activeTab].filter(
      (notification) =>
        notification.title.toLowerCase().includes(filter.toLowerCase())
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="rounded-lg p-5  bg-white border-2 border-gray-50 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Notifications</h1>

      {/* Actions for Delete, Sort, Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            onClick={handleSort}
            className="flex items-center text-gray-700 hover:text-blue-700"
          >
            <FaSort className="mr-2" />
            Sort
          </button>
          <button
            onClick={handleFilter}
            className="flex items-center text-gray-700 hover:text-blue-700"
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          <input
            type="text"
            placeholder="Filter by title"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={() => handleDelete(null)} // Placeholder for delete all notifications
          className="text-gray-700 hover:text-blue-700 flex items-center"
        >
          <FaTrash className="mr-2" />
          Delete All
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex border-b mb-6">
        {["Inbox", "Holidays", "ClassWork"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 text-lg ${
              activeTab === tab
                ? "text-blue-700 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
          >
            {tab}
          </div>
        ))}
      </nav>

      {/* Notifications Content */}
      <NotificationList notifications={activeNotifications} handleDelete={handleDelete} />
    </div>
  );
};

export default MainNavNotifyCompo;
