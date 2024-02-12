import type { FC, ReactElement } from "react";
import { useCallback, useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetDoctorDataQuery,
  useGetPatientDataQuery,
  useLogoutMutation
} from "@/shared/rtkApi";
import { useActions, useAppSelector } from "@/shared/utils/hooks";
import { setAuthToken } from "@/shared/utils/api";

const { Sider } = Layout;

const SidebarNavs = [
  {
    title: "ЛИЧНЫЕ ДАННЫЕ",
    link: "/account"
  },
  {
    title: "БИБЛИОТЕКА УПРАЖНЕНИИ",
    link: "/exercises"
  },
  {
    title: "НАСТРОЙКИ",
    link: "/settings"
  }
];

const DoctorNavs = [
  {
    title: "ПАЦИЕНТЫ",
    link: "/patients"
  }
];

const PatientNavs = [
  {
    title: "РЕЗУЛЬТАТЫ",
    link: "/results"
  }
];

export const Sidebar: FC<{ children: ReactElement }> = ({ children }) => {
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { setUserData } = useActions();

  const MenuItems = useMemo(() => {
    const allNavs = user?.role === "doctor" ? DoctorNavs : PatientNavs;
    return [...SidebarNavs, ...allNavs].map((nav) => ({
      key: nav.link,
      label: <div className="text-xs">{nav.title}</div>,
      onClick: () => navigate(nav.link)
    }));
  }, []);

  const [logOutUser] = useLogoutMutation();

  const logOut = useCallback(() => {
    logOutUser("");
    setAuthToken("");
    setUserData({});
    navigate("/authorization");
  }, []);

  const { data: DoctorData } = useGetDoctorDataQuery("", {
    skip: user.role !== "doctor"
  });

  const { data: patientData } = useGetPatientDataQuery("", {
    skip: user.role !== "patient"
  });

  const userId = useMemo(
    () => (patientData || DoctorData)?.UserID.slice(-5),
    [patientData, DoctorData]
  );

  return (
    <div className="min-h-screen flex">
      <Sider trigger={null} width={224}>
        <div className="p-5 flex gap-4">
          <Avatar icon={<UserOutlined />} size={54} className="bg-gray" />
          <div className="mt-1 text-sm">
            {patientData?.Name || DoctorData?.Name || "Пусто"}
            <div>{user?.role === "doctor" ? "Врач" : "Пациент"}</div>
            <div>ID: {userId}</div>
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={[
            ...MenuItems,
            {
              key: "exit",
              label: <div className="text-xs">ВЫЙТИ ИЗ СИСТЕМЫ</div>,
              onClick: () => logOut()
            }
          ]}
        />
      </Sider>
      <div className="w-full bg-brand-aquaLigt p-6">{children}</div>
    </div>
  );
};
