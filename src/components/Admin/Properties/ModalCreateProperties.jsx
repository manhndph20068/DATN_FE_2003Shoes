import React, { useState } from "react";

import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import {
  callCreateNewBrand,
  callCreateNewCategory,
  callCreateNewColor,
  callCreateNewSize,
  callCreateNewSole,
} from "../../../services/api";

const ModalCreateProperties = (props) => {
  const {
    isModalCreateOpen,
    setIsModalCreateOpen,
    currentProperties,
    handleGetListProperties,
  } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const hideModal = () => {
    setIsModalCreateOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (currentProperties === 1) {
      const res = callCreateNewCategory(values?.name);
      if (res.status === 0) {
        message.success("Thêm mới thành công");
        setIsModalCreateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Thêm mới thất bại");
        setIsModalCreateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 2) {
      const res = callCreateNewBrand(values?.name);
      if (res.status === 0) {
        message.success("Thêm mới thành công");
        setIsModalCreateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Thêm mới thất bại");
        setIsModalCreateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 3) {
      const res = callCreateNewSole(values?.name);
      if (res.status === 0) {
        message.success("Thêm mới thành công");
        setIsModalCreateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Thêm mới thất bại");
        setIsModalCreateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 4) {
      const res = callCreateNewSize(values?.name);
      if (res.status === 0) {
        message.success("Thêm mới thành công");
        setIsModalCreateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Thêm mới thất bại");
        setIsModalCreateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 5) {
      const res = callCreateNewColor(values?.name);
      if (res.status === 0) {
        message.success("Thêm mới thành công");
        setIsModalCreateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Thêm mới thất bại");
        setIsModalCreateOpen(false);
        form.resetFields();
      }
    }
    console.log("values", values);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Modal
      </Button> */}
      <Modal
        title="Thêm mới"
        open={isModalCreateOpen}
        onOk={() => form.submit()}
        maskClosable={false}
        onCancel={hideModal}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24}>
              <Form.Item
                label="Tên "
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên !",
                  },
                  {
                    pattern: /^[^\s]*$/,
                    message: "Không được nhập khoảng trắng!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên " />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateProperties;
