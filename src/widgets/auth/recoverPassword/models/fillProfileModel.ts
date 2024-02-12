export interface FillProfileData {
  name: string;
  surname: string;
  phoneNum: string;
  email?: string;
  birthDate: string;
  city: string;
}

export interface StepModel {
  next?: (data?: string) => void;
  back?: () => void;
}
