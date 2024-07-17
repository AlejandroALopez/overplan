import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Plan } from "../types/planTypes";

export interface IPlanState {
  activePlan: Plan | null,
  numTasks: number; // number of tasks in active plan
  metricsPlan: Plan | null, // plan selected for Metrics page
}

const initialState: IPlanState = {
  activePlan: null,
  numTasks: 1,
  metricsPlan: null,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setActivePlan: (state, action: PayloadAction<Plan | null>) => {
      state.activePlan = action.payload;
    },
    setNumTasks: (state, action: PayloadAction<number>) => {
      state.numTasks = action.payload;
    },
    setMetricsPlan: (state, action: PayloadAction<Plan | null>) => {
      state.metricsPlan = action.payload;
    },
  },
});

export const { setActivePlan, setMetricsPlan, setNumTasks } = planSlice.actions;
export const planReducer = planSlice.reducer;
