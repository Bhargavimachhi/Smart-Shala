import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import { TeacherSignupImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Rightangle from "../../../assets/Right-angle.svg";
import Straightline from "../../../assets/Straightline.svg";
// import symbol from "../../assets/symbol.svg";
// Reusable Input Component
const InputField = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Teacher Form Component
const TeacherForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

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
      await axios.post("http://localhost:3000/signup/teacher", teacherFormData);
      window.location.href = window.location.origin + "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
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

      <InputField
        label="Address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ex. Apartment, Area, City, District"
        required
      />

      <button
        type="submit"
        className="w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
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