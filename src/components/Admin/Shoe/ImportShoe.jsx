import { InboxOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { callImportFileVoucher } from "../../../services/api";
import { useState } from "react";

const ImportShoes = (props) => {
  const { isModalImportOpen, setIsModalImportOpen, fetchAllShoes } = props;
  const [resultImport, setResultImport] = useState({});
  const [typeImport, setTypeImport] = useState(0);

  const handleCancel = () => {
    setResultImport({});
    setIsModalImportOpen(false);
    // window.location.reload();
  };

  const dataImportFileVoucher = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("type", typeImport);
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
        headers: {
          Accept: "application/json", // Set the correct content type
        },
      })
        // .then((response) => {
        //   response.json();
        //   console.log("response then", response);
        // })
        .then((response) => {
          // Parse the JSON asynchronously and return the parsed data
          return response.json();
        })
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
        message.success(`${info.file.name} Tải file thành công.`);
        console.log("info", info, info.file.response, info.fileList);
        setResultImport(info.file.response);
        fetchAllShoes();
      } else if (status === "error") {
        message.error(`${info.file.name} Tải file thất bại.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onChangeImport = (value) => {
    setTypeImport(value);
  };

  const handleGetFileExample = () => {
    window.location.href =
      "http://localhost:8080/api/v1/shoe-detail/download-excel-template";
  };

  const handleGetFileError = () => {
    window.location.href =
      "http://localhost:8080/api/v1/admin/voucher-order/download-excel-file-error";
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title="Import Sản Phẩm"
        open={isModalImportOpen}
        cancelButtonProps={{ style: { marginTop: "1rem" } }}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        cancelText="Hủy"
        //   okButtonProps={{ disabled: dataImport.length < 1 }}
      >
        <Dragger {...UploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Nhấp hoặc kéo tệp vào khu vực này để tải lên
          </p>
          <p className="ant-upload-hint">
            Hỗ trợ XLSX. Nghiêm cấm tải lên dữ liệu công ty hoặc các tập tin bị
            cấm khác.
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
          <span>Tổng số bản ghi: {resultImport?.total ?? null}</span>
          <span>
            {resultImport?.fail > 0 ? (
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
            Thành công: {resultImport?.success ?? null}
          </span>
          <span style={{ color: "red" }}>
            Thất bại: {resultImport?.fail ?? null}
          </span>
        </div>
        <div>
          <form
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              textAlign: "center",
            }}
            onChange={(e) => onChangeImport(e.target.value)}
          >
            <label
              className="radio-inline"
              style={{
                display: "flex",

                textAlign: "center",
              }}
            >
              <input
                type="radio"
                name="optradio"
                value={0}
                checked={typeImport == 0}
                style={{ marginRight: "1rem" }}
              />
              Thêm mới
            </label>
            <label
              className="radio-inline"
              style={{
                display: "flex",

                textAlign: "center",
              }}
            >
              <input
                type="radio"
                name="optradio"
                value={1}
                checked={typeImport == 1}
                style={{ marginRight: "1rem" }}
              />
              Cập nhật
            </label>
          </form>
          {/* <span style={{ color: "green" }}>
            Thành công: {resultImport.success ?? null}
          </span>
          <span style={{ color: "red" }}>
            Thất bại: {resultImport.fail ?? null}
          </span> */}
        </div>
      </Modal>
    </>
  );
};
export default ImportShoes;
