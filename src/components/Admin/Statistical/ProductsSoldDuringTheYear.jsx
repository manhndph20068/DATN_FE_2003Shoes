import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { callBestSaleProdByYear } from "../../../services/api";
import { DatePicker, Form } from "antd";
import moment from "moment";
import dayjs from "dayjs";

const ProductsSoldDuringTheYear = (props) => {
  const { data, setData } = props;
  const [year, setYear] = useState("2023");
  const [form] = Form.useForm();

  const handleGetListSanPhamBanChay = async () => {
    const res = await callBestSaleProdByYear(year);
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
    handleGetListSanPhamBanChay();
  }, [year]);

  const config = {
    data,
    xField: "type",
    yField: "values",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      values: {
        alias: "San pham",
      },
    },
  };

  const onChange = (date, dateString) => {
    setYear(dateString);
  };

  return (
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
            <h3>Thống kê sản phẩm đã bán theo năm</h3>
          </div>
          <div>
            <Form>
              <Form.Item initialValue={dayjs(year, "YYYY")}>
                <DatePicker
                  onChange={onChange}
                  picker="year"
                  value={dayjs(year, "YYYY") ?? null}
                  clearIcon={null}

                  //   inputFormat="YYYY"
                  //   renderInput={(params) => (
                  //     <TextField {...params} helperText={null} />
                  //   )}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <Column {...config} />
      </div>
    </div>
  );
};
export default ProductsSoldDuringTheYear;
