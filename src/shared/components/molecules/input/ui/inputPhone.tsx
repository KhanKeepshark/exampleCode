import { PatternFormat } from "react-number-format";

import type { FC } from "react";
import type { InputPhoneProps } from "../models/InputPhoneProps";
import clsx from "clsx";

export const InputPhone: FC<InputPhoneProps> = ({
  onChange,
  placeholder,
  errorMessage,
  value,
  className,
  wrapperClassName
}) => {
  const convertPhoneNumber = (input: string) => {
    const cleanedNumber = input.replace(/\D/g, "");
    return cleanedNumber.slice(1);
  };
  return (
    <div
      className={clsx(wrapperClassName, {
        "w-full": !wrapperClassName
      })}
    >
      <div
        className={clsx(
          " py-1 px-3 rounded-md",
          {
            "border border-secondary": !className,
            "border border-red": errorMessage
          },
          className
        )}
      >
        <PatternFormat
          className="text-Regular14 w-full placeholder:text-Regular14 placeholder:text-md focus:border-0 focus-visible:border-0 focus-visible:outline-none group"
          format="+7 (###) ### ## ##"
          onChange={(event) =>
            onChange?.(convertPhoneNumber(event.target.value))
          }
          mask="_"
          value={value}
          placeholder={placeholder ?? "Ваш номер телефона"}
        />
      </div>
      <div className="text-Regular12 text-red">{errorMessage}</div>
    </div>
  );
};
