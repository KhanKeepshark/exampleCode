import { Carousel as AntCarousel } from "antd";
import type { FC } from "react";
import type { CarouselModel } from "./props";

export const Carousel: FC<CarouselModel> = ({ children }) => {
  return (
    <AntCarousel effect="fade" autoplay>
      {children}
    </AntCarousel>
  );
};
