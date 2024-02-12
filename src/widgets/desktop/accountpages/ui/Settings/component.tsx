import { Input } from "@/shared/components";
import type { FC } from "react";

export const SettingsWidget: FC = () => {
  return (
    <div className="w-80">
      <div className="text-Bold16">Обновить пароль</div>
      <div className="w-full">
        <div className="mt-6">Новый пароль</div>
        <Input className="border mt-2 border-black" type="password" />
      </div>
      <div className="w-full">
        <div className="mt-3">Повторите пароль</div>
        <Input className="border mt-2 border-black" type="password" />
      </div>
    </div>
  );
};
