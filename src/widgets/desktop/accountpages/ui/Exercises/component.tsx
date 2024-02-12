import { useMemo, type FC } from "react";

import { useNavigate } from "react-router-dom";
import { useGetExercisesDataQuery } from "@/shared/rtkApi";
import { ExercisesHelper } from "@/shared/utils/const";

export const ExercisesWidget: FC = () => {
  const navigate = useNavigate();

  const { data: exercises, isLoading } = useGetExercisesDataQuery("");

  const Exercises: {
    img: string;
    title: string;
    text: string;
    link: string;
  }[] = useMemo(() => {
    return exercises?.map((exer: any, index: number) => {
      const finded = ExercisesHelper.find((e) => e.text === exer.Name);
      return {
        img: finded?.img,
        title: `УПРАЖНЕНИЕ ${index + 1}`,
        text: finded?.text,
        link: exer.ExerciseID
      };
    });
  }, [exercises, isLoading]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="text-Bold16">Библиотека Упражнении</div>
      <div className="w-full bg-white px-10 py-6 mt-6 rounded-xl">
        {Exercises?.map((exer) => (
          <div
            className="flex items-center gap-6 mb-6 hover:bg-slate-300 cursor-pointer"
            key={exer.text}
            onClick={() => navigate(`/exercises/${exer.link}`)}
          >
            <img className="w-24 " src={exer.img} alt="" />
            <div>
              <span className="font-semibold">{exer.title}</span> - {exer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
