import React from "react";
import '../../css/rawcss.css'
const Header = ({ title }) => {
  return (
    <header className="fontColorBlue textHeadSize w-full p-4 text-white text-center text-lg font-bold border-b-2">
      {title}
    </header>
  );
};

export default Header;
