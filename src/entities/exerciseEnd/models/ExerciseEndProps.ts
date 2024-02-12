import type { TypeSetState } from "@/shared/utils/types";

export interface ExerciseEndProps {
  isMobile: boolean;
  leg: "left" | "right" | "both";
  setFinish: TypeSetState<boolean>;
}
