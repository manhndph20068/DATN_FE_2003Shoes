import {
  Button,
  Modal,
  Checkbox,
  Form,
  Table,
  message,
  notification,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useState } from "react";
import { callImportUser } from "../../../services/api";
const { Dragger } = Upload;

const UserModelImport = (props) => {
  const { isModalImportOpen, setIsModalImportOpen, fetchUser } = props;

  const [dataImport, setDataImport] = useState([]);

  const handleCancel = () => {
    setDataImport([]);
    setIsModalImportOpen(false);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest: dummyRequest,
    onChange(info) {
      console.log("info", info.fileList);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (e) => {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            console.log("jsonData", jsonData);
            if (jsonData && jsonData.length > 0) {
              setDataImport(jsonData);
            }
          };
        }

        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmitImportFile = async () => {
    const data = dataImport.map((item) => {
      item.password = "123456";
      return item;
    });
    const res = await callImportUser(data);
    if (res.data) {
      notification.success({
        message: `Succes: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        description: "Upload thành công",
      });
      setDataImport([]);
      setIsModalImportOpen(false);
      fetchUser();
    } else {
      notification.error({
        message: res.message,
        description: "Upload thành công",
      });
    }
  };

  return (
    <>
      <Modal
        title="Import"
        open={isModalImportOpen}
        onOk={handleSubmitImportFile}
        onCancel={handleCancel}
        okButtonProps={{ disabled: dataImport.length < 1 }}
      >
        <Dragger {...UploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>

        <Table
          dataSource={dataImport}
          title={() => <span>Dữ liệu upload: </span>}
          columns={[
            { title: "Tên", dataIndex: "fullName" },
            { title: "Email", dataIndex: "email" },
            { title: "Số điện thoại", dataIndex: "phone" },
          ]}
        />
      </Modal>
    </>
  );
};
export default UserModelImport;
