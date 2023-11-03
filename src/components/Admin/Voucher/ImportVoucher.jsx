import { InboxOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { callImportFileVoucher } from "../../../services/api";
import { useState } from "react";

const ImportVoucher = (props) => {
  const { isModalImportOpen, setIsModalImportOpen } = props;
  const [resultImport, setResultImport] = useState({});

  const handleCancel = () => {
    setResultImport({});
    setIsModalImportOpen(false);
    // window.location.reload();
  };

  const dataImportFileVoucher = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("type", 0);
    return bodyFormData;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const UploadProps = {
    method: "POST",
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest: dummyRequest,
    customRequest({ file, onSuccess, onError }) {
      const formData = dataImportFileVoucher(file); // Lấy FormData từ hàm đã tạo

      fetch("http://localhost:8080/api/v1/admin/voucher-order/import", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          onSuccess(data, file); // Gọi onSuccess nếu tất cả đều thành công
        })
        .catch((error) => {
          console.error("Error:", error);
          onError(error); // Gọi onError nếu có lỗi xảy ra
        });
    },
    onChange(info) {
      const { status } = info.file;
      // console.log("info", info);

      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log(info.file.response, info.fileList);
        setResultImport(info.file.response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmitImportFile = () => {};

  const handleGetFileExample = () => {
    window.location.href =
      "http://localhost:8080/api/v1/admin/voucher-order/download-excel-template";
  };

  const handleGetFileError = () => {
    window.location.href =
      "http://localhost:8080/api/v1/admin/voucher-order/download-excel-file-error";
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="Import Voucher"
        open={isModalImportOpen}
        cancelButtonProps={{ style: { marginTop: "1rem" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        //   okButtonProps={{ disabled: dataImport.length < 1 }}
      >
        <Dragger {...UploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a XLSX. Strictly prohibited from uploading company data
            or other banned files.
          </p>
          <br />
          <Button onClick={() => handleGetFileExample()}>Tải file mẫu</Button>
        </Dragger>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <span>Tổng số bản ghi: {resultImport.total ?? null}</span>
          <span>
            {resultImport.fail > 0 ? (
              <Button
                danger={true}
                style={{ color: "red" }}
                onClick={() => handleGetFileError()}
              >
                Tải file lỗi
              </Button>
            ) : (
              <></>
            )}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <span style={{ color: "green" }}>
            Thành công: {resultImport.success ?? null}
          </span>
          <span style={{ color: "red" }}>
            Thất bại: {resultImport.fail ?? null}
          </span>
        </div>
      </Modal>
    </>
  );
};
export default ImportVoucher;
