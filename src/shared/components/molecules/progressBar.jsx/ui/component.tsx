import { Progress } from "antd";
import type { FC } from "react";
import type { ProgressBarProps } from "../models/ProgressBarProps";
import { useAppSelector } from "@/shared/utils/hooks";

const currentLeg = (leg: string) => {
  if (leg === "left") {
    return "Левая";
  } else {
    return "Правая";
  }
};

export const ProgressBar: FC<ProgressBarProps> = ({
  className,
  play,
  percent,
  leg,
  title
}) => {
  const { results } = useAppSelector((state) => state.exerciseReducer);
  const { set } = results.find((item) => item.leg === leg) || { set: 0 };
  return (
    <div className={className}>
      <Progress
        strokeLinecap="butt"
        className=" [&_.ant-progress-text]:text-white"
        percent={play ? percent : 0}
        size={[300, 20]}
      />
      <div className="text-white text-Bold14 flex flex-col gap-3 mt-3">
        <div>Подход: {set} из 3</div>
        {leg !== "both" && <div>Нога: {currentLeg(leg)}</div>}
      </div>
    </div>
  );
};
