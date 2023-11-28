import { Divider, Input, Modal, Form } from "antd";
import { useState } from "react";
import {
  callDeleteOrder,
  callUpdateNewOrderAtCounter,
} from "../../../services/api";
import { useSelector } from "react-redux";

const CancelOrder = (props) => {
  const { openModalCancelOrder, setOpenModalCancelOrder, dataOrder } = props;
  const [form] = Form.useForm();
  const staffName = useSelector((state) => state.account.user.name);

  const hideModal = () => {
    setOpenModalCancelOrder(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("dataOrder", dataOrder);
    const data = {
      id: dataOrder.id,
      idVoucher: dataOrder?.voucherOrder?.id ?? null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder.customerName ?? null,
      phoneNumber: dataOrder.phoneNumber ?? null,
      address: dataOrder.address ?? null,
      shipFee: dataOrder.shipFee ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: dataOrder.totalMoney,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: staffName ?? null,
      note: values.reason,
      status: 3,
    };
    console.log("data", data);
    callDeleteOrder(data);
    window.location.reload();
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Modal
      </Button> */}
      <Modal
        title="Bạn có muốn huỷ hoá đơn này không?"
        open={openModalCancelOrder}
        onOk={() => {
          form.submit();
        }}
        onCancel={hideModal}
        okText="Đồng ý"
        cancelText="Không"
      >
        <Divider />
        <Form
          form={form}
          labelAlign="left"
          labelCol={24}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Lý do huỷ hoá đơn"
            name="reason"
            rules={[
              { required: true, message: "Vui lòng nhập lý do hủy đơn!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CancelOrder;
