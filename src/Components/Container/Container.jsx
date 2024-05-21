import React from "react";
import "./Container.css";
import { motion } from "framer-motion";

export default function Container({ title, children }) {
  return (
    <motion.div
      className="cont"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cont-title">{title}</div>
      {children}
    </motion.div>
  );
}
