import { PatternFormat } from "react-number-format";

import type { FC } from "react";
import clsx from "clsx";
import type { InputCodeProps } from "../models/InputCodeProps";

export const InputCode: FC<InputCodeProps> = ({
  onChange,
  value,
  className,
  wrapperClassName
}) => {
  return (
    <div className={clsx(wrapperClassName)}>
      <div
        className={clsx(
          " py-1 px-3 rounded-md",
          {
            "border border-secondary": !className
          },
          className
        )}
      >
        <PatternFormat
          className="text-3xl text-center w-40 focus:border-0 focus-visible:border-0 focus-visible:outline-none"
          format="######"
          onChange={(event) => onChange?.(event)}
          mask=""
          value={value}
        />
      </div>
    </div>
  );
};
