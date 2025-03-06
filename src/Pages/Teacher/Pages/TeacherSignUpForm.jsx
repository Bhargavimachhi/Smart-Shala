import { useState } from "react";
import { StudentRegistrationImage } from "../../Admin/Icons/NavIcon.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

    const teacherFormData = {
      name,
      email,
      contact,
      address,
      password,
    };
    if (!/^\d{10}$/.test(teacherFormData.contact)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (teacherFormData.password.length < 6) {
      toast.error("Password must be atleast 6 charcater long");
      return;
    }

    try {
      const responce = await axios.post(
        "http://localhost:3000/signup/teacher",
        teacherFormData
      );

      console.log(responce.data);

      window.location.href = window.location.origin + "/login";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      className="w-full max-w-lg space-y-4 bg-white sm:p-6"
      onSubmit={HandleTeacherSubmit}
    >
      <h2 className="text-xl font-semibold text-text">Teacher Details</h2>
      <hr className="border-border" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name  */}
        <div className="flex flex-col gap-2">
          <label className="block">Name :</label>
          <input
            type="text"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. John Doe"
            required
          />
        </div>

        {/* Phone  */}
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

        {/* Email  */}
        <div className="flex flex-col gap-2">
          <label className="block">Email :</label>
          <input
            type="email"
            className="p-1 pl-2 border rounded-md border-text input-field focus:ring focus-visible:outline-none focus-visible:ring-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex. teacher@gmail.com"
            required
          />
        </div>

        {/* Password */}
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
      <button
        type="submit"
        className="px-6 py-2 text-white transition-all rounded-md bg-btn"
      >
        Submit
      </button>
    </form>
  );
};

const AddTeacher = () => {
  return (
    <div className="min-h-screen p-5 bg-gray-100 ">
      <div className="mb-2 font-semibold text-center">
        <h1 className="text-2xl text-text">Teacher Registration Form</h1>
      </div>
      <div className="flex flex-col w-full mx-auto bg-white rounded-md shadow-xl max-w-7xl md:flex-row">
        <div className="flex items-center justify-center w-full p-5 md:w-1/2">
          <TeacherForm />
        </div>
        <div className="relative flex items-center justify-center w-full p-5 abso md:w-1/2">
          <h1 className="absolute text-xl sm:text-4xl font-bold sm:top-[37%] sm:left-[10%] text-helper top-[30%] left-[10%]">
            SmartShala
          </h1>
          <img
            src={StudentRegistrationImage}
            alt="Teacher Registration"
            className="rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
