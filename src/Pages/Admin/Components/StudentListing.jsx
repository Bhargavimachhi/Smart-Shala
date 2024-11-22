import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

const StudentListingrow = ({id}) => {
    const [studentname,setstudentname] = useState("");

    useEffect(()=>{
        async function getstudents(){
            const res = await axios.get("http://localhost:3000/getstudent/"+id);
            console.log(res.data.student.name);
            setstudentname(res.data.student.name);
        }
        getstudents();
    },[]);


  return (
    <>

    
      <tr

className="hover:bg-gray-200 transition duration-150"
>

<td className="py-2 px-4">{studentname}</td>
<td className="py-2 px-4">22038</td>

</tr>
    </>
  )
}

export default StudentListingrow;