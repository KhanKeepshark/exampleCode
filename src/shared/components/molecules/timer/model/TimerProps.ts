import type { Dispatch, SetStateAction } from "react";

export interface TimeProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  play: boolean;
}
