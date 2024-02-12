import { Button } from "antd";
import { useCallback, type FC } from "react";
import type { ExerciseOneControlBlockModel } from "../models/ExerciseControlBlockModel";
import { clsx } from "clsx";
import { ForwardOutlined } from "@ant-design/icons";
import { useActions, useAppSelector } from "@/shared/utils/hooks";
import { useCreateUserResultMutation } from "@/shared/rtkApi";

export const ExerciseOneControlBlock: FC<ExerciseOneControlBlockModel> = ({
  exerciseCount,
  repeatTarget,
  leg,
  setFinish
}) => {
  const { setSet } = useActions();
  const exerciseResultData = useAppSelector((state) => state.exerciseReducer);
  const [createResult] = useCreateUserResultMutation();

  const sendResult = useCallback(() => {
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
    setSet(leg);
  }, [exerciseResultData, createResult]);

  return (
    <>
      <div className="absolute flex -right-0 bottom-0 p-4 bg-opacity-40 backdrop-blur bg-white rounded items-center gap-2 transform max-[1090px]:rotate-90 max-[1090px]:right-7 max-[1090px]:-bottom-7 max-[1090px]:flex-col">
        <div className="flex font-bold text-2xl">
          <div>{exerciseCount}</div>/
          <div
            className={clsx("text-red", {
              "text-green-300": exerciseCount === repeatTarget
            })}
          >
            {repeatTarget}
          </div>
        </div>
        <Button
          type="primary"
          className="bg-blue-600 flex justify-center items-center text-2xl"
          onClick={sendResult}
        >
          <ForwardOutlined />
        </Button>
        <Button
          type="primary"
          className="rounded bg-blue-300 h-8 py-1 px-4 text-Bold16"
          onClick={() => setFinish(true)}
        >
          ЗАКОНЧИТЬ
        </Button>
      </div>
    </>
  );
};
