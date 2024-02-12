import type { LegTypes } from "@/widgets/exercises";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ExerciseResults {
  excercise_id: string;
  results: { leg: LegTypes; result: number[]; set: number }[];
}

const initialState: ExerciseResults = {
  excercise_id: "",
  results: []
};

export const exerciseResultsSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setExerciseId: (
      state,
      action: PayloadAction<{ id: string; both?: boolean }>
    ) => {
      const { id, both } = action.payload;
      state.excercise_id = id;
      if (!both) {
        state.results = [
          { leg: "left", result: [], set: 1 },
          { leg: "right", result: [], set: 1 }
        ];
      } else {
        state.results = [{ leg: "both", result: [], set: 1 }];
      }
    },
    setSet: (state, action: PayloadAction<LegTypes>) => {
      const leg = action.payload;
      const existLeg = state.results.find((item) => item.leg === leg);
      existLeg!.set += 1;
      existLeg!.result = [];
    },
    addResult: (
      state,
      action: PayloadAction<{ leg: LegTypes; result: number }>
    ) => {
      const { leg, result } = action.payload;
      const existLeg = state.results.find((item) => item.leg === leg);
      existLeg?.result.push(result);
    }
  }
});

export const { actions: exerciseActions, reducer: exerciseReducer } =
  exerciseResultsSlice;
