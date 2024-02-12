import { MobileLayout } from "@/shared/layout";
import { MobileAccountWidget } from "@/widgets/mobile/accountPages";
import type { RouteProps } from "react-router-dom";

const mobileRootPath = "mobile";

export enum MobileAccountRoutes {
  Account = mobileRootPath + "account"
}

export const RoutePath: Record<MobileAccountRoutes, string> = {
  [MobileAccountRoutes.Account]: "/" + mobileRootPath + "/account"
};

export const mobileRouteConfig: Record<string, RouteProps> = {
  [MobileAccountRoutes.Account]: {
    path: RoutePath.mobileaccount,
    element: (
      <MobileLayout>
        <MobileAccountWidget />
      </MobileLayout>
    )
  }
};
