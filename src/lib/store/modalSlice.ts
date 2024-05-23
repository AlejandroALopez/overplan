import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/planTypes";

export interface IModalState {
  isLoading: boolean;

  // Confirmation Modal data
  isConfirmOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;

  // Single Task Modal data
  isSingleTaskOpen: boolean;
  selectedTask: Task | null;
}

const initialState: IModalState = {
  isSingleTaskOpen: false,
  isLoading: false,
  isConfirmOpen: false,
  message: "",
  onConfirm: null,
  selectedTask: null,
//   selectedTask: {
//     _id: "6649277f5f941de0c6ffba47",
//     title: "Research basic cooking techniques",
//     description: "Watch videos and read articles about basic cooking techniques like chopping, sautéing, and baking",
//     // planId: "664927785f941de0c6ffba46",
//     week: 1,
//     status: "Backlog",
//     completionDate: null,
// },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsSingleTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.isSingleTaskOpen = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
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
    resetConfirmModal(state) {
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
  setSelectedTask,
  setMessage,
  setOnConfirm,
  resetConfirmModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
