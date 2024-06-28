import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/sessionTypes";

export interface ISessionState {
  userData: User | null;
}

// // for testing
// const user1: User = {
//   userId: "user1",
//   firstName: "John",
//   lastName: "Doe",
//   email: "john.doe@gmail.com",
//   tier: "Free",
//   tokens: 10,
//   activePlanId: "6633eb1735c48e147505a518",
// };

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
