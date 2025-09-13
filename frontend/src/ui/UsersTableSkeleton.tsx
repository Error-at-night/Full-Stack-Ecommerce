function UsersTableSkeleton() {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg animate-pulse">
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
          {Array.from({ length: 6 }).map((_, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-6 py-4">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTableSkeleton