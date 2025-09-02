import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <>
      <Sidebar/>
      <div className="w-full">
        <Navbar />
      </div>
      <Outlet/>
    </>
  )
}

export default AdminLayout