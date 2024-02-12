import {
  Button,
  Input,
  InputPhone,
  LinkButton,
  Segmented
} from "@/shared/components";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Button as AntButton } from "antd";
import { Controller, useForm } from "react-hook-form";
import type { UserRegisterData } from "../models/RegistationModel";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import { useActions, useMessage } from "@/shared/utils/hooks";
import {
  useRegisterDoctorMutation,
  useRegisterPatientMutation
} from "@/shared/rtkApi";

export const RegistrationWidget: FC = () => {
  const [doctorAuth, setDoctorAuth] = useState(false);
  const { openMessage, contextHolder } = useMessage();
  const { setUserData } = useActions();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserRegisterData>();

  const navigate = useNavigate();

  const [doctorRegister] = useRegisterDoctorMutation();
  const [patientRegister] = useRegisterPatientMutation();

  const onSubmit = useCallback(
    async (data: UserRegisterData) => {
      (doctorAuth ? doctorRegister(data) : patientRegister(data))
        .unwrap()
        .then((userData) => {
          setUserData(userData ?? {});
          navigate("/fillProfile");
        })
        .catch((err) => openMessage(err));
    },
    [
      doctorAuth,
      openMessage,
      setUserData,
      navigate,
      doctorRegister,
      patientRegister
    ]
  );

  return (
    <div className="my-40 flex justify-center items-center">
      {contextHolder}
      <div className="max-w-[600px] min-w-[310px] w-full px-10 h-2/5 flex flex-col items-center">
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
          name="name"
          rules={{ required: "Введите имя" }}
          render={({ field: { ref, ...rest } }) => (
            <Input
              className="mt-10 border-black"
              placeholder="ИМЯ"
              errorMessage={errors.name?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="surname"
          rules={{ required: "Введите фамилию" }}
          render={({ field: { ref, ...rest } }) => (
            <Input
              className="mt-3 border-black"
              placeholder="ФАМИЛИЯ"
              errorMessage={errors?.surname?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNum"
          rules={{ required: "Введите номер" }}
          render={({ field: { ref, ...rest } }) => (
            <InputPhone
              className="border border-black"
              wrapperClassName="mt-3 w-full"
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
              placeholder="СОЗДАТЬ ПАРОЛЬ"
              type="password"
              errorMessage={errors?.password?.message}
              {...rest}
            />
          )}
        />
        <Button className="mt-6" onClick={() => handleSubmit(onSubmit)()}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Button>
        <AntButton
          type="link"
          onClick={() => navigate("/authorization")}
          className="mt-4"
        >
          АВТОРИЗОВАТЬСЯ
        </AntButton>
        <div className="flex items-start mt-5 relative md:w-full w-[250px]">
          <Controller
            control={control}
            name="agreement"
            rules={{ required: true }}
            render={({ field: { value, ref, ...rest } }) => (
              <Checkbox
                {...rest}
                error={!!errors.agreement}
                className="absolute md:-left-6 md:top-0 -left-4 -top-1"
              />
            )}
          />
          <div className="text-center md:text-sm text-xs">
            С условиями
            <LinkButton to="/confidential">Пользования</LinkButton>и
            <LinkButton to="/useragreement">
              Обработки Персональных Данных
            </LinkButton>
            ознакомлен и полностью согласен
          </div>
        </div>
      </div>
    </div>
  );
};
