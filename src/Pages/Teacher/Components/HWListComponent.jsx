import React from 'react'

const HWListComponent = (props) => {

  return (
    <>
       <div className="bg-white p-5 m-1 flex justify-between items-center cursor-pointer hover:bg-blue-400 hover:ease-in  ">
       <div className='flex flex-col'>
       <h2>{props.name}</h2>
       <p className='text-sm text-gray-500'>
        {props.description}
       </p>
</div>
<div className=''>
    <h2>Due date : <span> {props.dueDate}</span></h2>
</div>


       </div>
    </>
  )
}

export default HWListComponent