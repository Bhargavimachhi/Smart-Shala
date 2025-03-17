import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ResponsiveCalendar } from "@nivo/calendar";
import Loader from "@/Pages/InitialPages/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFoundPage from "./PageNotFound";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const { id, role } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);
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
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-blue-600">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <Card className="p-6 bg-white shadow-lg rounded-2xl mt-7">
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
              <div className="flex justify-around mt-5">
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

            <div className="p-6 mt-6 bg-white shadow-lg rounded-2xl">
              <h3 className="mb-4 text-xl font-bold text-center">
                Attendance Overview
              </h3>
              <Select
                value={selectedYear}
                onValueChange={(e) => {
                  setSelectedYear(e);
                }}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currYear}>{currYear}</SelectItem>
                  <SelectItem value={currYear - 1}>{currYear - 1}</SelectItem>
                  <SelectItem value={currYear - 2}>{currYear - 2}</SelectItem>
                  <SelectItem value={currYear - 3}>{currYear - 3}</SelectItem>
                  <SelectItem value={currYear - 4}>{currYear - 4}</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-40">
                <ResponsiveCalendar
                  data={attendanceData}
                  from={`${selectedYear}-01-01`}
                  to={`${selectedYear}-12-31`}
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
