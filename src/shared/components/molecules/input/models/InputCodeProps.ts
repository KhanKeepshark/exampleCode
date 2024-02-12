import type { ChangeEventHandler } from "react";

export interface InputCodeProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  wrapperClassName?: string;
  className?: string;
}
