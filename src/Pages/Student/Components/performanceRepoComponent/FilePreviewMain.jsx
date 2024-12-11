import React,{useState} from 'react'
import FilePreview from '../submitHWComponent/FilePreview';
import FilePreviewComponent from './FilePreviewComponent';
import LeftSideNavbar from '../LeftSideNavBar';
import EvaluationGSA from './EvaluationGSA';
const FilePreviewMain = () => { 
  const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
      };
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
      <EvaluationGSA/>
      </div>
      </div>
    </>
  )
}

export default FilePreviewMain
