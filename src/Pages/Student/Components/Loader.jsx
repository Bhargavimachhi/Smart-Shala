import React from "react";
import { motion } from "framer-motion";

const GenerateLoader = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-full h-full mt-10">
      <motion.div
        className="flex flex-col items-center justify-center gap-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
        <h2 className="text-xl font-semibold">{text}</h2>
      </motion.div>
    </div>
  );
};

export default GenerateLoader;
