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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { callUpdateVoucher } from "../../../services/api";

const ModalUpdateVoucher = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    handleFetchAllListVoucher,
  } = props;
  const [typeOfReduce, setTypeOfReduce] = useState(0);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

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

  const handleCancel = () => {
    form.resetFields();
    setIsModalUpdateOpen(false);
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
      id: values.id,
      code: values.code,
      name: values.name,
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

    const res = await callUpdateVoucher(data);
    console.log("res", res);
    if (res.status === 0) {
      handleFetchAllListVoucher();
      message.success(res.message);
      form.resetFields();
      setIsModalUpdateOpen(false);
    } else {
      message.error(res.message);
      setIsModalUpdateOpen(false);
    }
  };

  useEffect(() => {
    console.log("dataUpdate", dataUpdate);
    const initForm = {
      id: dataUpdate?.id,
      code: dataUpdate?.code,
      createDate: dataUpdate?.startDate,
      discountAmount: dataUpdate?.discountAmount,
      endDate: dataUpdate?.endDate,
      id: dataUpdate?.id,
      maximumReductionValue: dataUpdate?.maximumReductionValue,
      minBillValue: dataUpdate?.minBillValue,
      name: dataUpdate?.name,
      quantity: dataUpdate?.quantity,
      reduceForm: dataUpdate?.reduceForm,
      startDate: dataUpdate?.startDate,
      status: dataUpdate?.status,
      date: [dayjs(dataUpdate?.startDate), dayjs(dataUpdate?.endDate)],
    };
    form.setFieldsValue(initForm);
    console.log("initForm", initForm);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title={<span style={{ fontWeight: "bold" }}>Cập nhật voucher</span>}
        open={isModalUpdateOpen}
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
                initialValue={dataUpdate?.code}
                name="code"
                hidden
              ></Form.Item>
              <Form.Item
                initialValue={dataUpdate?.id}
                name="id"
                hidden
              ></Form.Item>
              <Form.Item
                label="Tên voucher"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên voucher!",
                  },
                ]}
                // initialValue={dataUpdate?.name}
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
                // initialValue={dataUpdate?.quantity}
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
                // initialValue={dataUpdate?.discountAmount}
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
                // initialValue={dataUpdate?.minBillValue}
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
                // initialValue={dataUpdate?.reduceForm}
              >
                <Select
                  value={typeOfReduce}
                  options={optionTypeOfReduce}
                  onChange={(value) => {
                    {
                      form.setFieldValue("maximumReductionValue", null);
                      setTypeOfReduce(value);
                    }
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
                // initialValue={dataUpdate?.maximumReductionValue}
              >
                <InputNumber
                  placeholder="Nhập giá trị giảm tối đa"
                  max={90}
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
                // initialValue={[
                //   dayjs(dataUpdate?.startDate),
                //   dayjs(dataUpdate?.endDate),
                // ]}
              >
                <RangePicker
                  //   defaultValue={[
                  //     moment(dataUpdate?.startDate),
                  //     moment(dataUpdate?.endDate),
                  //   ]}
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
export default ModalUpdateVoucher;
