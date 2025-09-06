import { useState } from "react"
import { NavLink, useLocation, type Location } from "react-router-dom"

import { adminLinks } from "../../utils/links";

import { Gem, Menu, X } from "lucide-react"

import { LogoutModal } from "../../ui";

function MobileNavbar() {
  const location: Location = useLocation()

  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  return(
    <nav className="fixed top-0 left-0 right-0 bg-white max-w-full shadow-xl pr-8 pl-6 py-9 lg:hidden lg:shadow 
      lg:pr-0 lg:pl-0 lg:py-0"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-black">
          <Gem size={28} />
          <h1 className="font-bold text-[1.1rem] sm:text-[1.2rem] logo">StyleHive</h1>
        </div>
        <div>
          <Menu size={28} className="cursor-pointer" onClick={() => setOpenSidebar(true)}/>
        </div>
      </div>
      {openSidebar && (
        <div className="fixed inset-0 flex justify-end z-10">
          <div className="z-10 w-full max-w-[300px] shadow-2xl px-8 bg-black pt-2 h-full min-h-screen">
            <div className="flex mb-5 mt-6  items-center justify-between">
              <button onClick={() => setOpenSidebar(false)}
                className="cursor-pointer text-white"  
              >
                <X size={30}/>
              </button>
            </div>
            <div className="w-full sm:max-w-[300px] h-full">
              <div>
                <ul className="z-10 pt-4">
                  {adminLinks.map((item, index) => {
                    const isActive = location.pathname.startsWith(item.to)
                    return ( 
                      <li key={index} className="mb-8 relative">
                        <div className={`flex items-center relative ${isActive ? "text-white" : "text-gray-400"}`}>
                          <NavLink 
                            to={item.to} 
                            className="flex items-center w-full"
                            onClick={() => setOpenSidebar(false)}
                          >
                            {<item.icon size={24}/>}
                            <span className="ms-2 font-medium">{item.label}</span>
                          </NavLink>
                        </div>
                      </li>
                    )
                  })}
                  <li>
                    <div className="pt-16">
                      <button className="bg-red-600 text-center text-white px-10 py-2 cursor-pointer flex items-center
                        font-bold rounded-sm" onClick={() => { setOpenModal(true); setOpenSidebar(false) }}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      )}
      <LogoutModal isOpen={openModal} onClose={() => setOpenModal(false)}/>
    </nav>
  )
}

export default MobileNavbar