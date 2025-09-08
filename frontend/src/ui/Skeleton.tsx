function Skeleton() {
  return (
    <div className="w-full grid grid-cols-12 gap-y-8 sm:gap-x-5">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden
          col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3"
        >
          <div className="w-full h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton