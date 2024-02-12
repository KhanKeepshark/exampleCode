import { Route, Routes } from "react-router-dom";
import { publicRoutes, loginRoutes } from "@/shared/config/routeConfig";
import { useActions, useAppSelector } from "@/shared/utils/hooks";
import { useRefreshAuthTokenQuery } from "@/shared/rtkApi";
import { useEffect } from "react";

export const AppRouter = () => {
  const { data, isSuccess } = useRefreshAuthTokenQuery("");
  const { setUserData } = useActions();

  const user = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (isSuccess) {
      setUserData(data);
    }
  }, [isSuccess, data, setUserData]);

  return (
    <Routes>
      {user.user_id &&
        Object.values(loginRoutes).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {Object.values(publicRoutes).map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
