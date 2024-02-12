import { api } from ".";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fillUserProfile: build.mutation({
      query: (data) => ({
        body: data,
        url: "/route_functions/fillprofile",
        method: "POST"
      }),
      invalidatesTags: [{ type: "Patient" }, { type: "Doctor" }]
    })
  })
});

export const { useFillUserProfileMutation } = userApi;
