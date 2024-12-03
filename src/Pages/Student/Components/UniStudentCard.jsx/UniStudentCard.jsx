import { useNavigate } from "react-router-dom"; // Import useNavigate

const UniStudentCard = ({ id, name, email }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleViewProfile = () => {
    navigate(`/admin/students/${id}`); // Navigate to the student profile page with the student's ID
  };
  const handleViewAttendance = () => {
    navigate(`/attendance/${id}`); // Navigate to the attendance page with the student's ID
  };
  return (
    <div className="h-28 mx-5 mt-2 rounded bg-white flex items-center px-6 justify-between mb-2">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-red-400">
          <img
            className="object-cover w-20 h-20 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iO6yEt7eSdd5Qwzo4O5L1dcIsGEdav3ccg&s"
            alt="Profile"
          />
        </div>
        <div>
          <p>{name}</p>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="w-28 h-10 rounded-sm bg-green-300 flex items-center justify-center">
          Performance
        </button>
        <button className="w-28 h-10 rounded-sm bg-blue-300 flex items-center justify-center"
        onClick={handleViewAttendance}
        >
          Attendance
        </button>
      </div>
      <button
        onClick={handleViewProfile}
        className="w-36 h-10 bg-blue-600 text-white rounded-md flex items-center justify-center"
      >
        View Profile
      </button>
    </div>
  );
};

export default UniStudentCard;
