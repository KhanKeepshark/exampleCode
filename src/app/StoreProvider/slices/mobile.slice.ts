import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = window.screen.width < 640;

export const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {}
});

export const { reducer: mobileReducer } = mobileSlice;
