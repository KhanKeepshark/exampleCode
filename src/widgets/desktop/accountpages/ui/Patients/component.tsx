import type { TableColumnsType } from "antd";
import { Button, Table } from "antd";
import { useMemo, type FC } from "react";
import type { PatientsTableDataType } from "@/widgets/desktop/accountpages";
import { useNavigate } from "react-router-dom";
import { useGetDoctorPatientsQuery } from "@/shared/rtkApi";
import { useAppSelector } from "@/shared/utils/hooks";

export const PatientsWidget: FC = () => {
  const navigate = useNavigate();
  const { data } = useGetDoctorPatientsQuery("");
  const user = useAppSelector((state) => state.userReducer);
  const patients = useMemo(() => {
    if (data) {
      return data.map((patient) => ({
        patientName: `${patient.Name ?? ""} ${patient.Surname ?? ""}`,
        diagnosis: patient.DiagnosisID,
        operation: patient.ICDCode,
        contacts: patient.phone,
        id: patient.PatientID
      }));
    }
    return [];
  }, [data]);

  const columns: TableColumnsType<PatientsTableDataType> = useMemo(
    () => [
      {
        title: "Пациент",
        dataIndex: "patientName"
      },
      {
        title: "Диагноз / МКБ",
        dataIndex: "diagnosis",
        render: (value) => (value ? <div>{value}</div> : <div>Пусто</div>)
      },
      {
        title: "Операция",
        dataIndex: "operation",
        render: (value) => (value ? <div>{value}</div> : <div>Пусто</div>)
      },
      {
        title: "Контакты",
        dataIndex: "contacts",
        render: (value) => (value ? <div>{value}</div> : <div>Пусто</div>)
      },
      {
        title: "Результаты",
        dataIndex: "id",
        render: (id: string) => (
          <Button type="link" onClick={() => navigate(id)}>
            Подробнее
          </Button>
        )
      }
    ],
    []
  );
  return (
    <div>
      <div className="text-Bold16">Ваши Пациенты</div>
      <Table
        className="mt-7"
        columns={columns}
        dataSource={patients}
        locale={{
          emptyText:
            user?.role === "doctor" ? "Нету пациентов" : "Нету результатов"
        }}
        pagination={{ pageSize: 9 }}
      />
    </div>
  );
};
