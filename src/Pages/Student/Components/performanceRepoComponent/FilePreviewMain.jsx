import React,{useEffect, useState} from 'react'
import FilePreviewComponent from './FilePreviewComponent';
import LeftSideNavbar from '../LeftSideNavBar';
import EvaluationGSA from './EvaluationGSA';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../../firebase";
import axios from 'axios';

const FilePreviewMain = () => { 
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [urlOfTeacherFile, setUrlOfTeacherfile] = useState('');
  const [homework, setHomework] = useState('');
  const {id} = useParams();
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

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

    async function fetchFile() {
      const fileRef = ref(storage, `/homeworks/${id}/${savedAuth.id}`);
      try {
        const url = await getDownloadURL(fileRef);
        setUrl(url);
        fetchTeacherFile();
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }

    async function  fetchTeacherFile() {
      const fileRef = ref(storage, `/homeworks/${id}/teachersfile`);
      try {
        const url = await getDownloadURL(fileRef);
        setUrlOfTeacherfile(url);
        setLoading(false);
      } catch (error) {
        console.error("File not found");
      }
    }
    
    fetchHomework();
    fetchFile();
    
  },[]);

  if(loading) {
    return;
  }

  return (
    <>
      <div className="flex">
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      > 
      <a href={url}>View File</a> <br />
      <a href={urlOfTeacherFile}>View File</a>
      <EvaluationGSA url={url}/>
      </div>
      </div>
    </>
  )
}

export default FilePreviewMain
