import { Gem, UserRound } from "lucide-react"

import MobileNavbar from "./MobileNavbar"

import { useShowCurrentUser } from "../../hooks/user"

function Navbar() {
  const { currentUser } = useShowCurrentUser()
  const name = currentUser?.user?.fullName?.split(" ")[0] || ""

  return (
    <>
      <nav className="fixed top-0 left-0 z-5 right-0 max-w-full bg-white lg:shadow-xl lg:ml-64 lg:px-4 lg:py-8 hidden lg:flex lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-2 text-black">
            <Gem size={28} />
            <h1 className="font-bold text-[1.2rem] logo">StyleHive</h1>
          </div>
        </div>
        <div className="flex items-center logo">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <UserRound size={20} className="text-gray-700" />
          </div>
          <div className="ms-3">
            <p className="font-bold text-[1.1rem]">Welcome, {name}</p>
          </div>
        </div>
      </nav>
      <MobileNavbar />
    </>
  )
}

export default Navbar