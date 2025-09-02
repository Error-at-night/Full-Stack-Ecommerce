import { NavLink } from "react-router-dom"

import { Bell, CalendarDays, Search } from "lucide-react"

import MobileNavbar from "./MobileNavbar"

function Navbar() {
  return (
    <>
      <nav className="bg-white lg:px-4 lg:py-3 hidden lg:flex lg:items-center lg:justify-between lg:ml-64">
        <div className="relative">
          <Search className="absolute inset-y-0 left-2 mt-3 text-gray-500" size={20} />
          <input type="search" name="chef" placeholder="Search" className="pl-8 placeholder:mt-5" />
        </div>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center me-3 text-[#678096]">
            <CalendarDays />
            <p className="ms-2">22 Step, 2022</p>
          </div>
          <div className="flex items-center">
            <NavLink to="/chef/notifications" className="text-[#678096]">
              <Bell/>
            </NavLink>
            <div className="flex items-center ms-8">
              <img src="" alt="user" className="h-10 w-10 rounded-full"/>
              <div className="ms-2">
                <p>Abidemi Malik</p>
                <span className="text-[0.9rem] text-green-500">Available</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <Separator/> */}
      <MobileNavbar />
    </>
  )
}

export default Navbar