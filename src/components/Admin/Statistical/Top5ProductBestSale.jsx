import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { callGetTop5Prod } from "../../../services/api";

const Top5ProductBestSale = (props) => {
  const { data, setData } = props;
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const handleGetListTop5 = async () => {
    const res = await callGetTop5Prod(startDate, endDate);
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
    data,
    xField: "soLuong",
    yField: "tenSanPham",
    seriesField: "tenSanPham",
    legend: {
      position: "top-left",
    },
    label: {
      // position: "middle",
      // content: function content(item) {
      //   return "".concat(item.y.toFixed(2), "%");
      // },
      style: { fill: "#000" },
    },
    colorField: "type", // or seriesField in some cases
    color: ["#19CDD7", "#DDB27C", "#d62728", "#2ca02c", "#000000"],
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
              <h3>Top 5 sản phẩm bán chạy</h3>
            </div>
            <div>
              <p style={{ marginBottom: "10px" }}>Chọn khoảng ngày: </p>
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

          <Bar {...config} />
        </div>
      </div>
    </>
  );
};
export default Top5ProductBestSale;
