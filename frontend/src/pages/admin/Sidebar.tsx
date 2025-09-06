import { useState } from "react";
import { NavLink, useLocation, type Location } from "react-router-dom";

import { adminLinks } from "../../utils/links";
import { LogoutModal } from "../../ui";

function Sidebar() {
  const location: Location = useLocation()
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <aside className="w-64 pt-2 z-10 px-8 hidden lg:flex lg:flex-col fixed h-full bg-black">
      <div className="flex-grow">
        <div className="mb-9 mt-6">
          <h1 className="text-white font-extrabold text-[1.6rem]">Admin Panel</h1>
        </div>
        <ul className="mt-4">
          {adminLinks.map((item, index) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <li key={index} className="mb-8 relative">
                <div className={`flex items-center relative ${isActive ? "text-white font-bold" : "text-gray-400"}`}>
                  <NavLink 
                    to={item.to} 
                    className="flex items-center w-full"
                  >
                    {<item.icon size={24}/>}
                    <span className="ms-2 font-medium">{item.label}</span>
                  </NavLink>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pb-16">
        <button className="bg-red-600 text-center text-white px-10 py-2 cursor-pointer flex items-center
          font-bold rounded-sm" onClick={() => setOpenModal(true)}
        >
          Logout
        </button>
      </div>
      <LogoutModal isOpen={openModal} onClose={() => setOpenModal(false)}/>
    </aside>
  )
}

export default Sidebar;