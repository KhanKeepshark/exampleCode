import { Footer } from "@/widgets/desktop/footer";
import { Navbar } from "@/widgets/desktop/navbar";
import type { FC, ReactElement } from "react";

export const MainLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
