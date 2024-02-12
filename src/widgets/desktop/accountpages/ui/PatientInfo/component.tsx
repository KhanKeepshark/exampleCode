import type { FC, Key } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table } from "antd";
import { PatientInfoDrawer } from "@/entities/Drawer";
import { useAppSelector } from "@/shared/utils/hooks";
import {
  useGetDiagnosesDataQuery,
  useGetDoctorPatientResultsQuery,
  useGetPatientResultsQuery,
  useUpdatePatientDiagnoseMutation
} from "@/shared/rtkApi";
import { useParams } from "react-router-dom";
import type { LegsResultsModel } from "@/shared/rtkApi";
import { Input, Select } from "@/shared/components";
import dayjs from "dayjs";

export const PatientInfoWidget: FC = () => {
  const [open, setOpen] = useState(false);
  const [currentDiagnose, setCurrentDiagnose] = useState("");
  const [currentSurgery, setCurrentSurgery] = useState("");
  const [currentResult, setCurrentResult] = useState<LegsResultsModel[]>();
  const user = useAppSelector((state) => state.userReducer);
  const { id } = useParams();
  const { data: PatientResults } = useGetDoctorPatientResultsQuery(
    { patient_id: id },
    {
      skip: user?.role !== "doctor"
    }
  );
  const { data: MyResults } = useGetPatientResultsQuery(undefined, {
    skip: user?.role !== "patient"
  });

  const [updatePatientDiagnose] = useUpdatePatientDiagnoseMutation();

  const updatePatientDiagnoseHandler = useCallback(() => {
    updatePatientDiagnose({
      patient_id: id ?? "",
      diagnosis_id: currentDiagnose,
      surgery: currentSurgery
    });
  }, [updatePatientDiagnose, currentDiagnose, currentSurgery, id]);

  useEffect(() => {
    if (PatientResults) {
      setCurrentSurgery(PatientResults.surgery);
      setCurrentDiagnose(PatientResults.diagnosis);
    }
  }, [PatientResults]);

  const { data: diagnosesList } = useGetDiagnosesDataQuery("");

  const diagnosesOptions = useMemo(
    () =>
      diagnosesList?.map((diagnose) => ({
        value: diagnose.diagnosis_id,
        label: diagnose.diagnosis_name
      })),
    [diagnosesList]
  );

  const results = useMemo(() => {
    const resultsResponce =
      user?.role === "doctor" ? PatientResults?.results : MyResults;
    if (resultsResponce) {
      return resultsResponce?.map((result) => ({
        exercise: result.exercise_name,
        date: result.date,
        cycle: result.sets_num,
        middleAngle: result.ben_deg_daily_avg,
        maxAngle: result.ben_deg_daily_max,
        data: result.leg
      }));
    }
  }, [MyResults, PatientResults]);

  const resultsFilterValues = useMemo(() => {
    if (results) {
      return results.map((result) => ({
        text: result.exercise,
        value: result.exercise
      }));
    }
  }, [results]);

  const columns = useMemo(
    () => [
      {
        title: "Упражнение",
        dataIndex: "exercise",
        filters: resultsFilterValues,
        onFilter: (value: boolean | Key, record: any) =>
          record.exercise.includes(value)
      },
      {
        title: "Подходы",
        dataIndex: "cycle"
      },
      {
        title: "Средний угол сгибания",
        dataIndex: "middleAngle"
      },
      {
        title: "Максимальный угол сгибания",
        dataIndex: "maxAngle"
      },
      {
        title: "Дата",
        dataIndex: "date",
        defaultSortOrder: "ascend" as const,
        sorter: (a: any, b: any) =>
          dayjs(b.date, "DD/MM/YYYY").valueOf() -
          dayjs(a.date, "DD/MM/YYYY").valueOf()
      },
      {
        title: "Данные",
        dataIndex: "data",
        render: (data: LegsResultsModel[]) => (
          <Button
            type="link"
            onClick={() => {
              setCurrentResult(data);
              setOpen(true);
            }}
          >
            Подробнее
          </Button>
        )
      }
    ],
    []
  );

  return (
    <div>
      {user?.role === "doctor" && (
        <>
          <div className="text-Bold16">{PatientResults?.fullname}</div>
          <div className="flex mt-5 gap-4 w-full">
            <Input
              placeholder="Операция"
              value={currentSurgery}
              onChange={(event) => setCurrentSurgery(event.target.value)}
            />
            <Select
              placeholder="Диагноз / МКБ"
              wrapperClassName="w-full"
              className="w-full"
              value={currentDiagnose}
              options={diagnosesOptions}
              onChange={(value) => setCurrentDiagnose(value)}
            />
            <Button
              type="primary"
              className="bg-primary w-40"
              onClick={updatePatientDiagnoseHandler}
            >
              сохранить
            </Button>
          </div>
        </>
      )}
      <Table
        className="mt-7"
        columns={columns}
        dataSource={results}
        locale={{
          emptyText: "Нету пациентов"
        }}
        pagination={{ pageSize: 9 }}
      />
      <PatientInfoDrawer
        data={currentResult}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};
