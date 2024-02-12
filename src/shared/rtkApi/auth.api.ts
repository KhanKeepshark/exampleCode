import { api } from ".";
import { setAuthToken, setRefreshToken } from "../utils/api";
import type {
  AuthResponseModel,
  SendCodeResponseModel,
  UserModel
} from "./models";

const authResponse = ({ userData }: AuthResponseModel) => {
  setAuthToken(userData.accessToken);
  setRefreshToken(userData.refreshToken);
  return userData.user;
};

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authByLogin: build.mutation<UserModel, any>({
      query: (data) => ({
        body: data,
        url: "login",
        method: "POST"
      }),
      transformResponse: authResponse
    }),
    registerDoctor: build.mutation<UserModel, any>({
      query: (data) => ({
        body: data,
        url: "registration/doctor",
        method: "POST"
      }),
      transformResponse: authResponse
    }),
    registerPatient: build.mutation<UserModel, any>({
      query: (data) => ({
        body: data,
        url: "registration/patient",
        method: "POST"
      }),
      transformResponse: authResponse
    }),
    sendRecoverPasswordCode: build.mutation<SendCodeResponseModel, string>({
      query: (phoneNum) => ({
        body: {
          phoneNum
        },
        url: "/resetsms",
        method: "POST"
      }),
      transformResponse: (data: SendCodeResponseModel) => {
        setAuthToken(data.codeToken);
        return data;
      }
    }),
    checkRecoverPasswordCode: build.mutation<SendCodeResponseModel, string>({
      query: (userCode) => ({
        body: {
          userCode
        },
        url: "/validatecode",
        method: "POST"
      }),
      transformResponse: (data: SendCodeResponseModel) => {
        setAuthToken(data.codeToken);
        return data;
      }
    }),
    updateUserPassword: build.mutation<any, string>({
      query: (password) => ({
        body: {
          password
        },
        url: "/updatepass",
        method: "POST"
      })
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        credentials: "include",
        method: "POST"
      })
    })
  }),
  overrideExisting: false
});

export const {
  useAuthByLoginMutation,
  useRegisterDoctorMutation,
  useRegisterPatientMutation,
  useCheckRecoverPasswordCodeMutation,
  useSendRecoverPasswordCodeMutation,
  useUpdateUserPasswordMutation,
  useLogoutMutation
} = authApi;
