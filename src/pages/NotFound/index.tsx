import { Button } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <div className="text-7xl">404</div>
        <div className="text-3xl mt-5">Такой страницы не существует</div>
        <Button onClick={() => navigate("/")} className="mt-5">
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};
