import ReactDOM from "react-dom";
import ButtonSpinner from "./ButtonSpinner";
import { motion, AnimatePresence } from "framer-motion";

type DeleteProductModalProps = {
  isOpen: boolean
  onClose: () => void,
  onConfirm: () => void,
  isPending: boolean
}

function DeleteUserModal({ isOpen, onClose, onConfirm, isPending }: DeleteProductModalProps) {

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="bg-white p-6 pb-7 rounded-lg w-full max-w-[400px]"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="text-[1.2rem] sm:text-[1.3rem] lg:text-[1.5rem] font-semibold">
              Confirm Delete
            </h2>
            <p className="mt-2 font-normal">Are you sure you want to delete this product?</p>
            <div className="flex items-center font-semibold justify-between mt-5">
              <button
                onClick={onConfirm}
                disabled={isPending}
                className="bg-red-500 text-white px-8 py-1 rounded-sm cursor-pointer"
              >
                {isPending ? <ButtonSpinner /> : "Yes"}
              </button>
              <button className="bg-gray-500 text-white px-5 py-1 rounded-sm cursor-pointer" onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default DeleteUserModal