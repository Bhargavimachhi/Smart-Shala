import NoticeBoard from "../Components/HomePageComponents/NoticeBoard.jsx";
import TopPerformer from "../Components/HomePageComponents/TopPerformer.jsx";
import SideNavbar from "../../../components/SideNavbar.jsx";
import DataCard from "../Components/HomePageComponents/DataCard.jsx";
import "../css/AdminHome.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useGlobalContext } from "../../../context/GlobalProvider.jsx";

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [alerts, setAlerts] = useState([]);
  const { trigger, playSound } = useGlobalContext();

  useEffect(() => {
    if (trigger) {
      playSound(); // Execute the sound when the trigger is activated
    }
  }, [trigger, playSound]);

  // const PlaySound = ()=>{
  //   const audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/8/81/Alarm_or_siren.ogg");
  //   audio.play()
  // }
  const sendMail = async () => {
    setLoading(true);
    setStatus("");

    try {
      // Call the backend endpoint to send the mail
      const response = await axios.get("http://localhost:3000/mail");

      if (response.status === 200) {
        setStatus("Email sent successfully!");
        console.log(response);
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Error sending email. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const [SMSstatus, SMSsetStatus] = useState("");
  const [SMSloading, SMSsetLoading] = useState(false);

  const sendSMS = async () => {
    SMSsetLoading(true);
    SMSsetStatus("");

    try {
      const response = await axios.post("http://localhost:3000/send-sms", {
        to: "+917778005062", // Replace with recipient's phone number
        body: "Ahoy 👋 hii abhay", // Replace with the message body
      });

      if (response.data.success) {
        setStatus("SMS sent successfully!");
      } else {
        setStatus("Failed to send SMS.");
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch alerts from the backend
  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/emergency/admin");
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
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
      toast.success("Deleted succesfully");
      // Remove the deleted alert from state
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error("Error deleting alert:", error);
      alert("Failed to delete alert");
    }
  };
  return (
    <>
      <div className="w-screen h-screen" id="main-home-window">
        {/* side Navbar */}
        <div id="side-nav-container">
          <div className="fixed flex h-screen">
            <SideNavbar />
          </div>
        </div>
        <div className="h-screen" id="middle-container">
          {/* <div id="upper-nav" className="">
                <div id="upperNav" className="flex w-3/4 h-auto">
                  <UpperNavbar />
                </div>
              </div> */}
          <div id="main-container" className="">
            <div
              id="middle-left"
              className="max-h-screen p-3 bg-white"
            >
              <DataCard />

              <div className="flex flex-col w-full" id="top-performer">
                <h1 className="pt-2 text-xl font-bold">Top Performers</h1>
                <div className="w-full my-2 overflow-hidden overflow-y-auto rounded-md no-scrollbar h-[37vh] border border-btn">
                  <TopPerformer />
                </div>

                <div className="flex flex-col w-full mt-2">
                  <NoticeBoard />
                </div>
              </div>
            </div>

            <div id="middle-right" className="border border-l-border">
              <div className="flex flex-col w-full h-full min-h-screen p-3 overflow-hidden bg-white ">
                <button
                  onClick={sendMail}
                  disabled={loading}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: loading ? "#ccc" : "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Email parents"}
                </button>
                {status && <p>{status}</p>}
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: loading ? "#ccc" : "#0000FF",
                    color: "#fff",
                    marginTop: "5px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onClick={sendSMS}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send SMS"}
                </button>
                {SMSstatus && <p>{SMSstatus}</p>}

                <h2 className="mb-6 text-xl font-bold text-red-500">
                  Emergency Notifications
                  <button
                    type="button"
                    className="px-5 py-1 mt-5 text-gray-500 bg-blue-300 border-none rounded-lg"
                    onClick={sendMail}
                  >
                    Inform Parents{" "}
                  </button>
                </h2>

                <div className="flex flex-col items-center w-full p-2 mx-1 rounded shadow-lg h-96">
                  <div className="w-20 h-20 mb-5 bg-red-100 rounded-full ">
                    <img src="https://cdn-icons-png.flaticon.com/128/2014/2014825.png"></img>
                  </div>

                  {alerts.map((alert) => (
                    <>
                      <div className="flex items-center justify-between w-full mb-2 bg-white border border-blue-500 rounded shadow-2xl h-22rounded-md sha">
                        <div className="flex flex-col w-full h-full p-2">
                          <p className="text-sm text-gray-600">
                            <strong className="font-medium text-gray-800">
                              Type:
                            </strong>{" "}
                            {alert.emergencyType}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong className="font-medium text-gray-800">
                              Severity:
                            </strong>{" "}
                            {alert.severity}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong className="font-medium text-gray-800">
                              Location:
                            </strong>{" "}
                            {alert.location}
                          </p>
                        </div>
                        <div className="flex items-center justify-center h-full pr-1 w-5/4">
                          <button
                            onClick={() => handleDelete(alert._id)}
                            className="px-2 py-1 text-sm font-medium text-white transition-colors duration-200 bg-red-500 rounded-lg shadow hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                {/* <div className="grid grid-cols-1 gap-6">
    {alerts.map((alert) => (
      <div
        key={alert._id}
        className="flex items-center justify-between p-5 border border-gray-200 rounded-lg shadow-lg"
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
          className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-500 rounded-lg shadow hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ))}
  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
