import { Button } from "@/shared/components";
import { useMemo, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExerciseByIdQuery } from "@/shared/rtkApi";
import { ExercisesHelper, repeatTarget } from "@/shared/utils/const";

export const ExerciseByIdWidget: FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: exercise, isLoading } = useGetExerciseByIdQuery(id ?? "");

  const curretExercise = useMemo(() => {
    const finded = ExercisesHelper.find((e) => e.text === exercise?.Name);
    return {
      img: finded?.img,
      text: finded?.text,
      descriptions: exercise?.Description
    };
  }, [exercise, id]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="text-Bold16">Библиотека Упражнении</div>
      <div className="w-full bg-white px-10 py-6 mt-6 rounded-xl">
        <Button
          className="w-fit"
          variant="primary"
          onClick={() => navigate("/exercises")}
        >
          НАЗАД
        </Button>
        <div className="mt-6 flex justify-center">
          <img width={600} src={curretExercise.img} alt="exercise" />
        </div>
        <div className="mt-6">
          <div>
            <span className="font-semibold">УПРАЖНЕНИЕ</span> -{" "}
            {curretExercise?.text}
          </div>
          <div className="font-semibold mt-6">
            {curretExercise?.descriptions}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-brand-primary">
            <div>
              <span className="font-bold">Выполнение:</span> 1 - 3 раза в день
            </div>
            <div>
              <span className="font-bold">Количество повторов:</span> до
              {" " + repeatTarget + " "} повторов
            </div>
            <div>
              <span className="font-bold">Количество подходов:</span> до 3
              подходов
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="w-fit mt-6 text-xl "
              variant="secondary"
              onClick={() => navigate(`/exercise/${id}`)}
            >
              НАЧАТЬ УПРАЖНЕНИЕ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
