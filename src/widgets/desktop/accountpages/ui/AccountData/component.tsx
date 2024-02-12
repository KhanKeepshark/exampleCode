import {
  Button,
  FileUpload,
  Input,
  InputPhone,
  Select
} from "@/shared/components";
import { DatePicker } from "antd";
import type { FC } from "react";
import { useCallback, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import type { UpdateDoctor } from "@/shared/api/models";
import { useAppSelector } from "@/shared/utils/hooks";
import {
  useGetCitiesDataQuery,
  useGetDoctorDataQuery,
  useGetPatientDataQuery,
  useUpdateDoctorDataMutation,
  useUpdatePatientDataMutation
} from "@/shared/rtkApi";

export const AccountPageWidget: FC = () => {
  const user = useAppSelector((state) => state.userReducer);

  const { control, reset, handleSubmit } = useForm<UpdateDoctor>();

  const { data: doctorData, isSuccess: doctorSucces } = useGetDoctorDataQuery(
    "",
    {
      skip: user.role !== "doctor"
    }
  );
  const { data: patientData, isSuccess: patientSucces } =
    useGetPatientDataQuery("", {
      skip: user.role !== "patient"
    });

  const [updatePatientData] = useUpdatePatientDataMutation();
  const [updateDoctorData] = useUpdateDoctorDataMutation();

  const { data: cities } = useGetCitiesDataQuery("");

  const citiesSelectOptions = useMemo(
    () =>
      cities?.data.map((city) => ({
        label: city.City,
        value: city.CityID,
        id: city.CityID
      })),
    [cities]
  );

  useEffect(() => {
    const data = doctorData ?? patientData;
    if (patientSucces || doctorSucces) {
      reset({
        name: data?.Name,
        email: data?.Email,
        surname: data?.Surname,
        phone: data?.TelephoneNum,
        cityid: doctorData?.CityID ?? patientData?.CityID,
        birthdate: dayjs(
          patientData?.Birthdate ?? doctorData?.Birthdate,
          "DD/MM/YYYY"
        )
      });
    }
  }, [doctorData, patientData, patientSucces, doctorSucces]);

  const InputsData: {
    title: string;
    placeholder: string;
    fieldName: keyof UpdateDoctor;
  }[] = useMemo(
    () => [
      {
        title: "ИМЯ",
        placeholder: "Введите ваше имя",
        fieldName: "name"
      },
      {
        title: "ФАМИЛИЯ",
        placeholder: "Введите вашу фамилию",
        fieldName: "surname"
      },
      {
        title: "ПОЧТА",
        placeholder: "Введите вашу почту",
        fieldName: "email"
      }
    ],
    [patientData, doctorData]
  );

  const onSubmit = useCallback((data: UpdateDoctor) => {
    if (user.role === "doctor") {
      updateDoctorData({
        ...data,
        birthdate: dayjs(data.birthdate).format("DD/MM/YYYY")
      });
    } else {
      updatePatientData({
        ...data,
        birthdate: dayjs(data.birthdate).format("DD/MM/YYYY")
      });
    }
  }, []);

  return (
    <div>
      <div className="text-Bold16">Ваши Личные Данные</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full bg-white px-10 py-6 mt-6 rounded-xl">
          {InputsData.map(({ placeholder, title, fieldName }) => (
            <div
              className="flex items-center justify-between max-w-[550px] mt-3"
              key={title}
            >
              <div className="text-Bold16">{title}</div>
              <Controller
                control={control}
                name={fieldName}
                render={({ field: { ref, value, ...rest } }) => (
                  <Input
                    wrapperClassName="w-fit"
                    className="w-80"
                    placeholder={placeholder}
                    value={value as string}
                    {...rest}
                  />
                )}
              />
            </div>
          ))}
          <div className="flex items-center justify-between max-w-[550px] mt-3">
            <div className="text-Bold16">НОМЕР ТЕЛЕФОНА</div>
            <Controller
              control={control}
              name="phone"
              render={({ field: { ref, ...rest } }) => (
                <InputPhone wrapperClassName="w-80" {...rest} />
              )}
            />
          </div>
          <div className="flex items-center justify-between max-w-[550px] mt-3">
            <div className="text-Bold16">ГОРОД</div>
            <Controller
              control={control}
              name="cityid"
              render={({ field: { onChange, value } }) => (
                <Select
                  className="rounded-md w-full"
                  options={citiesSelectOptions}
                  value={value}
                  onChange={onChange}
                  wrapperClassName="w-80 mt-3"
                  placeholder="Выберите город"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between max-w-[550px] mt-3">
            <div className="text-Bold16">ДАТА РОЖДЕНИЯ</div>
            <Controller
              control={control}
              name="birthdate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  format="DD/MM/YYYY"
                  className="w-80"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          {user?.role === "doctor" && (
            <>
              <div className="flex items-center justify-between max-w-[550px] mt-3">
                <div className="text-Bold16">КВАЛИФИКАЦИЯ</div>
                <Input wrapperClassName="w-fit" className="w-80" />
              </div>
              <div className="flex items-center justify-between max-w-[550px] mt-3">
                <div className="text-Bold16">СПЕЦИАЛИЗАЦИЯ</div>
                <Input wrapperClassName="w-fit" className="w-80" />
              </div>
              <div className="flex items-center justify-between max-w-[550px] mt-3">
                <div className="text-Bold16">СЕРТИФИКАТ</div>
                <FileUpload title="Загрузить сертификат" />
              </div>
              <div className="flex items-center justify-between max-w-[550px] mt-3">
                <div className="text-Bold16">ЛИЦЕНЗИЯ</div>
                <FileUpload title="Загрузить лицензию" />
              </div>
            </>
          )}
          <div className="flex justify-center mt-10">
            <Button className="py-1">СОХРАНИТЬ</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
