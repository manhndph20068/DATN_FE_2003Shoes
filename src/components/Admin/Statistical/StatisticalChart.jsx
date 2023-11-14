import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { callBestSaleProdByYear } from "../../../services/api";

const StatisticalChart = () => {
  const [data, setData] = useState([]);

  const handleGetListSanPhamBanChay = async () => {
    const res = await callBestSaleProdByYear(2023);
    console.log(res);
    if (res?.status === 0) {
      console.log("res?.data", res?.data);
      setData(res?.data);
    }
  };

  useEffect(() => {
    handleGetListSanPhamBanChay();
  }, []);

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
  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
        {/* {listSAnPhamBanChay && listSAnPhamBanChay.length > 0 && (
          <Column {...config} />
        )} */}
        <Column {...config} />
      </div>
    </div>
  );
};
export default StatisticalChart;
