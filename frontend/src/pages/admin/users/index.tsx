import { useDeleteUser, useGetAllUsers } from "../../../hooks/user"
import UsersTableSkeleton from "../../../ui/UsersTableSkeleton"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { DeleteUserModal } from "../../../ui"

function Users() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const { users, isPending, isError, error } = useGetAllUsers()
  const { deleteUser, isPending: isDeleting } = useDeleteUser()

  if(isPending) return <div className="lg:ml-64 pt-35 lg:pt-36 px-4"><UsersTableSkeleton/></div>

  if(isError) return <p className="text-gray-700 lg:ml-64 pt-35 lg:pt-36 px-4">{error?.message}</p>
    
  if(!users || users.length === 0) return <div className="lg:ml-64 pt-35 lg:pt-36 px-4"><p className="text-gray-600">No users found</p></div>
  
  const handleOpenModal = (userId: string) => {
    setOpenModal(true)
    setSelectedUserId(userId)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedUserId(null)
  }

  const handleConfirmDelete = () => {
    if(!selectedUserId) return
    deleteUser(selectedUserId, {
      onSuccess: () => {
        handleCloseModal()
      }
    })
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
                <td className="px-6 py-4">
                  <button type="button" onClick={() => handleOpenModal(user._id)}
                    className="p-2 cursor-pointer text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUserId && <DeleteUserModal isOpen={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} isPending={isDeleting}/>}
      </div>
    </main>
  )
}

export default Users