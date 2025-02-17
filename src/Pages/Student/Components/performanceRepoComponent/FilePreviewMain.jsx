import React,{useEffect, useState} from 'react'
import FilePreview from '../submitHWComponent/FilePreview';
import FilePreviewComponent from './FilePreviewComponent';
import LeftSideNavbar from '../LeftSideNavBar';
import EvaluationGSA from './EvaluationGSA';
import { useParams } from 'react-router-dom';
const FilePreviewMain = () => { 
  const [isExpanded, setIsExpanded] = useState(false);
  const [url, setUrl] = useState('');
  const [homework, setHomework] = useState('');
  const {id} = useParams();

    const handleToggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
      };

  useEffect(() => {
    async function fetchHomework() {
      try{
        const res = await axios.get(`http://localhost:3000/homework/${id}`);
        setHomework(res.data.homework);
      } catch(err) {
        console.log(err);
      }
    }
    fetchHomework();
  },[]);

  return (
    <>
      <div className="flex">
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      > 
      <FilePreviewComponent/> 
      <EvaluationGSA url={url}/>
      </div>
      </div>
    </>
  )
}

export default FilePreviewMain
