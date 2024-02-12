import { message } from "antd";
import { errorMessage } from "../api";

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = (res: any) => {
    messageApi.open({
      type: "error",
      content: errorMessage(res)
    });
  };

  return { contextHolder, openMessage };
};
