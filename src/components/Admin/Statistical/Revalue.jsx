import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar, DualAxes } from "@ant-design/plots";
import { DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import { callGetRevalueByYear, callGetTop5Prod } from "../../../services/api";

const Revalue = (props) => {
  const { data, setData } = props;
  const [year, setYear] = useState("2023");
  const [type, setType] = useState(1);
  const [form] = Form.useForm();
  // const { RangePicker } = DatePicker;

  const handleGetRevalue = async () => {
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
    yField: ["value", "count"],
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
              <h3>Thống kê doanh thu theo năm</h3>
            </div>
            <div>
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
          </div>
          <DualAxes {...config} />
        </div>
      </div>
    </>
  );
};
export default Revalue;
