import React from "react"
import { useLocation, Link } from "react-router-dom"
import { motion } from "framer-motion"

function BottomNav() {
  const location = useLocation()
  const pathname = location.pathname

  const navItems = [
    { path: "/", icon: "task", label: "Tasks" },
    { path: "/leaderboard", icon: "leaderboard", label: "Leaderboard" },
    { path: "/profile", icon: "person", label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 pt-2 bg-white">
      <div className="flex items-center justify-around h-full max-w-screen md:min-w-md mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.path}
          />
        ))}
      </div>
    </nav>
  )
}

function NavItem({ to, icon, label, isActive }) {
  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center space-y-1 ${isActive ? "text-purple-600" : "text-gray-500"}`}
    >
      <motion.div
        className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-0.5 bg-purple-600"
        initial={false}
        animate={{ width: isActive ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
      <i className="material-icons">{getIcon(icon)}</i>
      <motion.span
        className="text-xs"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.span>
    </Link>
  )
}

function getIcon(icon) {
  switch (icon) {
    case "task":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 28 28">
          <path
            fill="currentColor"
            d="M4 5.25A3.25 3.25 0 0 1 7.25 2h13.5A3.25 3.25 0 0 1 24 5.25v12.129q-.181.12-.341.28L22.5 18.818V5.25a1.75 1.75 0 0 0-1.75-1.75H7.25A1.75 1.75 0 0 0 5.5 5.25v17.5c0 .966.784 1.75 1.75 1.75h8.068l1.5 1.5H7.25A3.25 3.25 0 0 1 4 22.75zm6.5 3.5a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m-1.25 6.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m0 5.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M12.75 8a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zM12 14a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 12 14m.75 4.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm13.03 1.28l-6 6a.75.75 0 0 1-1.06 0l-2.998-2.998a.75.75 0 0 1 1.06-1.06l2.468 2.467l5.47-5.47a.75.75 0 1 1 1.06 1.061"
          />
        </svg>
      )
    case "leaderboard":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4 19h4.673v-8H4zm5.673 0h4.654V5H9.673zm5.654 0H20v-6h-4.673zM3 18.384v-6.768q0-.667.475-1.141T4.615 10h4.058V5.616q0-.667.475-1.141T10.288 4h3.424q.666 0 1.14.475t.475 1.14V12h4.058q.666 0 1.14.475t.475 1.14v4.77q0 .666-.475 1.14t-1.14.475H4.615q-.666 0-1.14-.475T3 18.386"
          />
        </svg>
      )
    case "person":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
            <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
          </g>
        </svg>
      )
    default:
      return null
  }
}

export default BottomNav

