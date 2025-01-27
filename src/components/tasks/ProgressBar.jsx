import React from "react"
import { motion } from "framer-motion"

function ProgressBar({ completed, total }) {
  const percentage = Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-lg drop-shadow-md p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Task Progress</span>
        <span className="text-sm font-medium text-gray-700">{`${completed}/${total}`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-[#C241FF] to-[#5B32FF] h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar

