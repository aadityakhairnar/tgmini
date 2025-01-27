import React from "react"
import { motion } from "framer-motion"

const tabVariants = {
  inactive: {
    color: "#000000",
    fontWeight: "normal",
  },
  active: {
    color: "#4C1D95",
    fontWeight: "bold",
    transition: { duration: 0.3 },
  },
}

const indicatorVariants = {
  inactive: {
    width: 0,
    opacity: 0,
  },
  active: {
    width: "100%",
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
}

function TaskTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "daily", label: "Daily" },
    { id: "once", label: "One-time" },
  ]

  return (
    <div className="flex space-x-6 shadow min-w-full pl-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative pb-1"
          variants={tabVariants}
          initial="inactive"
          animate={activeTab === tab.id ? "active" : "inactive"}
        >
          {tab.label}
          <motion.div
            className="absolute left-0 right-0 bottom-0 h-[3px] bg-purple-900"
            variants={indicatorVariants}
            initial="inactive"
            animate={activeTab === tab.id ? "active" : "inactive"}
          />
        </motion.button>
      ))}
    </div>
  )
}

export default TaskTabs

