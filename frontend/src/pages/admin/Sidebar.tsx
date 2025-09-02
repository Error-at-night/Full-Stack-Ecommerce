import { useState } from "react";
import { NavLink, useLocation, type Location } from "react-router-dom";

import { adminLinks } from "../../utils/links";

import { ChevronDown, ChevronUp } from "lucide-react";

function Sidebar() {
  const location: Location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown (label: string) {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="w-64 pt-2 px-6 hidden lg:flex lg:flex-col fixed h-full bg-white border border-r-2">
      <div className="flex-grow">
        <div>
          <NavLink to="/">
            <img src="" alt="mobile-cook" />
          </NavLink>
        </div>
        <ul className="mt-4">
          {adminLinks.map((item, index) => {
            const isActive = location.pathname.startsWith(item.to);
            const hasSubLinks = item.subLinks && item.subLinks.length > 0;
            return (
              <li key={index} className="mb-8 relative">
                <div className={`flex items-center relative ${isActive ? "text-primary" : "text-[#678096]"}`}>
                  {isActive && (
                    <img
                      src=""
                      alt="icon"
                      className="absolute -left-6 top-1/2 transform -translate-y-1/2 h-13"
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
                      className="ml-auto cursor-pointer"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {openDropdown === item.label ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pb-16">
        <button className="text-red-600 flex items-center">
          <img src="" alt="logout" />
          <span className="ms-2">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;