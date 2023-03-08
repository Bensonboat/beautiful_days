import { configureStore } from "@reduxjs/toolkit";
import homeSlice, { IHomeState } from "./homeSlice";

export interface IRootState {
  homeSlice: IHomeState;
}

export default configureStore({
  reducer: {
    homeSlice,
  },
});
