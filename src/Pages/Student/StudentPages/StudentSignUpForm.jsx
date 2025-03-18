import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import { StudentSignupImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";

// Input Component (Reusable)
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

// Form Component
const StudentForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [password, setPassword] = useState("");

  const HandleStudentSubmit = async (e) => {
    e.preventDefault();
    const studentFormData = {
      name,
      email,
      contact,
      address,
      parentName,
      parentContact,
      password,
    };

    // Validation
    if (!/^\d{10}$/.test(studentFormData.contact)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (!/^\d{10}$/.test(studentFormData.parentContact)) {
      toast.error("Parent number must be 10 digits.");
      return;
    }
    if (studentFormData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await axios.post("http://localhost:3000/signup/student", studentFormData);
      window.location.href = window.location.origin + "/login";
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form
      className="w-full space-y-6 bg-white p-8 rounded-lg shadow-lg"
      onSubmit={HandleStudentSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
      <hr className="border-t border-gray-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex. Jane Doe"
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
          placeholder="Ex. student@gmail.com"
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

      <h2 className="text-2xl font-bold text-gray-800">Parent's Details</h2>
      <hr className="border-t border-gray-200" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label="Parent Name"
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          placeholder="Ex. John Doe"
          required
        />
        <InputField
          label="Parent Phone Number"
          type="number"
          value={parentContact}
          onChange={(e) => setParentContact(e.target.value)}
          placeholder="Ex. 1234567890"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

// Main Component
const AddStudent = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Registration Form
        </h1>
        <div className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden bg-white">
          {/* Left Section - Form */}
          <div className="w-full md:w-1/2 p-8">
            <StudentForm />
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2 relative bg-cover bg-center">
            <img
              src={StudentSignupImage}
              alt="Student Registration"
              className="w-full h-full object-cover"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;