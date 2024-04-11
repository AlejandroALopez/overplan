import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./authSlice";
import { inputReducer } from "./inputSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

const inputPersistConfig = {
  key: "input",
  storage: storage,
  whitelist: ["goal"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  input: persistReducer(inputPersistConfig, inputReducer),
});

export default rootReducer;
