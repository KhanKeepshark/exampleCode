export interface UserModel {
  userid?: string;
  phoneNum?: string;
  role?: "patient" | "doctor";
}
export interface ResponseUserDataModel {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}

export interface AuthResponseModel {
  status: number;
  message: string;
  userData: ResponseUserDataModel;
}

export interface AuthErrorResponseModel {
  status: number;
  data: {
    message: string;
  };
}

export interface SendCodeResponseModel {
  status: number;
  message: string;
  codeToken: string;
}

export interface FillUserProfileData {
  userid: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  birthdate: string;
  cityid: number;
}
