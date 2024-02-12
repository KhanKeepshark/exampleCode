import { InputCode } from "@/shared/components";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { StepModel } from "@/widgets/auth";
import { Button } from "antd";

export const RecoverPasswordStep2: FC<StepModel> = ({ next, back }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length === 6) {
      next?.(code);
    }
  }, [code]);

  return (
    <>
      <div className="font-bold text-2xl relative text-center">
        Введите код оптравленный вам на WhatsApp
      </div>
      <InputCode
        onChange={(event) => setCode(event.target.value)}
        className="border mt-4 border-black"
      />
      <Button type="link" className="mt-4" onClick={() => back?.()}>
        Отправить код еще раз
      </Button>
    </>
  );
};
