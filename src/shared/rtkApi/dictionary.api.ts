import { api } from ".";
import type { CitiesModel } from "../api/models";
import type { ResponseModel } from "./models/dictionary";

interface DiagnosesModel {
  diagnosis_id: string;
  diagnosis_code: string;
  diagnosis_name: string;
}

const dictionaryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCitiesData: build.query<CitiesModel, string>({
      query: () => ({
        url: "/route_functions/cities"
      })
    }),
    getDiagnosesData: build.query({
      query: () => ({
        url: "/route_functions/diagnoses"
      }),
      transformResponse: ({ data }: ResponseModel<DiagnosesModel[]>) => {
        return data;
      }
    })
  })
});

export const { useGetCitiesDataQuery, useGetDiagnosesDataQuery } =
  dictionaryApi;
