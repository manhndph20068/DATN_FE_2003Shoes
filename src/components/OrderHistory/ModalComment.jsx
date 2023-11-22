import React, { useState } from "react";

import { Button, Modal, Rate, Form, Input, message } from "antd";
import { callDoAddComment } from "../../services/api";
import { useSelector } from "react-redux";

const ModalComment = (props) => {
  const {
    openModalComment,
    setOpenModalComment,
    idOrder,
    idShoeDetail,
    handleGetOrder,
  } = props;
  const [form] = Form.useForm();
  const [value, setValue] = useState(5);
  const dataAcc = useSelector((state) => state?.account?.user);

  const showModal = () => {
    setOpenModalComment(true);
  };
  const onFinish = async (values) => {
    const data = {
      idAccount: dataAcc?.id,
      idOrder: idOrder,
      idShoeDetail: idShoeDetail,
      stars: value,
      content: values?.content,
    };
    console.log("data", data);
    const res = await callDoAddComment(data);
    if (res?.status === 0) {
      handleGetOrder();
      hideModal();
      message.success("Đánh giá thành công");
      window.location.reload();
    }
  };

  const hideModal = () => {
    setOpenModalComment(false);
    setValue(5);
    form.resetFields();
  };

  const onChangeStars = (value) => {
    console.log("value", value);
    setValue(value);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Modal
      </Button> */}
      <Modal
        maskClosable={false}
        title="Đánh giá sản phẩm"
        open={openModalComment}
        onOk={() => form.submit()}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Rate value={value} onChange={(values) => onChangeStars(values)} />
        </div>

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung đánh giá" },
            ]}
          >
            <Input.TextArea placeholder="Nội dung đánh giá" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalComment;
