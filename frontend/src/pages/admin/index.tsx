import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <>
      <Sidebar/>
      <Navbar />
      <Outlet/>
    </>
  )
}

export default AdminLayout