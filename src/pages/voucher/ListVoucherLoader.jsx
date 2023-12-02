import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { callGetListVoucher } from "../../services/api";

const ListVoucherLoader = () => {
  const [listVoucher, setListVoucher] = useState([{}, {}, {}, {}, {}, {}]);

  //   const handleGetListVoucher = async () => {
  //     const res = await callGetListVoucher({
  //       page: 1,
  //       size: 1000,
  //     });
  //     console.log("res handleGetListVoucher", res);
  //     if (res?.status === 0) {
  //       const listVoucherActive = res?.data?.filter((item) => item?.status === 1);
  //       setListVoucher(listVoucherActive);
  //     }
  //   };

  //   useEffect(() => {
  //     handleGetListVoucher();
  //   }, []);

  return (
    <div className="layout-page">
      <div
        className="voucher-page-container"
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <div style={{ padding: "0 1rem", margin: "0 auto" }}>
          <Row gutter={[25, 20]}>
            {listVoucher?.map((item) => {
              console.log("item", item);
              return (
                <Col lg={8} md={12} sm={24} xs={24}>
                  <Card loading>
                    <p>Tên voucher</p>
                    <p>Tên voucher</p>
                    <p>Tên voucher</p>
                    <p>Tên voucher</p>
                    <p>Tên voucher</p>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};
export default ListVoucherLoader;
