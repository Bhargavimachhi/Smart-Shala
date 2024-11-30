import React, { useState } from 'react'

const TeacherLogin = () => {
  const [email,setEmail] = useState('');
  const [password , setPassword] = useState('')
  const HandleTeacherSubmit = (e)=>{
    e.preventDefault();

    const res = axios.post("http://")
    

  }
  return (
  <>
  <div className='h-screen w-screen flex justify-center items-center'>
    <form className="w-full max-w-lg" onSubmit={HandleTeacherSubmit}>
          <h2 className=" -ml-5">Teacher Details</h2>
          <hr className="mb-4 -ml-5"></hr>
          <div className="flex flex-wrap -mx-3 mb-6">
            
            </div>


  {/* Email  */}
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-email"
                type="text"
                placeholder="abc@gmail.com   "
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>

            {/* Password */}
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
              Password
              </label>
              <input
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-password"
                type="password"
                placeholder=""
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>


            <button
            type="submit"

            className="before:ease relative h-12 w-40 overflow-hidden border rounded-md border-green-500 bg-blue-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40"
          >
            submit
          </button>







            </form>
            </div>
  </>
  )
}

export default TeacherLogin