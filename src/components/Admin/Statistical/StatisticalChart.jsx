import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import { callBestSaleProdByYear } from "../../../services/api";
import ProductsSoldDuringTheYear from "./ProductsSoldDuringTheYear";
import Top5ProductBestSale from "./Top5ProductBestSale";
import StatusOfOrder from "./StatusOfOrder";
import Revalue from "./Revalue";
import { ArrowRightOutlined } from "@ant-design/icons";
const StatisticalChart = () => {
  const [dataProductsSoldDuringTheYear, setDataProductsSoldDuringTheYear] =
    useState([]);
  const [dataTop5ProdBestSale, setDataTop5ProdBestSale] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataRevalueByYear, setDataRevalueByYear] = useState([]);

  return (
    <>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
          <ProductsSoldDuringTheYear
            data={dataProductsSoldDuringTheYear}
            setData={setDataProductsSoldDuringTheYear}
          />
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
          <Top5ProductBestSale
            data={dataTop5ProdBestSale}
            setData={setDataTop5ProdBestSale}
          />
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
          <StatusOfOrder data={dataOrder} setData={setDataOrder} />
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ backgroundColor: "white", padding: "1.5rem" }}>
          <Revalue data={dataRevalueByYear} setData={setDataRevalueByYear} />
        </div>
      </div>
    </>
  );
};
export default StatisticalChart;
