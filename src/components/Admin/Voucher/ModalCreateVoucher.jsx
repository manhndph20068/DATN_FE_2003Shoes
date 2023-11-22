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
import moment from "moment";
import { useState } from "react";
import { callAddVoucher } from "../../../services/api";

const ModalCreateVoucher = (props) => {
  const { setIsModalCreateOpen, isModalCreateOpen, handleFetchAllListVoucher } =
    props;
  const [typeOfReduce, setTypeOfReduce] = useState(0);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalCreateOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values) => {
    console.log("values", values);

    const formattedDates = values?.date?.map((item) => {
      const { $d } = item;
      const date = new Date($d);
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    });

    const startDate = formattedDates?.[0] ?? null;
    const endDate = formattedDates?.[1] ?? null;
    console.log("startDate", startDate);
    console.log("endDate", endDate);

    const data = {
      code: "",
      name: values.nameOfVoucher,
      quantity: values.quantity,
      discountAmount: values.discountAmount,
      minBillValue: values.minBillValue,
      startDate: startDate,
      endDate: endDate,
      reduceForm: values.reduceForm,
      maximumReductionValue: values.maximumReductionValue ?? null,
      status: 0,
    };
    console.log("data", data);

    const res = await callAddVoucher(data);
    console.log("res", res);
    if (res.status === 0) {
      handleFetchAllListVoucher();
      message.success(res.message);
      form.resetFields();
      setIsModalCreateOpen(false);
    } else {
      message.error(res.message);
      setIsModalCreateOpen(false);
    }
  };

  const optionTypeOfReduce = [
    {
      label: "Giảm theo phần trăm",
      value: 1,
    },
    {
      label: "Giảm theo tiền",
      value: 0,
    },
  ];

  return (
    <>
      <Modal
        title={<span style={{ fontWeight: "bold" }}>Tạo mới voucher</span>}
        open={isModalCreateOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Đồng ý"
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
                label="Tên voucher"
                name="nameOfVoucher"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên voucher!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên voucher" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Số lượng"
                labelCol={{ span: 24 }}
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập số lượng voucher"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={11}>
              <Form.Item
                label="Giá trị giảm"
                name="discountAmount"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá trị giảm!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập giá trị giảm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Giá trị tối thiểu của đơn hàng"
                name="minBillValue"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá trị tối thiểu của đơn hàng!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập giá trị tối thiểu của đơn hàng"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={11}>
              <Form.Item
                label="Hình thức giảm"
                name="reduceForm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức giảm!",
                  },
                ]}
                initialValue={typeOfReduce}
              >
                <Select
                  value={typeOfReduce}
                  options={optionTypeOfReduce}
                  onChange={(value) => {
                    setTypeOfReduce(value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Giá trị giảm tối đa"
                name="maximumReductionValue"
                rules={[
                  {
                    required: typeOfReduce === 0 ? false : true,
                    message: "Vui lòng nhập giá trị giảm tối đa!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập giá trị giảm tối đa"
                  style={{ width: "100%" }}
                  disabled={typeOfReduce === 0 ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Ngày bắt đầu - Ngày kết thúc"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input your Date!",
                  },
                ]}
              >
                <RangePicker
                  style={{ width: "100%" }}
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateVoucher;
