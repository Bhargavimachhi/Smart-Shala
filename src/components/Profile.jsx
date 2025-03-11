import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useUserContext } from "@/context/userContext";
import Loader from "@/Pages/InitialPages/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NotFoundPage from "./PageNotFound";

const Profile = () => {
  const { id, role } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        let res = await axios.get(`http://localhost:3000/${role}/${id}`);
        setUserData(res.data[role]);
        res = await axios.get(`http://localhost:3000/${role}/${id}/attendance`);
        let data = res.data.presentDays;

        data = data.map((date) => ({ day: date, value: 1 }));
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {userData ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <Card className="bg-white p-6 rounded-2xl shadow-lg mt-7">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
                {userData?.contact && (
                  <p className="text-gray-500">+91 {userData.contact}</p>
                )}
                {userData?.address && (
                  <p className="text-gray-500">{userData.address}</p>
                )}
              </div>
              <div className="mt-4 flex justify-around mt-5">
                {userData?.students && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {userData?.students?.length}
                    </p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                )}
                {userData?.teachers && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {userData?.teachers?.length}
                    </p>
                    <p className="text-sm text-gray-500">Teachers</p>
                  </div>
                )}
                {userData?.classrooms && (
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {userData?.classrooms?.length}
                    </p>
                    <p className="text-sm text-gray-500">Classrooms</p>
                  </div>
                )}
              </div>
            </Card>

            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
              <h3 className="text-xl font-bold mb-4 text-center">
                Attendance Overview
              </h3>
              <div className="h-40">
                <ResponsiveCalendar
                  data={attendanceData}
                  from="2025-01-01"
                  to="2025-12-31"
                  emptyColor="#eeeeee"
                  colors={["#33cc33"]}
                  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  yearSpacing={40}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default Profile;
