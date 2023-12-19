import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar, DualAxes } from "@ant-design/plots";
import { DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import {
  callGetRevalueByYear,
  callGetRevalueByYearWithoutType,
  callGetTop5Prod,
} from "../../../services/api";
const Revalue = (props) => {
  const { data, setData } = props;
  const [year, setYear] = useState("2023");
  const [type, setType] = useState(null);
  const [form] = Form.useForm();
  // const { RangePicker } = DatePicker;

  const handleGetRevalue = async () => {
    if (type === null) {
      const res = await callGetRevalueByYearWithoutType(year);
      console.log(res);
      if (res?.status === 0) {
        console.log("res?.data", res?.data);
        setData(res?.data);
      }
      if (res?.status === 4) {
        console.log("res?.data", res?.data);
        setData(res?.data);
      }
    } else {
      const res = await callGetRevalueByYear(year, type);
      console.log(res);
      if (res?.status === 0) {
        console.log("res?.data", res?.data);
        setData(res?.data);
      }
      if (res?.status === 4) {
        console.log("res?.data", res?.data);
        setData(res?.data);
      }
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
  }, [year, type]);

  const config = {
    data: [data, data],
    xField: "time",
    yField: ["tien", "soLuong"],
    geometryOptions: [
      {
        geometry: "column",
        pattern: {
          type: "line",
        },
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
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
              <h5>Thống kê doanh thu theo tháng</h5>
            </div>
            <div>
              <p style={{ marginBottom: "10px" }}>Chọn năm: </p>
              <Form>
                <Row style={{ display: "flex", gap: 10 }}>
                  <Form.Item initialValue={dayjs(year, "YYYY")}>
                    <DatePicker
                      onChange={onChangeYear}
                      picker="year"
                      value={dayjs(year, "YYYY") ?? null}
                      clearIcon={null}

                      //   inputFormat="YYYY"
                      //   renderInput={(params) => (
                      //     <TextField {...params} helperText={null} />
                      //   )}
                    />
                  </Form.Item>
                  <Form.Item placeholder="Tất cả">
                    <Select
                      style={{
                        marginTop: "0px",
                        width: "100px",
                      }}
                      optionFilterProp="children"
                      onChange={onChangeType}
                      value={type}
                      options={[
                        {
                          value: null,
                          label: "Tất cả",
                        },
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
          </div>
          <DualAxes {...config} />
        </div>
      </div>
    </>
  );
};
export default Revalue;
