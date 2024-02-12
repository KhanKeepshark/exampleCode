import { api } from ".";
import type { ExerciseResultsModel } from "./models/exercise";

const patientApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPatientData: build.query({
      query: () => ({
        url: "/route_functions/patient"
      }),
      providesTags: [{ type: "Patient" }],
      transformResponse: ({ data }) => {
        return data;
      }
    }),
    updatePatientData: build.mutation({
      query: (data) => ({
        url: "/route_functions/updatepatient",
        method: "POST",
        body: data
      }),
      invalidatesTags: [{ type: "Patient" }]
    }),
    getPatientResults: build.query({
      query: (data?: { year: string; month: string }) => ({
        url: "/route_functions/results_patient",
        params: data
      }),
      transformResponse: (data: { results: ExerciseResultsModel[] }) => {
        return data.results;
      }
    })
  })
});

export const {
  useGetPatientDataQuery,
  useUpdatePatientDataMutation,
  useGetPatientResultsQuery
} = patientApi;
