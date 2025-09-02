import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation, type Location } from "react-router-dom"

import { adminLinks } from "../../utils/links";

import { Bell, Menu, X,  ChevronDown, ChevronUp } from "lucide-react"

function MobileNavbar() {
   const location: Location = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown (label: string) {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const sidebar = useRef<HTMLDivElement | null>(null);

  useEffect(function() {
    function handleClickOutside(event: MouseEvent) {
      if (sidebar.current && !sidebar.current.contains(event.target as Node)) {
        setOpenSidebar(false)
      }
    };

    if (openSidebar) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [openSidebar])

  return(
    <>
      <nav>
        <div className="flex items-center justify-between lg:hidden px-4">
          <div className="flex items-center">
            <Menu className="me-4 cursor-pointer" onClick={() => setOpenSidebar((open) => !open)}/>
            <NavLink to="/chef/notifications" className="text-[#678096]">
              <Bell/>
            </NavLink>
          </div>
          <div>
            <NavLink to="/">
              <img src="" alt="mobile-cook" />
            </NavLink>
          </div>
        </div>
        {openSidebar && (
          <div className="fixed inset-0 z-10">
            <div className="z-10 w-full sm:max-w-[300px] shadow-2xl px-4 bg-white pt-2 h-full min-h-screen" ref={sidebar}>
              <div className="flex items-center justify-between ">
                <button onClick={() => setOpenSidebar((open) => !open)}
                  className="cursor-pointer"  
                >
                  <X />
                </button>
                <NavLink to="/" onClick={() => setOpenSidebar((open) => !open)}>
                  <img src="" alt="mobile-cook" />
                </NavLink>
              </div>
              <div className="w-full sm:max-w-[300px] h-full">
                <div>
                  <ul className="z-10 pt-4">
                    {adminLinks.map((item, index) => {
                      const isActive = location.pathname.startsWith(item.to)
                      const hasSubLinks = item.subLinks && item.subLinks.length > 0;
                      return ( 
                        <li key={index} className="mb-8 relative">
                          <div className={`flex items-center relative ${isActive ? "text-primary" : "text-[#678096]"}`}>
                            {isActive && (
                              <img
                                src=""
                                alt="icon"
                                className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-13"
                              />
                            )}
                            <NavLink 
                              to={item.to} 
                              className="flex items-center w-full"
                              onClick={hasSubLinks ? (e) => { e.preventDefault(); toggleDropdown(item.label); } : undefined}
                            >
                              {<item.icon size={24}/>}
                              <span className="ms-2 font-medium">{item.label}</span>
                            </NavLink>
                            {hasSubLinks && (
                              <span
                                className="cursor-pointer"
                                onClick={() => toggleDropdown(item.label)}
                              >
                                {openDropdown === item.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </span>
                            )}
                          </div>
                          {hasSubLinks && openDropdown === item.label && (
                            <ul className="pl-8 mt-2">
                              {item.subLinks?.map((subLink, index) => (
                                <li key={index} className="mb-2">
                                  <NavLink
                                    to={subLink.to}
                                    className={`block ${location.pathname.startsWith(subLink.to) ? "text-primary" : "text-[#678096]"}`}
                                  >
                                    {subLink.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                    <li>
                      <button className="flex items-center cursor-pointer" onClick={() => setOpenSidebar((open) => !open)}>
                        <img src="" alt="logout" />
                        <span className="ms-2 text-red-600">Log Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
          </div>
        )}
      </nav>
      {/* <Separator className="lg:hidden"/> */}
    </>
  )
}

export default MobileNavbar