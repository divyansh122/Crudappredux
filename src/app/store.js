import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../slices/userDetails";

export const store = configureStore({
  reducer: {
    fetchapp:userDetails,
  },
});