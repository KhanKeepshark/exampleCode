import type { LegTypes } from "@/widgets/exercises";
import { api } from ".";

interface createUserResultModel {
  exercise_id: string;
  leg: LegTypes;
  set: number;
  results: number[];
}

const exerciseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExercisesData: build.query({
      query: () => ({
        url: "/route_functions/exercises/all"
      }),
      transformResponse: ({ data }) => {
        return data;
      }
    }),
    getExerciseById: build.query({
      query: (id: string) => ({
        url: `/route_functions/exercises/${id}`
      }),
      transformResponse: ({ data }) => {
        return data[0];
      }
    }),
    createUserResult: build.mutation({
      query: (data: createUserResultModel) => ({
        url: "/route_functions/insRes",
        method: "POST",
        body: data
      })
    })
  })
});

export const {
  useGetExercisesDataQuery,
  useGetExerciseByIdQuery,
  useCreateUserResultMutation
} = exerciseApi;
