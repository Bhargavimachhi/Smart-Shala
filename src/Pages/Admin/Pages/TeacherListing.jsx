import SideNavbar from "../../../components/SideNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";

const TeacherListingpage = () => {


  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const [isVisible, setIsVisible] = useState(false);
  const [teacherEmail , setTeacherEmail] = useState("")

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  //this is function is to post to add teacher
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    if (!teacherEmail) {
      alert("Please enter a valid email.");
      return;
    }
    console.log(teacherEmail);
    
  
    try {
      const response = await axios.post(
        `http://localhost:3000/admin/${savedAuth.id}/assign-teacher`,
        { email: teacherEmail },
        { headers: { "Content-Type": "application/json" } } // Add this to ensure JSON format
      );
      console.log("Teacher added:", response.data);
      toast.success("Teacher added successfully!");
      setTeacherEmail(""); // Clear the input field after successful submission
      toggleVisibility(); // Hide the form after adding
    } catch (error) {
      console.error("Error adding teacher:", error);
      toast.error(error.response.data.message);
    }
  };
  
  


// Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(()=>{

    async function fetchTeachers(){

      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/teachers`);

      console.log(res.data.teachers);
      setTeachers(res.data.teachers);
      setLoading(false);
    }
    fetchTeachers();

  },[]);

  const filteredTeachers = teachers
    .filter((teacher) =>
      teacher[sortOption].toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        return a[sortOption].localeCompare(b[sortOption]);
    });

  if (loading) {
    return <div className="text-center mt-8">Loading Teachers...</div>;
  }

  


  return (
    <>

<div className="flex min-h-screen bg-gray-100">
   <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teachers</h1>
         
  <button type="button"
  onClick={toggleVisibility}
  className="text-white bg-[rgb(45,132,239)] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2" 
  >Add Teacher</button>
        </div>

         {/* Form to add teacher */}

  <div>
  
   

    {isVisible && (
      <div className="bg-white shadow-lg rounded-md w-[500px] h-[550px] absolute z-20 ml-[25%] p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg">Add Teacher</h1>
          <button
            className="text-gray-400 hover:text-black focus:outline-none"
            onClick={toggleVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <hr />
       
        <div className="flex pt-7 justify-center h-full items-center">
        <form className="flex flex-col gap-5 mb-10" onSubmit={handleSubmit}>
  <input
    type="email"
    value={teacherEmail}
    onChange={(e) => setTeacherEmail(e.target.value)}
    className="border px-20 py-5 mb-5 rounded-md"
    placeholder="email@email.com"
  />
  <button
    type="submit"
    className="justify-center text-white bg-[rgb(45,132,239)] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
  >
    Add Teacher
  </button>
</form>
        </div>
      </div>
    )}
  </div>

         {/* end of form to add teacher */}
        
        {teachers && teachers.length > 0 ? (
        <>

        <div className="flex gap-5 mb-10">
          {/* Search bar */}
          <TextField
          label="Search here"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sorting dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="sort-label" className="-mt-5">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          > 
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        </div>
        

        <Grid container spacing={3}>
        {filteredTeachers.map((teacher) => (
          <Grid item xs={12} sm={6} md={4} key={teacher._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {teacher.name}
                </Typography>
                {teacher.email && <Typography color="textSecondary">Email: {teacher.email}</Typography>}
                {teacher.contact && <Typography color="textSecondary">Contact: {teacher.contact}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
        </>
        ) : (
          <div className="text-center mt-8">No teacher found</div>
        )}
      </div>
    </div>


    
    </>
  )
}

export default TeacherListingpage