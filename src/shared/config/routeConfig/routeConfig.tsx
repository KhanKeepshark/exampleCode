import type { RouteProps } from "react-router-dom";

import { AccountPage } from "@/pages/Account";
import { LoginLayout } from "@/shared/layout/LoginLayout";
import {
  ExerciseByIdWidget,
  ExercisesWidget,
  PatientInfoWidget,
  PatientsWidget,
  ResultsWidget,
  SettingsWidget
} from "@/widgets/desktop/accountpages";
import { FillProfileWidget } from "@/widgets/auth";
import { mobileRouteConfig } from "./mobileRoutes/account";

export enum AppRoutes {
  // Account
  Account = "account",
  FillProfile = "fillProfile",
  Exercises = "exercises",
  ExerciseById = "exerciseById",
  Results = "results",
  Patients = "patients",
  PatientInfo = "patientInfo",
  Settings = "settings"
}

export const RoutePath: Record<AppRoutes, string> = {
  // Account
  [AppRoutes.Account]: "/account",
  [AppRoutes.Exercises]: "/exercises",
  [AppRoutes.ExerciseById]: "/exercises/:id",
  [AppRoutes.FillProfile]: "/fillProfile",
  [AppRoutes.Results]: "/results",
  [AppRoutes.Settings]: "/settings",
  [AppRoutes.Patients]: "/patients",
  [AppRoutes.PatientInfo]: "/patients/:id"
};

export const loginRoutes: Record<AppRoutes, RouteProps> = {
  ...mobileRouteConfig,

  // Account
  [AppRoutes.Account]: {
    path: RoutePath.account,
    element: (
      <LoginLayout>
        <AccountPage />
      </LoginLayout>
    )
  },

  [AppRoutes.Exercises]: {
    path: RoutePath.exercises,
    element: (
      <LoginLayout>
        <ExercisesWidget />
      </LoginLayout>
    )
  },

  [AppRoutes.ExerciseById]: {
    path: RoutePath.exerciseById,
    element: (
      <LoginLayout>
        <ExerciseByIdWidget />
      </LoginLayout>
    )
  },

  [AppRoutes.FillProfile]: {
    path: RoutePath.fillProfile,
    element: <FillProfileWidget />
  },

  [AppRoutes.Settings]: {
    path: RoutePath.settings,
    element: (
      <LoginLayout>
        <SettingsWidget />
      </LoginLayout>
    )
  },

  [AppRoutes.Patients]: {
    path: RoutePath.patients,
    element: (
      <LoginLayout>
        <PatientsWidget />
      </LoginLayout>
    )
  },

  [AppRoutes.PatientInfo]: {
    path: RoutePath.patientInfo,
    element: (
      <LoginLayout>
        <PatientInfoWidget />
      </LoginLayout>
    )
  },

  [AppRoutes.Results]: {
    path: RoutePath.results,
    element: (
      <LoginLayout>
        <ResultsWidget />
      </LoginLayout>
    )
  }
};
