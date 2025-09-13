import { useDeleteUser, useGetAllUsers } from "../../../hooks/user"
import UsersTableSkeleton from "../../../ui/UsersTableSkeleton"
import { Search, Trash2 } from "lucide-react"
import { useState } from "react"
import { DeleteUserModal } from "../../../ui"
import Pagination from "../../../ui/Pagination"
import { useDebounce } from "use-debounce"
import { useSearchParams } from "react-router-dom"

function Users() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [debouncedSearch] = useDebounce(search, 800)

  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = 50

  const { data, isPending, isError, error } = useGetAllUsers(page, limit, debouncedSearch)
  const { deleteUser, isPending: isDeleting } = useDeleteUser()

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setSearchParams({ page: "1", limit: String(limit), search: value }) 
  }
  
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
    <main className="lg:ml-64 pt-40 lg:pt-42 px-4 pb-8">
      <div className="relative w-full md:max-w-[500px] mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input type="text" value={search} onChange={handleSearchChange} placeholder="Search users..."
          className="border px-3 py-2 rounded-md w-full border-[#DAE1E7]"
        />
      </div>
      <div>
        {isPending && <UsersTableSkeleton />}
        {isError && <p className="text-gray-700">{error?.message}</p>}
        {!isPending && !isError && (
          <>
            {data?.users.length === 0 ? (
              <p className="text-gray-600">No user found</p>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-700 overflow-x-auto bg-white shadow-md rounded-tr-lg rounded-tl-lg">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-[0.89rem] sm:text-[1rem]">Name</th>
                    <th className="px-6 py-3 text-[0.89rem] sm:text-[1rem]">Email</th>
                    <th className="px-6 py-3 text-[0.89rem] sm:text-[1rem]">Role</th>
                    <th className="px-6 py-3 text-[0.89rem] sm:text-[1rem]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users.map((user, index) => (
                    <tr key={user._id}className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">{user.fullName}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 capitalize">{user.role}</td>
                      <td className="px-6 py-4">
                        <button type="button" onClick={() => handleOpenModal(user._id)}
                          className="p-2 cursor-pointer text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        {selectedUserId && <DeleteUserModal isOpen={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} isPending={isDeleting}/>}
        <Pagination page={data?.page || page} limit={data?.limit || limit} total={data?.total || 0} onPageChange={handlePageChange}/>
      </div>
    </main>
  )
}

export default Users