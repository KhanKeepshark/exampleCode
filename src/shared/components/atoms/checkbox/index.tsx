import { Checkbox as AntCheckbox } from "antd";
import clsx from "clsx";
import type { FC } from "react";
import type { CheckboxProps } from "./props";

export const Checkbox: FC<CheckboxProps> = ({ className, error, ...rest }) => {
  return (
    <AntCheckbox
      className={clsx(className, {
        "!border-red border-2 !h-5 rounded-md": error
      })}
      {...rest}
    />
  );
};
