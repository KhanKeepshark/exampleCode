import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { ExerciseEndProps } from "../models/ExerciseEndProps";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "@/shared/utils/hooks";
import { useCreateUserResultMutation } from "@/shared/rtkApi";

export const ExerciseEnd: FC<ExerciseEndProps> = ({ leg, setFinish }) => {
  const navigate = useNavigate();
  const { setSet } = useActions();
  const exerciseResultData = useAppSelector((state) => state.exerciseReducer);
  const averageAngle = useMemo(() => {
    const currentLegResult = exerciseResultData.results.find(
      (item) => item.leg === leg
    )?.result;
    if (!currentLegResult) return 0;
    if (!currentLegResult.length) return 0;
    const average =
      currentLegResult?.reduce((acc, item) => acc + item, 0) /
      currentLegResult?.length;
    return Math.round(average);
  }, [exerciseResultData, leg]);

  const [createResult] = useCreateUserResultMutation();

  const sendResult = useCallback(
    (end?: boolean) => {
      const currentResult = exerciseResultData.results.find(
        (item) => item.leg === leg
      );
      if (!currentResult) return;
      createResult({
        exercise_id: exerciseResultData.excercise_id,
        leg,
        set: currentResult?.set,
        results: currentResult?.result
      });
      if (end) {
        navigate("/exercises");
        return;
      }
      setSet(leg);
      setFinish(false);
    },
    [exerciseResultData, createResult]
  );

  return (
    <>
      <div className="absolute top-60 left-72 z-10 rounded-xl w-[400px] bg-white p-6 hidden xl:block">
        <div className="flex flex-col items-center">
          <div className="text-lg text-center">
            Ваш средний показатель сгибания
          </div>
          <div className="text-4xl mt-2">{averageAngle}°</div>
          <div className="flex flex-col gap-5 mt-5">
            <Button size="large" onClick={() => sendResult()}>
              Начать новый подход
            </Button>
            <Button size="large" onClick={() => sendResult(true)}>
              Закончить выполнение
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
