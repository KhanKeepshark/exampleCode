import { api } from ".";
import type { ResponseModel } from "./models/dictionary";
import type { ExerciseResultsModel } from "./models/exercise";

interface DoctorPatientsModel {
  PatientID: string;
  Surname: string;
  Name: string;
  phone: string;
  DiagnosisID: string;
  ICDCode: string;
  Description: string;
}

interface PatientResultsResponseModel {
  fullname: string;
  diagnosis: string;
  surgery: string;
  results: ExerciseResultsModel[];
}

const doctorApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDoctorData: build.query({
      query: () => ({
        url: "/route_functions/doctor"
      }),
      providesTags: [{ type: "Doctor" }],
      transformResponse: ({ data }) => {
        return data;
      }
    }),
    getDoctorPatients: build.query({
      query: () => ({
        url: "/route_functions/doctorpatient"
      }),
      transformResponse: ({ data }: ResponseModel<DoctorPatientsModel[]>) => {
        return data;
      }
    }),
    getDoctorPatientResults: build.query({
      query: ({ patient_id, year, month }) => ({
        url: `/route_functions/results_doctor/${patient_id}`,
        params: { year, month }
      }),
      providesTags: [{ type: "PatientDiagnose" }],
      transformResponse: (data: PatientResultsResponseModel) => {
        return data;
      }
    }),
    updateDoctorData: build.mutation({
      query: (data) => ({
        url: "/route_functions/updatedoctor",
        method: "POST",
        body: data
      }),
      invalidatesTags: [{ type: "Doctor" }]
    }),
    updatePatientDiagnose: build.mutation({
      query: (data: {
        patient_id: string;
        diagnosis_id: string;
        surgery: string;
      }) => ({
        url: "/route_functions/updatediagnosis",
        method: "POST",
        body: data
      }),
      invalidatesTags: [{ type: "PatientDiagnose" }]
    })
  })
});

export const {
  useGetDoctorDataQuery,
  useUpdateDoctorDataMutation,
  useGetDoctorPatientsQuery,
  useGetDoctorPatientResultsQuery,
  useUpdatePatientDiagnoseMutation
} = doctorApi;
