import { useState, useRef } from "react";
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

  const HandleStudentSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Registering User...");
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
      const responce = await axios.post(
        "http://localhost:3000/signup/student",
        studentFormData
      );
      await uploadFile(
        photo,
        `/attentance/${responce.data.student._id}/reference`
      );
      const url = await fetchFile(
        `/attentance/${responce.data.student._id}/reference`
      );
      await axios.post(
        `http://localhost:3000/student/${responce.data.student._id}/upload-photo`,
        { url }
      );
      toast.dismiss();
      toast.success("Student Added Successfully");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
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
        <Link href="/login/student" underline="hover">
          Log In
        </Link>
      </FormHelperText>
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