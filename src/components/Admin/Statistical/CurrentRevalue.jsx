import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar, DualAxes } from "@ant-design/plots";
import { DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import {
  callGetRevalueByYear,
  callGetRevalueCurrent,
  callGetTop5Prod,
} from "../../../services/api";

const CurrentRevalue = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [type, setType] = useState(1);
  const [totalOrder, setTotalOrder] = useState(null);
  const [form] = Form.useForm();
  // const { RangePicker } = DatePicker;

  const handleGetRevalue = async () => {
    const res = await callGetRevalueCurrent(type);
    console.log(res?.data.tongTien);
    if (res?.status === 0) {
      console.log("res?.data", res?.data);
      setTotalPrice(res?.data[0].tongTien);
      setTotalOrder(res?.data[0].soLuongHangHoa);
    }
  };

  const onChangeType = (value) => {
    console.log(value);
    setType(value);
  };

  const onChangeYear = (date, dateString) => {
    setYear(dateString);
  };

  useEffect(() => {
    handleGetRevalue();
  }, [type]);

  return (
    <>
      <div>
        <Form>
          <Row style={{ display: "flex", gap: 10 }}>
            <Form.Item>
              <Select
                placeholder="Select type"
                optionFilterProp="children"
                onChange={onChangeType}
                value={type}
                options={[
                  {
                    value: 1,
                    label: "Tại quầy",
                  },
                  {
                    value: 2,
                    label: "Online",
                  },
                ]}
              />
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div>
        <span>Tổng tiền {totalPrice ?? 0}</span>
        <br />
        <span>Tổng đơn hàng {totalOrder ?? 0}</span>
      </div>
    </>
  );
};
export default CurrentRevalue;
