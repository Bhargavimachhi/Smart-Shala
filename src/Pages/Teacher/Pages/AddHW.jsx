import React, { useEffect } from 'react'
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar'
import AddedHomeWorkButton from '../Components/AddedHomeWorkButton';

const AddHW = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
      };



// useEffect(()=>{
//     const res = axios.get()

// })






  return (
   <>
   <div className="flex h-screen ">
 
  <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
  

 
  <main className="flex flex-col p-6 ml-14 w-full">
    <h1 className="text-2xl font-bold mb-4">Assing HomeWOrk</h1>
    <p className="text-gray-700">Single Point To handle Dcuments</p>
    <div className='bg-gray-100 w-full h-full flex justify-center '>
    

<div className='h-50 w-5/12 bg-red-400 m-10 flex flex-col items-center   '>





<div className="relative flex  rounded-lg bg-white shadow-sm border border-slate-200 ml-5 mr-5 my-10 w-9/12">
  <nav className="flex min-w-[240px] flex-col gap-1 w-full">
    <AddedHomeWorkButton image = 'src' SubjectName ="Mathematics" DueDate = "7/12"/>
      <div
      role="button"
        className="text-slate-800 flex w-full items-center p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-5 h-5 mr-2">
          <path  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
 
        Trash
        
      </div>
      <div
        role="button"
        className="text-slate-800 flex w-full items-center p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"      stroke="currentColor" className="w-5 h-5 mr-2">
          <path  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
 
        Settings
      </div>
  </nav>


</div>



<button className='rounded-md border w-1/2 border-slate-300 h-12 mr-10 mt-5 py-2 font-semibold px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blue-800 hover:border-blue-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
        Add Home work
    </button>


</div>




    </div>



    </main>

    




  </div>



   

   </>
)


}

export default AddHW