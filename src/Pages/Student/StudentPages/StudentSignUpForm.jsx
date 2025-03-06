import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      className="w-full max-w-lg space-y-4 bg-white sm:p-6"
      onSubmit={HandleStudentSubmit}
    >
      <h2 className="text-xl font-semibold text-text">Student Details</h2>
      <hr className="border-border" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="block">Name :</label>
          <input
            type="text"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Jane Doe"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block">Phone/Mo. :</label>
          <input
            type="number"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Ex. 12345-67890"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block">Email :</label>
          <input
            type="email"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex. student@gmail.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block">Password :</label>
          <input
            type="password"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ex. $12@123"
            required
          />
        </div>
      </div>
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

      <h2 className="text-xl font-semibold text-text">Parent's Details</h2>
      <hr className="border-border" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="block">Parent Name :</label>
          <input
            type="text"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Ex. John Doe"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block">Phone/Mo. :</label>
          <input
            type="number"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={parentContact}
            onChange={(e) => setParentContact(e.target.value)}
            placeholder="Ex. 12345-67890"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-6 py-2 text-white transition-all rounded-md bg-btn"
      >
        Submit
      </button>
    </form>
  );
};

const AddStudent = () => {
  return (
    <div className="min-h-screen p-5 bg-gray-100 ">
      <div className="mb-2 font-semibold text-center">
        <h1 className="text-2xl text-text">Student Registration Form</h1>
      </div>
      <div className="flex flex-col w-full mx-auto bg-white rounded-md shadow-xl max-w-7xl md:flex-row">
        <div className="flex items-center justify-center w-full p-5 md:w-1/2">
          <StudentForm />
        </div>
        <div className="relative flex items-center justify-center w-full p-5 abso md:w-1/2">
          <h1 className="absolute text-xl sm:text-4xl font-bold sm:top-[37%] sm:left-[10%] text-helper top-[30%] left-[10%]">
            SmartShala
          </h1>
          <img
            src={StudentRegistrationImage}
            alt="Student Registration"
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AddStudent;

// Tailwind Classes
// .input-field { className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }
// .btn-primary { className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600" }
