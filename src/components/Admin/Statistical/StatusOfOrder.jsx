import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar, Pie } from "@ant-design/plots";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import {
  callGetOrderStatistical,
  callGetTop5Prod,
} from "../../../services/api";

const StatusOfOrder = (props) => {
  const { data, setData } = props;
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const handleGetListTop5 = async () => {
    const res = await callGetOrderStatistical(startDate, endDate);
    console.log(res);
    if (res?.status === 0) {
      console.log("res?.data", res?.data);
      setData(res?.data);
    }
    if (res?.status === 4) {
      console.log("res?.data", res?.data);
      setData(res?.data);
    }
  };

  useEffect(() => {
    handleGetListTop5();
  }, [startDate, endDate]);

  const config = {
    appendPadding: 10,
    data,
    angleField: "values",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  const onChange = (date, dateString) => {
    console.log(dateString[0], dateString[1]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  return (
    <>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
          <div style={{ paddingBottom: "3rem" }}>
            <div
              style={{
                paddingBottom: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3>Thống kê hoá đơn</h3>
            </div>
            <div>
              <Form>
                <Form.Item>
                  <RangePicker
                    allowClear={false}
                    onChange={onChange}
                    format="YYYY-MM-DD"
                    value={[
                      dayjs(startDate, "YYYY-MM-DD"),
                      dayjs(endDate, "YYYY-MM-DD"),
                    ]}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>

          <Pie {...config} />
        </div>
      </div>
    </>
  );
};
export default StatusOfOrder;
