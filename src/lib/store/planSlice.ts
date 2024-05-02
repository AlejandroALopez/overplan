import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../types/planTypes";

export interface IPlanState {
  activePlan: Plan | null,
}

const initialState: IPlanState = {
  activePlan: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<Plan | null>) => {
      state.activePlan = action.payload;
    },
  },
});

export const { setPlan } = planSlice.actions;
export const planReducer = planSlice.reducer;
