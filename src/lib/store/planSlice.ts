import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../types/planTypes";

export interface IPlanState {
  activePlan: Plan | null,
  metricsPlan: Plan | null, // plan selected for Metrics page
}

const initialState: IPlanState = {
  activePlan: null,
  metricsPlan: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setActivePlan: (state, action: PayloadAction<Plan | null>) => {
      console.log("Active Plan now: ", action.payload);
      state.activePlan = action.payload;
    },
    setMetricsPlan: (state, action: PayloadAction<Plan | null>) => {
      state.metricsPlan = action.payload;
    },
  },
});

export const { setActivePlan, setMetricsPlan } = planSlice.actions;
export const planReducer = planSlice.reducer;
