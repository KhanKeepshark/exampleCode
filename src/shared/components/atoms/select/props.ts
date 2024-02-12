import type { SelectProps as AntSelectProps } from "antd";

export interface SelectProps extends AntSelectProps {
  errorMessage?: string;
  wrapperClassName?: string;
}
