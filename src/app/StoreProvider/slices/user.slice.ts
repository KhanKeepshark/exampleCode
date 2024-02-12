import type { UserModel } from "@/shared/rtkApi/models";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserProfile {
  role?: "patient" | "doctor";
  user_id?: string;
}

const initialState: UserProfile = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserModel>) => {
      const { role, userid } = action.payload;
      state.role = role;
      state.user_id = userid;
    }
  }
});

export const { actions: userActions, reducer: userReducer } = userSlice;
