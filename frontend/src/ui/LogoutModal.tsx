import ReactDOM from "react-dom";
import { useLogout } from "../hooks/auth";
import ButtonSpinner from "./ButtonSpinner";

type LogoutModalProps = {
  isOpen: boolean
  onClose: () => void
}

function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { logoutUser, isPending } = useLogout()

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white p-6 pb-7 rounded-lg w-full max-w-[400px]">
        <h2 className="text-[1.2rem] sm:text-[1.3rem] lg:text-[1.5rem] font-semibold">
          Confirm Logout
        </h2>
        <p className="mt-2 font-normal">Are you sure you want to logout?</p>
        <div className="flex items-center font-semibold justify-between mt-5">
          <button
            onClick={() => logoutUser()}
            disabled={isPending}
            className="bg-red-500 text-white px-8 py-1 rounded-sm cursor-pointer"
          >
            {isPending ? <ButtonSpinner /> : "Yes"}
          </button>
          <button className="bg-gray-500 text-white px-5 py-1 rounded-sm cursor-pointer" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LogoutModal;