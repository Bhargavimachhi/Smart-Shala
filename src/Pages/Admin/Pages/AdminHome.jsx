import NoticeBoard from "../Components/NoticeBoard.jsx";
import TopPerformer from '../Components/TopPerformer.jsx'

import UpperNavbar from '../Components/UpperNavbar.jsx'
import SideNavbar from '../../../components/SideNavbar.jsx';
import DataCard from "../Components/DataCard.jsx";
import AttendanceGraph from "../Components/AttendanceGraph.jsx";

const AdminHome = () => {
    return (
      <>
      <div className="flex min-h-screen bg-gray-100">
        <SideNavbar />
        <div
          id="main"
          className=" rounded-sm flex w-screen flex-col px-5 text-gray-900">
            <UpperNavbar/>
            {/* Data Cards */}
            <DataCard />
  
            {/* Top Performer */}
            <h1 className="text-xl font-bold mb-2 ">Top Performers</h1>
            <div className='w-9/12  h-1/4 overflow-hidden overflow-y-auto bg-white rounded-md p-5 '>
              <TopPerformer/>  
            </div>         
          <NoticeBoard/>
          <AttendanceGraph/>
        </div>




        
      </div>
      </>
    );
  };
  
  export default AdminHome;