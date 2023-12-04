import { Button, Card, Col, Result, Row } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { callGetListVoucher } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ListVoucherLoader from "./ListVoucherLoader";

const VoucherPage = () => {
  const [listVoucher, setListVoucher] = useState([]);

  const navigate = useNavigate();

  const handleGetListVoucher = async () => {
    const res = await callGetListVoucher({
      page: 1,
      size: 1000,
    });
    console.log("res handleGetListVoucher", res);
    if (res?.status === 0) {
      const listVoucherActive = res?.data?.filter(
        (item) => item?.status === 1 && item?.quantity > 0
      );
      setListVoucher(listVoucherActive);
    } else {
    }
  };

  // useEffect(() => {
  //   handleGetListVoucher();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      handleGetListVoucher();
    }, 1000);
  }, []);

  return (
    <div className="layout-page">
      <div
        className="voucher-page-container"
        style={{
          maxWidth: 1290,
          margin: "0 auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div style={{ padding: "0 1rem", margin: "0 auto" }}>
          <Row gutter={[25, 20]}>
            {listVoucher?.length > 0 &&
              listVoucher?.map((item) => {
                console.log("item", item);
                return (
                  <Col lg={8} md={12} sm={24} xs={24}>
                    <Card title={item?.code} className="cardVoucher">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {" "}
                          <p>
                            Tên voucher:{" "}
                            <span>
                              <i>{item?.name}</i>
                            </span>
                          </p>
                        </span>
                        <span>
                          {" "}
                          <p>
                            Số lượng:{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {item?.quantity}
                            </span>
                          </p>
                        </span>
                      </div>

                      <p>
                        Hoá đơn tối thiểu:{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item?.minBillValue)}
                        </span>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {" "}
                          <p>
                            Giá trị giảm tối đa:{" "}
                            <span
                              style={{ fontWeight: "bold", color: "green" }}
                            >
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(
                                item?.maximumReductionValue ??
                                  item?.discountAmount
                              )}
                            </span>
                          </p>
                        </span>
                        <span>
                          {item?.reduceForm === 1 && (
                            <p>
                              Số tiền giảm:{" "}
                              <span
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                {item?.discountAmount} %
                              </span>
                            </p>
                          )}
                          {item?.reduceForm === 0 && (
                            <p>
                              Số tiền giảm:{" "}
                              <span
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                {Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item?.discountAmount)}{" "}
                              </span>
                            </p>
                          )}
                        </span>
                      </div>

                      <p>
                        Ngày kết thúc:{" "}
                        <span style={{ color: "red" }}>{item?.endDate}</span>
                      </p>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      {listVoucher?.length === 0 && (
        // <div style={{ margin: "0 auto" }}>
        //   <Result
        //     status="404"
        //     title="Không có voucher nào!"
        //     extra={
        //       <Button type="primary" onClick={() => navigate("/")}>
        //         Trang chủ
        //       </Button>
        //     }
        //   />
        // </div>
        <ListVoucherLoader />
      )}
    </div>
  );
};
export default VoucherPage;
