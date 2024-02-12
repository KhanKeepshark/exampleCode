import type { FC } from "react";
import { PatientInfoWidget } from "..";

export const ResultsWidget: FC = () => {
  return (
    <div>
      <div className="text-Bold16">РЕЗУЛЬТАТЫ | ВАШ ПРОГРЕСС</div>
      <PatientInfoWidget />
    </div>
  );
};
