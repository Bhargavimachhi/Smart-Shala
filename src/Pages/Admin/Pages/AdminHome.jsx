    import NoticeBoard from "../Components/NoticeBoard.jsx";
    import TopPerformer from "../Components/TopPerformer.jsx";

    import UpperNavbar from "../Components/UpperNavbar.jsx";
    import SideNavbar from "../../../components/SideNavbar.jsx";
    import DataCard from "../Components/DataCard.jsx";
    import AttendanceGraph from "../Components/AttendanceGraph.jsx";
    import "./AdminHome.css";
    import { useAuth } from "../../../context/auth.jsx";
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CardWithPopUp from "../Components/CardWithPopUp.jsx";

    const AdminHome = () => {
      const [alerts, setAlerts] = useState([]);

      // Fetch alerts from the backend
      const fetchAlerts = async () => {
          try {
              const response = await axios.get('http://localhost:3000/emergency/admin');
              setAlerts(response.data);
          } catch (error) {
              console.error('Error fetching alerts:', error);
          }
      };
  
      useEffect(() => {
          // Initial fetch of alerts
          fetchAlerts();
  
          // Auto refresh every 10 seconds
          const intervalId = setInterval(fetchAlerts, 10000);
  
          // Cleanup interval when component unmounts
          return () => clearInterval(intervalId);
      }, []);
  
      // Delete alert by ID
      const handleDelete = async (id) => {
          try {
              await axios.delete(`http://localhost:3000/emergency/admin/${id}`);
           toast.success("Deleted succesfully")
              // Remove the deleted alert from state
              setAlerts(alerts.filter((alert) => alert._id !== id));
          } catch (error) {
              console.error('Error deleting alert:', error);
              alert('Failed to delete alert');
          }
      };
      return (
        <>
          <div className="   w-screen h-screen" id="main-home-window">
            <div className="bg-red" id="side-nav-container">
              <div className="h-screen flex fixed">
                <SideNavbar />
              </div>
            </div>
            <div className="h-screen  " id="middle-container">
              {/* <div id="upper-nav" className="">
                <div id="upperNav" className="flex w-3/4 h-auto">
                  <UpperNavbar />
                </div>
              </div> */}
              <div id="main-container" className="bg-green-500">
                <div
                
                  id="middle-left "
                  className=" h-screen bg-white p-5 shadow-2xl"
                >
                  <DataCard />

                  <div className="flex flex-col" id="top-performer">
                    <h1 className="text-xl font-bold pt-5">Top Performers</h1>
                    <div className="w-9/12  h-1/5  overflow-hidden no-scrollbar mb-2  overflow-y-auto  rounded-md p-5 mt-5 ">
                      {/* {auth?.token
                        ? (console.log("auth.email exists:", auth.token),
                          (
                            <> */}
                              <TopPerformer />
                            
                          {/* ))
                        : (navigate("/login/admin"),
                          console.log("Rendering TopPerformer"))} */}
                    </div>

                    <div className="  p-2  w-3/4 flex flex-col mt-2   ">
                      <NoticeBoard />
                    </div>
                  </div>
                </div>

                <div id="middle-right" className="bg-black shadow-xl ">
                <div className=" h-full overflow-hidden flex flex-col bg-gray-500 min-h-screen w-full p-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">
    Emergency Notifications
  </h2>
  <div className="grid grid-cols-1 gap-6">
    {alerts.map((alert) => (
      <div
        key={alert._id}
        className="p-5 bg-white shadow-lg rounded-lg flex justify-between items-center border border-gray-200"
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Type:</strong> {alert.emergencyType}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Severity:</strong> {alert.severity}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Location:</strong> {alert.location}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium text-gray-800">Created At:</strong>{' '}
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => handleDelete(alert._id)}
          className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>





                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

    export default AdminHome;
