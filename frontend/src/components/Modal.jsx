import { useEffect } from 'react'
import closeCircleIcon from '../assets/closeCircleIcon.svg'

import { useSelector, useDispatch } from 'react-redux'
import { closeModal, setYesModal } from '../store/modal/modalSlice'

function Modal() {
  const dispatch = useDispatch()
  const isModalOpen = useSelector((state) => state.modal.isModalOpen)
  const title = useSelector((state) => state.modal.title)
  const content = useSelector((state) => state.modal.content)

  useEffect(() => {}, [isModalOpen])

  if (!isModalOpen) return

  return (
    <div className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-center bg-[rgba(0,0,0,0.50)]">
      <div className="min-w-[384px] relative flex flex-col space-y-4 p-4 bg-white rounded-md">
        <div>
          <h6 className="text-base md:text-lg lg:text-xl border-b border-gray-300 pb-2 text-gray-600">
            {title !== '' ? title : 'Modal Title'}
          </h6>
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute top-2 right-2"
            type="button"
          >
            <img
              className="w-6 h-6 cursor-pointer"
              src={closeCircleIcon}
              alt="Close"
            />
          </button>
        </div>
        <div className="py-8">
          <p className="text-gray-600">
            {content !== '' ? content : 'Modal content'}
          </p>
        </div>
        <div className="flex flex-row items-center justify-end space-x-4 md:space-x-6 lg:space-x-8 border-t border-gray-300 pt-2">
          <button
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            type="button"
            onClick={() => dispatch(setYesModal())}
          >
            Yes
          </button>
          <button
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
