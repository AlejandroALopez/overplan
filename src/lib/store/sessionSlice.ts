import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/sessionTypes";

export interface ISessionState {
  user: User;
  userData: any;
}

// for testing
const user1: User = {
  _id: "user1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  tier: "Free",
  activePlanId: "6633eb1735c48e147505a518",
};

const initialState: ISessionState = {
  user: user1,
  userData: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser, setUserData } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
