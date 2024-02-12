import { HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import type { FC, ReactElement } from "react";

export const MobileLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  return (
    <>
      {children}
      <div className="absolute bottom-0  w-full flex justify-between text-2xl">
        <div className="w-full bg-red flex flex-col py-2 items-center active:bg-blue-200">
          <HomeOutlined />
          <div className="text-sm">Главная</div>
        </div>
        <div className="w-full bg-red">
          <ProfileOutlined />
        </div>
      </div>
    </>
  );
};
