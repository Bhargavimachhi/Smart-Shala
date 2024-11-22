import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

const TeacherListingrow = ({id}) => {
    const [teachername,setteachername] = useState("");

    useEffect(()=>{
        async function getteachers(){
            const res = await axios.get("http://localhost:3000/getteacher/"+id);
            console.log(res.data.teacher.name);
            setteachername(res.data.teacher.name);
        }
        getteachers();
    },[]);


  return (
    <>

    
      <tr

className="hover:bg-gray-200 transition duration-150"
>

<td className="py-2 px-4">{teachername}</td>
<td className="py-2 px-4">22038</td>

</tr>
    </>
  )
}

export default TeacherListingrow;