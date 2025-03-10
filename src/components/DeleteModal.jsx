import React from 'react'

const DeleteModal = ({showDeleteModal,handleModalClose,handleDelete}) => {
  return (
    <>
    {showDeleteModal ? (<>
        <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div class="relative px-4 min-h-screen lg:flex lg:items-center lg:justify-center">
            <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div class="bg-white rounded-lg lg:max-w-md lg:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 lg:relative shadow-lg">
              <div class="lg:flex items-center">
                <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i class="bx bx-error text-3xl">
                    &#9888;
                  </i>
                </div>
                <div class="mt-4 lg:mt-0 lg:ml-6 text-center lg:text-left">
                  <p class="font-bold">Warning!</p>
                  <p class="text-sm text-gray-700 mt-1">You will lose all of your data by deleting this. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div class="text-center lg:text-right mt-4 lg:flex lg:justify-end">
                <button onClick={handleDelete} id="confirm-delete-btn" class="block w-full lg:inline-block lg:w-auto px-4 py-3 lg:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm lg:ml-2 lg:order-2">
                  Delete
                </button>
                <button onClick={handleModalClose} id="confirm-cancel-btn" class="block w-full lg:inline-block lg:w-auto px-4 py-3 lg:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 lg:mt-0 lg:order-1">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </>) : (<></>)}
    
    </>
  )
}

export default DeleteModal