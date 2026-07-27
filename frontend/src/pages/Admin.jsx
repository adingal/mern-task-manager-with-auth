import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Container from '../components/Container'
import {
  fetchUsers,
  addUserAsync,
  editUserAsync,
  deleteUserAsync,
} from '../store/users/usersSlice'
import { openModal, closeModal } from '../store/modal/modalSlice'

function Admin() {
  const dispatch = useDispatch()
  const { data: users, error } = useSelector((state) => state.users)
  const isYesButton = useSelector((state) => state.modal.isYesButton)
  const [deleteUserID, setDeleteUserID] = useState(null)

  const onDeleteClick = (id) => {
    dispatch(
      openModal({
        title: 'Delete User',
        content: 'Are you sure you want to delete this user?',
      }),
    )
    setDeleteUserID(id)
  }

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    const onYesModalClick = async () => {
      await dispatch(deleteUserAsync(deleteUserID))
      await dispatch(closeModal())
    }

    if (isYesButton && deleteUserID !== null) {
      onYesModalClick()
    }
  }, [dispatch, isYesButton, deleteUserID])

  return (
    <main>
      <Header />

      <section>
        <div className="max-w-6xl mx-auto p-4">
          <div className="overflow-x-auto px-4 md:px-8 mt-6">
            {users ? (
              <table className="w-full max-w-7xl mx-auto">
                <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                  <tr>
                    <th scope="col" className="pl-0 px-3 py-3.5">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5">
                      Active
                    </th>
                    <th scope="col" className="pr-0 px-3 py-3.5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="pl-0 px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-3 py-4 text-slate-500">{user.email}</td>
                      <td className="px-3 py-4 text-slate-500">{user.role}</td>
                      <td className="px-3 py-4 text-slate-500">Admin</td>
                      <td className="pr-0 px-3 py-4 flex gap-3">
                        <button
                          type="button"
                          className="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                          aria-label="Edit John Doe"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteClick(user._id)}
                          type="button"
                          className="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                          aria-label="Delete John Doe"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-base text-gray-600 text-center">
                No users found.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin
