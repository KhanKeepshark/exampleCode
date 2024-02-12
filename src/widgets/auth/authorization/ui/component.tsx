import { Button, Input, InputPhone, Segmented } from "@/shared/components";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Button as AntButton } from "antd";
import { Controller, useForm } from "react-hook-form";
import type { UserAuthorizationData } from "../models/AuthorizationModel";
import { useNavigate } from "react-router-dom";
import { useAuthByLoginMutation } from "@/shared/rtkApi";
import { useActions, useAppSelector, useMessage } from "@/shared/utils/hooks";

export const AuthorizationWidget: FC = () => {
  const [doctorAuth, setDoctorAuth] = useState(false);
  const { setUserData } = useActions();
  const { openMessage, contextHolder } = useMessage();

  const isMobile = useAppSelector((state) => state.mobileReducer);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserAuthorizationData>();

  const navigate = useNavigate();

  const [authByLogin] = useAuthByLoginMutation();

  const onSubmit = useCallback(
    (data: UserAuthorizationData) => {
      authByLogin(data)
        .unwrap()
        .then((userData) => {
          setUserData(userData ?? {});
          isMobile ? navigate("/account") : navigate("/mobile/account");
        })
        .catch((err) => openMessage(err));
    },
    [doctorAuth]
  );

  return (
    <div className="h-screen flex justify-center items-center">
      {contextHolder}
      <div className="max-w-[500px] w-1/2 min-w-[270px] px-0 h-2/5 flex flex-col items-center">
        <Segmented
          defaultValue={"Пользователь"}
          options={["Пользователь", "Врач"]}
          onChange={(value) => setDoctorAuth(value === "Врач")}
          size="large"
          className="border border-black w-[250px] md:w-[400px]"
          block
        />
        <Controller
          control={control}
          name="phoneNum"
          rules={{ required: "Введите номер" }}
          render={({ field: { ref, ...rest } }) => (
            <InputPhone
              className="border border-black"
              wrapperClassName="mt-10 w-full"
              placeholder="ТЕЛЕФОН"
              errorMessage={errors?.phoneNum?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Введите пароль" }}
          render={({ field: { ref, ...rest } }) => (
            <Input
              className="mt-3 border-black"
              placeholder="ПАРОЛЬ"
              type="password"
              errorMessage={errors?.password?.message}
              {...rest}
            />
          )}
        />
        <Button className="mt-6" onClick={() => handleSubmit(onSubmit)()}>
          АВТОРИЗОВАТЬСЯ
        </Button>
        <AntButton
          type="link"
          onClick={() => navigate("/registration")}
          className="mt-4"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </AntButton>
        <AntButton
          type="link"
          onClick={() => navigate("/recoverPassword")}
          className="mt-2"
        >
          Забыли пароль?
        </AntButton>
      </div>
    </div>
  );
};
