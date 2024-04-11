import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInputState {
  goal: string,
  numWeeks: number,
}

const initialState: IInputState = {
  goal: "",
  numWeeks: 0,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    },
    setNumWeeks: (state, action: PayloadAction<number>) => {
      state.numWeeks = action.payload;
    },
  },
});

export const { setGoal, setNumWeeks } = inputSlice.actions;
export const inputReducer = inputSlice.reducer;
