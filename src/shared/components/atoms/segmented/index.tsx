import { Segmented as AntSegmented, ConfigProvider } from "antd";
import type { FC } from "react";
import type { SegmentedProps } from "./props";
import { colors } from "@/shared/config";

export const Segmented: FC<SegmentedProps> = ({ ...rest }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: colors.brand.gradient1,
            itemSelectedColor: "white"
          }
        },
        token: {
          motionDurationMid: "0s"
        }
      }}
    >
      <AntSegmented {...rest} />
    </ConfigProvider>
  );
};
