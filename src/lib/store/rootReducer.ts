import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./authSlice";
import { inputReducer } from "./inputSlice";
import { planReducer } from "./planSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

const inputPersistConfig = {
  key: "input",
  storage: storage,
  whitelist: ["goal", "numWeeks", "startDate"],
};

const planPersistConfig = {
  key: "plan",
  storage: storage,
  whitelist: ["activePlan"],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  input: persistReducer(inputPersistConfig, inputReducer),
  plan: persistReducer(planPersistConfig, planReducer),
});

export default rootReducer;
