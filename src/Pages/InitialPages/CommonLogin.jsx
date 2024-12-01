import React from 'react'
import { NavLink } from 'react-router-dom'

const CommonLogin = () => {
  return (
    <>
        <div className=' w-screen bg-yellow-400 h-screen p-5 '>
<div className="w-full bg-yellow h-full shadow-md flex items-center rounded  justify-center flex-col">
<div className=''>
<h1 className='mb-5'>Register As </h1>
<div className='flex'>
   <NavLink to='/login/admin'>

   <div className='bg-gray-200 shadow-xl px-20 py-5 rounded-md mr-5 hover:bg-white cursor-pointer '>
    Admin
        
    </div>
   </NavLink> 
   <NavLink to='/login/teacher'>

   <div className='bg-gray-200 shadow-xl px-20 py-5 mr-5 rounded-md hover:bg-white cursor-pointer '>
    Teacher     
    </div>
   </NavLink> 
   <NavLink to='/login/student'>

   <div className='bg-gray-200 shadow-xl px-20 py-5 rounded-md hover:bg-white cursor-pointer '>
    Student
        
    </div>
   </NavLink> 
   </div>
   

</div>
    
   <h1 className='text-2xl mt-5'> This Page will navigate to login page and then verify your role than automatically access to page according to teacher and student admin</h1>
</div>
    
</div>
    </>


  )
}



// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CommonLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Make API request to validate login
//       const response = await axios.post("https://your-api-url.com/login", {
//         email,
//         password,
//       });

//       const { role } = response.data; // Assuming the API returns a `role` field in the response

//       // Navigate based on user role
//       switch (role) {
//         case "teacher":
//           navigate("/teacher-dashboard");
//           break;
//         case "student":
//           navigate("/student-dashboard");
//           break;
//         case "admin":
//           navigate("/admin-dashboard");
//           break;
//         default:
//           setErrorMessage("Unknown role. Please contact support.");
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "An error occurred during login."
//       );
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//     </div>
//   );
// };






export default CommonLogin