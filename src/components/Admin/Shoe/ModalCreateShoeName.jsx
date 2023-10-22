import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  notification,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { callCreateNewShoeName } from "../../../services/api";

const ModalCreateShoeName = (props) => {
  const {
    openModalCreateNameShoe,
    setOpenModalCreateNameShoe,
    fetchNameShoe,
    shoeNameSelected,
  } = props;
  const [formCreateNewShoe] = Form.useForm();

  const onFinish = async (values) => {
    const res = await callCreateNewShoeName(values.shoeName);
    console.log("res callCreateNewShoeName: ", res);
    if (res?.data?.id) {
      message.success("Create new shoe name success");
      formCreateNewShoe.resetFields();
      fetchNameShoe();
    } else {
      notification.error({
        message: "Create new shoe name fail",
        description: res?.message,
      });
    }
    setOpenModalCreateNameShoe(false);
  };

  const handleCancel = () => {
    setOpenModalCreateNameShoe(false);
    formCreateNewShoe.resetFields();
  };

  // useEffect(() => {
  //   formCreateNewShoe.resetFields();
  // }, [shoeNameSelected]);
  return (
    <>
      <Modal
        title="Create a new Shoe"
        open={openModalCreateNameShoe}
        onOk={() => {
          formCreateNewShoe.submit();
        }}
        onCancel={handleCancel}
        closable={false}
        maskClosable={false}
      >
        <Divider />
        <Form
          form={formCreateNewShoe}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên giày"
            name="shoeName"
            rules={[
              { required: true, message: "Please input your shoe name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateShoeName;
