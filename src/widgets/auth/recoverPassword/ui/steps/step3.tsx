import { Button, Input } from "@/shared/components";
import type { FC } from "react";
import { useMemo, useState } from "react";
import type { StepModel } from "@/widgets/auth";

export const RecoverPasswordStep3: FC<StepModel> = ({ next, back }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const arePasswordsEqual = useMemo(() => {
    if (password === confirmPassword && password?.length > 0) {
      return "";
    } else if (confirmPassword?.length > 0) {
      return "Пароли должны совпадать";
    }
  }, [confirmPassword, password]);

  return (
    <>
      <div className="font-bold text-2xl relative text-center">
        Придумайте себе новый пароль
      </div>
      <div className="w-full">
        <div className="mt-6">Новый пароль</div>
        <Input
          onChange={(event) => setPassword(event.target.value)}
          className="border mt-2 border-black"
          type="password"
        />
      </div>
      <div className="w-full">
        <div className="mt-3">Повторите пароль</div>
        <Input
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="border mt-2 border-black"
          errorMessage={arePasswordsEqual}
          type="password"
        />
      </div>
      <Button className="mt-4" onClick={() => next?.(password)}>
        Подтвердить
      </Button>
    </>
  );
};
