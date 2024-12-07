import React, { useEffect, useState } from 'react'
import axios from 'axios';
const HWListComponent = (props) => {

  const [teacher, setTeacher] = useState(null);
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacher() {
      const res = await axios.get(`http://localhost:3000/teacher/${props.homework.teacher}`);
      setTeacher(res.data.teacher);
    }
    async function fetchClassroom() {
      const res = await axios.get(`http://localhost:3000/classroom/${props.homework.classroom}`);
      setClassroom(res.data.classroom);
      setLoading(false);
    }

    fetchTeacher();
    fetchClassroom();
  },[]);

  if(loading) {
    return <div className="text-center mt-8"> Loding ...</div>
  }

  return (
      <>
        <div className="bg-white p-5 m-1 flex justify-between items-center cursor-pointer hover:bg-blue-400 hover:rounded-md  ">
          <div className='flex flex-col'>
            <h2>{props.homework.title}</h2>
            <p className='text-sm text-gray-500'>
              {props.homework.description}
            </p>
            <p className='text-sm text-gray-500'>
              {classroom && `Class : ${classroom.name}`}
            </p>
            <p className='text-sm text-gray-500'>
              {teacher && `Assigned By : ${teacher.name}`}
            </p>
          </div>
          <div className=''>
              <h2>Due date : <span> {props.homework.dueDate.split("T")[0]}</span></h2>
          </div>
        </div>
      </>
  )
}

export default HWListComponent