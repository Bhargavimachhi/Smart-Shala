import { AiOutlineIssuesClose } from "react-icons/ai";
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaCheckCircle,
  FaBell,
  FaExclamationTriangle,
  FaBoxOpen,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeSharp, IoLogOutOutline } from "react-icons/io5";
import { LuPanelLeftOpen } from "react-icons/lu";
import { MdCoPresent, MdOutlineQuiz } from "react-icons/md";
import {
  SiBookstack,
  SiGoogleclassroom,
  SiWelcometothejungle,
} from "react-icons/si";

import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";

export const ICONS = {
  //react icons
  HOME: IoHomeSharp,
  LOGOUT: IoLogOutOutline,
  PANEL_LEFT: LuPanelLeftOpen,
  BACK: IoIosArrowBack,
  BELL: FaBell,
  CHECK_HOMEWORK: FaClipboardList,
  PRESENT: MdCoPresent,
  CLASSROOMS: SiGoogleclassroom,
  MARK_STU_ATTENDANCE: FaCheckCircle,
  CHECK_ATTENDANCE: FaChalkboardTeacher,
  QUIZ: MdOutlineQuiz,
  ISSUES: AiOutlineIssuesClose,
  GENERATE_ISSUES: FaExclamationTriangle,
  BOX: FaBoxOpen,
  WELCOME: SiWelcometothejungle,
  SEARCH: FaSearch,
  ADD: FaPlus,
  BOOK: SiBookstack,

  //@mui-material-icons
  STUDENT: PeopleIcon,
  TEACHER: SchoolIcon,
};
