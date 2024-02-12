import type { RouteProps } from "react-router-dom";
import {
  AuthorizationWidget,
  RecoverPasswordWidget,
  RegistrationWidget
} from "@/widgets/auth";
import { Confidential, Useragreement } from "@/pages";

export enum AuthRoutes {
  Registration = "registration",
  Confidential = "confidential",
  Useragreement = "useragreement",
  Authorization = "authorization",
  Recover = "recover"
}

export const RoutePath: Record<AuthRoutes, string> = {
  [AuthRoutes.Registration]: "/registration",
  [AuthRoutes.Confidential]: "/confidential",
  [AuthRoutes.Useragreement]: "/useragreement",
  [AuthRoutes.Authorization]: "/authorization",
  [AuthRoutes.Recover]: "/recoverPassword"
};

export const authRouteConfig: Record<string, RouteProps> = {
  [AuthRoutes.Registration]: {
    path: RoutePath.registration,
    element: <RegistrationWidget />
  },

  [AuthRoutes.Authorization]: {
    path: RoutePath.authorization,
    element: <AuthorizationWidget />
  },

  [AuthRoutes.Confidential]: {
    path: RoutePath.confidential,
    element: <Confidential />
  },

  [AuthRoutes.Useragreement]: {
    path: RoutePath.useragreement,
    element: <Useragreement />
  },

  [AuthRoutes.Recover]: {
    path: RoutePath.recover,
    element: <RecoverPasswordWidget />
  }
};
