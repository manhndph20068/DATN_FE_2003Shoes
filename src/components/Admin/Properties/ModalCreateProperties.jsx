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

const ModalCreateProperties = (props) => {
  const { isModalCreateOpen, setIsModalCreateOpen } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalCreateOpen(true);
  };

  const hideModal = () => {
    setIsModalCreateOpen(false);
  };

  const onFinish = (values) => {
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
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
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
