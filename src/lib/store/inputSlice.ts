import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInputState {
  goal: string,
  numWeeks: number,
  startDate: string,
}

const initialState: IInputState = {
  goal: "",
  numWeeks: 0,
  startDate: "",
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
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    }
  },
});

export const { setGoal, setNumWeeks, setStartDate } = inputSlice.actions;
export const inputReducer = inputSlice.reducer;
