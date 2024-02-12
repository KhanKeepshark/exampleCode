import type { TypeSetState } from "@/shared/utils/types";
import type { LegTypes } from "@/widgets/exercises";

export interface ExerciseOneControlBlockModel {
  exerciseCount: number;
  repeatTarget: number;
  rightLeg: boolean;
  setFinish: TypeSetState<boolean>;
  leg: LegTypes;
}
