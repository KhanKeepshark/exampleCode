import { useMessage } from "@/shared/utils/hooks";
import type { FC } from "react";
import { useCallback, useState } from "react";
import {
  RecoverPasswordStep1,
  RecoverPasswordStep2,
  RecoverPasswordStep3
} from "./steps";
import { useNavigate } from "react-router-dom";
import {
  useCheckRecoverPasswordCodeMutation,
  useSendRecoverPasswordCodeMutation,
  useUpdateUserPasswordMutation
} from "@/shared/rtkApi";

export const RecoverPasswordWidget: FC = () => {
  const [step, setStep] = useState(2);
  const [phone, setPhone] = useState("");

  const { openMessage, contextHolder } = useMessage();
  const navigate = useNavigate();

  const [sendRecoverPasswordCode] = useSendRecoverPasswordCodeMutation();
  const [checkRecoverPasswordCode] = useCheckRecoverPasswordCodeMutation();
  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const RecoverPasswordStep1Next = useCallback(
    (data?: string) => {
      sendRecoverPasswordCode(data ?? "")
        .unwrap()
        .then(() => {
          setStep(1);
          setPhone(data ?? "");
        })
        .catch((err) => openMessage(err));
    },
    [sendRecoverPasswordCode, setStep, setPhone, openMessage]
  );

  const RecoverPasswordStep3Next = useCallback((data?: string) => {
    updateUserPassword(data ?? "")
      .unwrap()
      .then(() => navigate("/authorization"))
      .catch((err) => openMessage(err));
  }, []);

  const RecoverPasswordStep2Next = useCallback(
    (code?: string) => {
      checkRecoverPasswordCode(code ?? "")
        .unwrap()
        .then(() => setStep(2))
        .catch((err) => openMessage(err));
    },
    [checkRecoverPasswordCode, setStep, openMessage]
  );

  return (
    <div className="h-screen flex justify-center items-center">
      {contextHolder}
      <div className="w-[500px] px-10 h-2/5 flex flex-col items-center">
        {step === 0 && <RecoverPasswordStep1 next={RecoverPasswordStep1Next} />}
        {step === 1 && (
          <RecoverPasswordStep2
            next={RecoverPasswordStep2Next}
            back={() => sendRecoverPasswordCode(phone)}
          />
        )}
        {step === 2 && <RecoverPasswordStep3 next={RecoverPasswordStep3Next} />}
      </div>
    </div>
  );
};
