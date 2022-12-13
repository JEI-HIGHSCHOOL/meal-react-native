import {
  configureStore,
  combineReducers,
  useSelector
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import mealSlice from "./slices/mealSlice";
import noticeSlice from "./slices/noticeSlice";

export const store = configureStore({
  reducer: {
    meal: mealSlice,
    notice: noticeSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

export default store;