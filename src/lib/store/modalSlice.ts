import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IModalState {
  isSingleTaskOpen: boolean;
  isLoading: boolean;
}

const initialState: IModalState = {
  isSingleTaskOpen: false,
  isLoading: false,
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
  },
});

export const { setIsSingleTaskOpen, setIsLoading } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
