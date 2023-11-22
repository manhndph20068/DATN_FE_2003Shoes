import React, { useEffect, useState } from "react";

import { Button, Modal, Rate, Form, Input, message } from "antd";
import { callDoAddComment, callGetHistoryComment } from "../../services/api";
import { useSelector } from "react-redux";

const ModalHistoryComment = (props) => {
  const {
    openModalHistoryComment,
    setOpenModalHistoryComment,
    idOrder,
    idShoeDetail,
    handleGetOrder,
  } = props;
  const [form] = Form.useForm();
  const [value, setValue] = useState(5);
  const dataAcc = useSelector((state) => state?.account?.user);

  const showModal = () => {
    setOpenModalHistoryComment(true);
  };

  useEffect(() => {
    handleGetHistoryComment();
  }, [idShoeDetail]);

  const handleGetHistoryComment = async () => {
    const data = {
      idOrder: idOrder,
      idShoeDetail: idShoeDetail,
    };
    const res = await callGetHistoryComment(data);
    console.log("res", res);
    if (res?.status === 0) {
      setValue(res.data.start);
      form.setFieldsValue({
        content: res.data.content,
      });
    }
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
    setOpenModalHistoryComment(false);
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
        open={openModalHistoryComment}
        okButtonProps={{ style: { display: "none" } }}
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
          <Rate
            disabled
            value={value}
            onChange={(values) => onChangeStars(values)}
          />
        </div>

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung đánh giá" },
            ]}
          >
            <Input.TextArea placeholder="Nội dung đánh giá" disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalHistoryComment;
