import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/sessionTypes";

export interface ISessionState {
  userData: User | null;
}

const initialState: ISessionState = {
  userData: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
