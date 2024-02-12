import { Button, InputPhone } from "@/shared/components";
import type { FC } from "react";
import { useState } from "react";
import type { StepModel } from "@/widgets/auth";

export const RecoverPasswordStep1: FC<StepModel> = ({ next }) => {
  const [phone, setPhone] = useState("");
  return (
    <>
      <div className="font-bold text-2xl relative text-center">
        Введите ваш номер телефона
      </div>
      <InputPhone
        onChange={(value) => setPhone(value)}
        className="border mt-4 border-black"
      />
      <Button onClick={() => next?.(phone)} className="mt-4">
        Отправить код
      </Button>
    </>
  );
};
