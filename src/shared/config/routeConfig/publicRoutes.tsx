import { MainPage, NotFoundPage } from "@/pages";
import { MainLayout } from "@/shared/layout";
import { authRouteConfig } from "./routes/authorization";
import type { RouteProps } from "react-router-dom";

export enum PublicRoutes {
  // Main
  MAINPAGE = "mainPage",
  NOT_FOUND = "notFound"
}

export const PublicPath: Record<PublicRoutes, string> = {
  // Main
  [PublicRoutes.MAINPAGE]: "/",
  [PublicRoutes.NOT_FOUND]: "*"
};

export const publicRoutes: Record<PublicRoutes, RouteProps> = {
  // Main
  [PublicRoutes.MAINPAGE]: {
    path: PublicPath.mainPage,
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    )
  },

  [PublicRoutes.NOT_FOUND]: {
    path: PublicPath.notFound,
    element: <NotFoundPage />
  },

  // Auth
  ...authRouteConfig
};
