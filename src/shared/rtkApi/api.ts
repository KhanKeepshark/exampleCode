import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken, setAuthToken } from "../utils/api";

const API_URL = "https://inventivo.kz/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { data } = await baseQuery("refresh", api, extraOptions);
    if (data) {
      // store or update the new token
      //@ts-ignore
      setAuthToken(data.userData.accessToken);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "authApi",
  tagTypes: ["Patient", "Doctor", "PatientDiagnose"],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    refreshAuthToken: build.query({
      query: () => ({
        url: "refresh",
        credentials: "include",
        method: "GET"
      }),
      transformResponse: ({ userData }) => {
        return userData.user;
      }
    })
  })
});

export const { useRefreshAuthTokenQuery } = api;
