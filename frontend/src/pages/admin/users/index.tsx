import { Link } from "react-router-dom"
import { useGetAllUsers } from "../../../hooks/user"
import UsersTableSkeleton from "../../../ui/UsersTableSkeleton"
import { Eye, Trash2 } from "lucide-react"
import { useState } from "react"

function Users() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { users, isPending } = useGetAllUsers()

  if(isPending) return <div className="lg:ml-64 pt-32 px-6 lg:px-8"><UsersTableSkeleton/></div>
    
  if(!users || users.length === 0) {
    return (
      <div className="lg:ml-64 pt-32 px-6 lg:px-8">
        <p className="text-gray-600">No users found</p>
      </div>
    )
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <main className="lg:ml-64 pt-40 lg:pt-36 px-4 pb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Users</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.fullName}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-x-3">
                    <button type="button" onClick={handleOpenModal}
                      className="p-2 cursor-pointer rounded-full hover:bg-red-50 text-red-600 hover:text-red-700 transition">
                      <Trash2 size={18} />
                    </button>
                    <Link to={`${user._id}`} className="p-2 rounded-full hover:bg-blue-50 text-black hover:text-black/50 transition">
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Users