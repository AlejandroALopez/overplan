import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IModalState {
  isSingleTaskOpen: boolean;
}

const initialState: IModalState = {
  isSingleTaskOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsSingleTaskOpen: (state, action: PayloadAction<boolean>) => {
      state.isSingleTaskOpen = action.payload;
    },
  },
});

export const { setIsSingleTaskOpen } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
