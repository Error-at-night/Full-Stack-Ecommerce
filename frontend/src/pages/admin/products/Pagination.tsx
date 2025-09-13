import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  page: number,
  limit: number,
  total: number,
  onPageChange: (newPage: number) => void
}

function Pagination({ page, limit, total, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
        className="flex items-center ps-3 pe-6 py-1 rounded-md border border-gray-300 disabled:opacity-50 
          disabled:cursor-not-allowed hover:bg-black hover:text-white cursor-pointer"
      >
        <ChevronLeft size={21} />
        <span className="mt-1">Prev</span>
      </button>
      <span className="px-4 py-1 text-sm font-medium text-gray-700">Page {page} of {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        className="flex items-center pe-3 ps-6 py-1 rounded-md border cursor-pointer border-gray-300 
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white"
      >
        <span className="mt-1">Next</span>
        <ChevronRight size={21} />
      </button>
    </div>
  )
}

export default Pagination