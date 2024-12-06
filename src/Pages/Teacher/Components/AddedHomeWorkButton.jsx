import React from 'react'

const AddedHomeWorkButton = (props) => {
  return (
    <>
        <div
      role="button"
      className="text-slate-800 flex w-full items-center justify-between p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-5 h-5 mr-2">
        <path d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
      </svg>
      {props.SubjectName}
      <p className='ml-2 text-xs '>Due Date  {props.DueDate}</p>
    <div className='flex justify-between items-center'>
    </div>
    </div>
    </>
  )
}

export default AddedHomeWorkButton