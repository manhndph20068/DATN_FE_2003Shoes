import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar, DualAxes } from "@ant-design/plots";
import { DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import {
  callGetMonthlyRevenue,
  callGetRevalueByYear,
  callGetRevalueCurrent,
  callGetTop5Prod,
  callGetYearlyRevenue,
} from "../../../services/api";
import "./Statistical.scss";
const YearlyRevanue = (props) => {
  const [totalPrice, setTotalPrice] = useState(null);
  const [type, setType] = useState(1);
  const [totalOrder, setTotalOrder] = useState(null);
  const [form] = Form.useForm();
  // const { RangePicker } = DatePicker;

  const handleGetRevalue = async () => {
    const res = await callGetYearlyRevenue(type);
    console.log(res?.data.tongTien);
    if (res?.status === 0) {
      console.log("res?.data", res?.data);
      setTotalPrice(res?.data[0].tongTien);
      setTotalOrder(res?.data[0].soHoaDon);
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
      <div className="statistical">
        <div className="type">
          <Form>
            <Row style={{ display: "flex", gap: 10 }}>
              <Form.Item style={{ marginTop: "10px" }}>
                <span style={{ marginLeft: "5px", marginBottom: "10px" }}>
                  Doanh Thu Năm Nay:
                </span>
                <Select
                  style={{ marginTop: "10px", width: "200px" }}
                  placeholder="Select type"
                  optionFilterProp="children"
                  onChange={onChangeType}
                  value={type}
                  options={[
                    {
                      value: 1,
                      label: "Tại quầy",
                      // style: { backgroundColor: "#3498db", color: "white" },
                    },
                    {
                      value: 2,
                      label: "Online",
                      // style: { backgroundColor: "#2ecc71", color: "white" },
                    },
                  ]}
                />
              </Form.Item>
            </Row>
          </Form>
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            Tổng tiền:{" "}
            <span style={{ fontWeight: "bold" }}>
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice ?? 0)}
            </span>
          </span>
          <br />
          <br />
          <span style={{ marginLeft: "10px", marginTop: "10px" }}>
            Tổng đơn hàng:{" "}
            <span style={{ fontWeight: "bold" }}>{totalOrder ?? 0} đơn</span>
          </span>
        </div>
      </div>
    </>
  );
};
export default YearlyRevanue;