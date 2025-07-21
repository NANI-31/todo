// src/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist these slices
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist to avoid warnings
    }),
});

export const persistor = persistStore(store);
