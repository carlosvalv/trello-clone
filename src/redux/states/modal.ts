import { createSlice } from "@reduxjs/toolkit";
import { Modal } from "../../types/Modal";
import { ModalTypes } from "../../enums/Modal";

const initialState: Modal = { id: "", type: ModalTypes.NOT_DEFINED };

export const modalsSlice = createSlice({
  name: "modals",
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      return { ...action.payload };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
