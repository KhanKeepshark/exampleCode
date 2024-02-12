import { Button, Upload } from "antd";
import type { FC } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { FileUploadProps } from "../model/FileUploadProps";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { otherApi } from "@/shared/api/otherApi";

const updloadFile = async (data: UploadRequestOption) => {
  const fileUrl = await otherApi.uploadExtraFiles(data.file as File);
  return fileUrl;
};

export const FileUpload: FC<FileUploadProps> = ({ title }) => {
  return (
    <Upload
      customRequest={updloadFile}
      multiple={false}
      accept="application/pdf"
    >
      <Button icon={<UploadOutlined />}>{title}</Button>
    </Upload>
  );
};
