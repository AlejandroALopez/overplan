import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../types/planTypes";

export interface IModalState {
  isLoading: boolean;

  // Confirmation Modal data (multiple uses)
  isConfirmOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;

  // Single Task Modal data
  isSingleTaskOpen: boolean;
  selectedTask: ITask | null;

  // Create Task Modal data
  isCreateTaskOpen: boolean;

  // Plan Completed Modal data
  isPlanCompletedOpen: boolean;
  completedPlan: { goal: string; weeks: number };

  // No Tokens Modal data
  isNoTokensOpen: boolean;
}

const initialState: IModalState = {
  isSingleTaskOpen: false,
  isLoading: false,
  isConfirmOpen: false,
  isCreateTaskOpen: false,
  isPlanCompletedOpen: false,
  isNoTokensOpen: false,
  message: "",
  completedPlan: { goal: "", weeks: 1 },
  onConfirm: null,
  selectedTask: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsSingleTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.isSingleTaskOpen = action.payload;
    },
    setIsCreateTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateTaskOpen = action.payload;
    },
    setSelectedTask: (state, action: PayloadAction<ITask | null>) => {
      state.selectedTask = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsConfirmOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOpen = action.payload;
    },
    setIsPlanCompletedOpen: (state, action: PayloadAction<boolean>) => {
      state.isPlanCompletedOpen = action.payload;
    },
    setIsNoTokensOpen: (state, action: PayloadAction<boolean>) => {
      state.isNoTokensOpen = action.payload;
    },
    setCompletedPlan(state, action: PayloadAction<{goal: string, weeks: number}>) {
      state.completedPlan = action.payload;
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
  setIsCreateTaskOpen,
  setIsPlanCompletedOpen,
  setIsNoTokensOpen,
  setSelectedTask,
  setCompletedPlan,
  setMessage,
  setOnConfirm,
  resetConfirmModal,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
