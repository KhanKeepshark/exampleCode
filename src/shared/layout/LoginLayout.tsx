import { Sidebar } from "@/widgets/desktop/sidebar";
import type { FC, ReactElement } from "react";

export const LoginLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  return <Sidebar>{children}</Sidebar>;
};
