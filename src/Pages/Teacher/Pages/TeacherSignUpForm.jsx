import { useState, useRef } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import { TeacherSignupImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchFile, uploadFile } from "../../../../upload.js";
import { ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormHelperText, Link } from "@mui/material";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const inputFile = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].type.split("/")[0] != "image") {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
        toast.error("Enter Valid Image");
        return;
      }
      setPhoto(e.target.files[0]);
    }
  };

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Registering User...");

    const teacherFormData = {
      name,
      email,
      contact,
      address,
      password,
    };

    // Validation
    if (!/^\d{10}$/.test(teacherFormData.contact)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (teacherFormData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const responce = await axios.post(
        "http://localhost:3000/signup/teacher",
        teacherFormData
      );
      await uploadFile(
        photo,
        `/attentance/${responce.data.teacher._id}/reference`
      );
      const url = await fetchFile(
        `/attentance/${responce.data.teacher._id}/reference`
      );
      await axios.post(
        `http://localhost:3000/teacher/${responce.data.teacher._id}/upload-photo`,
        { url }
      );
      toast.dismiss();
      toast.success("Teacher Added Successfully");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      className="w-full  space-y-6 h-full   p-8 rounded-lg shadow-lg"
      onSubmit={HandleTeacherSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">Teacher Details</h2>
      <hr className="border-t border-gray-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex. John Doe"
          required
        />
        <InputField
          label="Phone Number"
          type="number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Ex. 1234567890"
          required
        />
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ex. teacher@gmail.com"
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ex. $12@123"
          required
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2">
        <label className="block">Address :</label>
        <input
          type="text"
          className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex. Apartment, Area, City, District"
          required
        />
      </div>

      {/* Image */}
      <div className="flex flex-col gap-2">
        <label className="block">Upload Image for Attendance Purpose :</label>
        <div className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-4 shadow-sm shadow-foreground">
          <ImagePlus className={`size-20 block`} />
          <input
            type="file"
            ref={inputFile}
            onChange={handleFileChange}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>

      <hr />
      <FormHelperText className="flex justify-center">
        Already have an account?{" "}
        <Link href="/login/teacher" underline="hover">
          Log In
        </Link>
      </FormHelperText>
    </form>
  );
};

// Main AddTeacher Component
const AddTeacher = () => {
  return (
    <div className="min-h-screen bg-[url('/grid-pattern.svg')] bg-repeat">
      <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
                {/* <FileCheck className="h-20 w-20 text-muted-foreground/50" /> */}
                <img src={Rightangle} className="h-24 w-24 opacity-75"/>
              </div>
      
              
      
              <div className="absolute right-1/5 bottom-1/4">
              <img src={Straightline} className="h-24 w-24 opacity-75"/>
              </div>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Teacher Registration Form
        </h1>
        <div className="flex flex-col md:flex-row rounded-lg shadow-xl overflow-hidden bg-white">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 p-8 ">
            <TeacherForm />
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 relative bg-cover bg-center">
            <img
              src={TeacherSignupImage}
              alt="Teacher Registration"
              className="w-full h-full object-cover"
            />
              {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white text-center">
                  SmartShala
                </h1>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;