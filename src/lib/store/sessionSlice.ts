import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISessionState {
  loggedUserId: string;
  activePlanId: string;
}

const initialState: ISessionState = {
  loggedUserId: "",
  activePlanId: "",
};

export const sessionSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLoggedUserId: (state, action: PayloadAction<string>) => {
      state.loggedUserId = action.payload;
    },
    setActivePlanId: (state, action: PayloadAction<string>) => {
      state.activePlanId = action.payload;
    },
  },
});

export const { setLoggedUserId, setActivePlanId } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
