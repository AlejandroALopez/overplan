import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IModalState {
  isSingleTaskOpen: boolean;
  isLoading: boolean;
  isConfirmOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
}

const initialState: IModalState = {
  isSingleTaskOpen: false,
  isLoading: false,
  isConfirmOpen: false,
  message: "",
  onConfirm: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsSingleTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.isSingleTaskOpen = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsConfirmOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOpen = action.payload;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setOnConfirm(state, action: PayloadAction<(() => void) | null>) {
      state.onConfirm = action.payload;
    },
    resetModal(state) {
      state.isConfirmOpen = false;
      state.message = "";
      state.onConfirm = null;
    },
  },
});

export const {
  setIsSingleTaskOpen,
  setIsConfirmOpen,
  setIsLoading,
  setMessage,
  setOnConfirm,
  resetModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
