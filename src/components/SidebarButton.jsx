import React from 'react'
import { Link } from 'react-router-dom'

const SidebarButton = ({ children, page,activePage,route }) => {
  return (
   <>
        <Link
            to={route}
            className={`flex items-center p-2 rounded-lg  lg:hover:bg-blue-100 group lg:hover:text-blue-600 text-gray-500 text-sm  `}
            >
            {children}
        </Link>
   </>
  )
}

export default SidebarButton