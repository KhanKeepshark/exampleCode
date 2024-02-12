import type { FC } from "react";
import { Select as AntSelect } from "antd";
import type { SelectProps } from "./props";
import clsx from "clsx";

export const Select: FC<SelectProps> = ({
  errorMessage,
  wrapperClassName,
  className,
  ...rest
}) => {
  return (
    <div className={wrapperClassName}>
      <AntSelect
        className={clsx(className, {
          "border border-red": errorMessage
        })}
        {...rest}
      />
      <div className="text-Regular12 text-red">{errorMessage}</div>
    </div>
  );
};
