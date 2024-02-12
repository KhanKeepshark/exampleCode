import { Button, Input, InputPhone, Select } from "@/shared/components";
import type { FC } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useMessage } from "@/shared/utils/hooks";
import type { FillUserProfileData } from "@/shared/api/models";
import {
  useFillUserProfileMutation,
  useGetCitiesDataQuery,
  useGetDoctorDataQuery,
  useGetPatientDataQuery
} from "@/shared/rtkApi";

export const FillProfileWidget: FC = () => {
  const navigate = useNavigate();
  const { contextHolder } = useMessage();
  const isMobile = useAppSelector((state) => state.mobileReducer);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FillUserProfileData>();

  const user = useAppSelector((state) => state.userReducer);

  const { data: doctorData } = useGetDoctorDataQuery("", {
    skip: user.role !== "doctor"
  });

  const { data: patientData } = useGetPatientDataQuery("", {
    skip: user.role !== "patient"
  });

  const { data: cities } = useGetCitiesDataQuery("");
  const [fillUserProfile] = useFillUserProfileMutation();

  useEffect(() => {
    const data = doctorData ?? patientData;
    reset({
      name: data?.Name,
      surname: data?.Surname,
      phone: data?.TelephoneNum
    });
  }, [doctorData, patientData]);

  const citiesSelectOptions = useMemo(
    () =>
      cities?.data.map((city) => ({
        label: city.City,
        value: city.CityID,
        id: city.CityID
      })),
    [cities]
  );

  const onSubmit = useCallback((data: FillUserProfileData) => {
    fillUserProfile(data)
      .unwrap()
      .then(() =>
        isMobile ? navigate("/account") : navigate("/mobile/account")
      );
  }, []);

  return (
    <div className="my-40 flex justify-center items-center">
      {contextHolder}
      <div className="w-[600px] px-10 h-2/5 flex flex-col items-center">
        <div className="font-bold text-lg relative text-center">
          ЗАПОЛНИТЕ ВАШИ ДАННЫЕ
        </div>
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
          name="email"
          render={({ field: { ref, ...rest } }) => (
            <Input
              className="mt-3 border-black"
              placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={{ required: "Введите номер" }}
          render={({ field: { ref, ...rest } }) => (
            <InputPhone
              className="border border-black"
              wrapperClassName="mt-3 w-full"
              placeholder="ТЕЛЕФОН"
              errorMessage={errors?.phone?.message}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="birthdate"
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <DatePicker
              format={"DD/MM/YYYY"}
              className="w-full mt-3 border-black py-[6px]"
              onChange={(_, date) => onChange(date)}
              placeholder="Выберите дату рождения"
              status={!!errors.birthdate ? "error" : ""}
            />
          )}
        />
        <Controller
          control={control}
          name="cityid"
          rules={{ required: "Выберите город" }}
          render={({ field: { onChange } }) => (
            <Select
              className="w-full rounded-md border border-black"
              options={citiesSelectOptions}
              onChange={onChange}
              wrapperClassName="w-full mt-3"
              errorMessage={errors?.cityid?.message}
              placeholder="Выберите город"
            />
          )}
        />
        <Button className="mt-6" onClick={handleSubmit(onSubmit)}>
          ЗАПИСАТЬ ДАННЫЕ
        </Button>
      </div>
    </div>
  );
};
