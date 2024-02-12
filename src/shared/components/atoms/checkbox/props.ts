import type { CheckboxProps as AntCheckboxProps } from "antd";

export interface CheckboxProps extends AntCheckboxProps {
  className?: string;
  error?: boolean;
}
