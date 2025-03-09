import { Chat, Help, History, Send } from "@mui/icons-material";
import {
  FaAngleRight,
  FaAngleLeft,
  FaHome,
  FaUserCircle,
  FaInfoCircle,
  FaFileUpload,
} from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";

export const ICONS = {
  //mui/icons-material
  SEND: Send,
  CHAT: Chat,
  HISTORY: History,
  HELP: Help,

  //react icons
  USER: FaUserCircle,
  HOME: FaHome,
  INFO: FaInfoCircle,
  FILE: FaFileUpload,
  LEFT: FaAngleLeft,
  RIGHT: FaAngleRight,
  LOGOUT: IoLogOut,
  DOCUMENT: IoIosDocument,
  QUIZ : MdQuiz
};
