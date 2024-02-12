import type { CarouselProps } from "antd";
import type { ReactElement } from "react";

export interface CarouselModel extends CarouselProps {
  children: ReactElement[] | ReactElement;
}
