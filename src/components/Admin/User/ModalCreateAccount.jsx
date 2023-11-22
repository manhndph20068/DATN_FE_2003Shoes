import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { callAddNewAcc } from "../../../services/api";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const ModalCreateAccount = (props) => {
  const {
    isModalCreateOpen,
    setIsModalCreateOpen,
    roleId,
    handleFetchAllListAcc,
  } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [base64Url, setBase64Url] = useState(null);

  const hideModal = () => {
    form.resetFields();
    setFileList([]);
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values) => {
    console.log("values", values);
    console.log("roleId", roleId);
    console.log("fileList", fileList[0]?.name);

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      roleId: roleId,
      status: 1,
      avatar: fileList[0]?.name,
    };
    console.log("data", data);

    const res = await callAddNewAcc(data);
    console.log("res", res);
    if (res.status === 0) {
      handleFetchAllListAcc();
      message.success(res.message);
      hideModal();
    } else {
      message.error("Thêm thất bại");
      setIsModalCreateOpen(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadFileSlider = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64Url(event.target.result);

      if (file?.name !== null) {
        setFileList([
          {
            name: file.name,
            uid: file.uid,
            size: file.size,
            type: file.type,
            thumbUrl: event.target.result,
          },
        ]);
        onSuccess("ok");
      } else {
        onError("Đã có lỗi khi upload file");
      }
    };
    reader.onerror = (event) => {
      console.error("file reading error", event);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (file) => {
    setFileList([]);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
          Modal
        </Button> */}
      <Modal
        title="Thêm mới tài khoản"
        open={isModalCreateOpen}
        onOk={() => form.submit()}
        onCancel={hideModal}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={11}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Email"
                labelCol={{ span: 24 }}
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Avatar"
            labelCol={{ span: 24 }}
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your avatar!",
              },
            ]}
          >
            <Upload
              multiple={false}
              maxCount={1}
              name="avatar"
              listType="picture"
              // showUploadList={false}
              fileList={fileList}
              className="avatar-uploader"
              customRequest={(info) => handleUploadFileSlider(info)}
              beforeUpload={beforeUpload}
              // onChange={(info) => handleChange(info, "slider")}
              onRemove={(file) => handleRemoveFile(file)}
            >
              {/* <div>
                {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div> */}
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateAccount;
