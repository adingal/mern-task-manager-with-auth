import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    isYesButton: false,
    title: '',
    content: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true
      state.title = action.payload.title
      state.content = action.payload.content
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.isYesButton = false
      state.title = ''
      state.content = ''
    },
    setYesModal: (state) => {
      state.isYesButton = true
    },
  },
})

export const { openModal, closeModal, setYesModal } = modalSlice.actions

export default modalSlice.reducer
