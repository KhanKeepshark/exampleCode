import { Drawer } from "antd";
import type { PatientInfoDrawerProps } from "./props";
import type { FC } from "react";

const legTranslate = {
  LEFT: "Левая нога",
  RIGHT: "Правая нога",
  BOTH: "Обе ноги"
};

export const PatientInfoDrawer: FC<PatientInfoDrawerProps> = ({
  onClose,
  open,
  data
}) => {
  return (
    <Drawer onClose={onClose} open={open} title="Данные пациента">
      {data?.map(({ leg_type, sets }) => (
        <>
          <div className="mt-4">{legTranslate[leg_type]}</div>
          <ul className="list-disc pl-6">
            {sets.map(
              ({
                repetitions,
                dayTime,
                bendingDegreeAvg,
                bendingDegreeMax
              }) => (
                <li key={dayTime} className="mt-2">
                  {repetitions} из 13 повторений
                  <div>Среднее сгибание: {bendingDegreeAvg}</div>
                  <div>Максимальное сгибание: {bendingDegreeMax}</div>
                  <div>Время дня: {dayTime}</div>
                </li>
              )
            )}
          </ul>
        </>
      ))}
    </Drawer>
  );
};
