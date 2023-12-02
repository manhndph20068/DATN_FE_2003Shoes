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
      const listVoucherActive = res?.data?.filter((item) => item?.status === 1);
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
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <div style={{ padding: "0 1rem", margin: "0 auto" }}>
          <Row gutter={[25, 20]}>
            {listVoucher?.length > 0 &&
              listVoucher?.map((item) => {
                console.log("item", item);
                return (
                  <Col lg={8} md={12} sm={24} xs={24}>
                    <Card title={item?.code}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {" "}
                          <p>Tên voucher: {item?.name}</p>
                        </span>
                        <span>
                          {" "}
                          <p>Số lượng {item?.quantity}</p>
                        </span>
                      </div>

                      <p>
                        Hoá đơn tối thiểu:{" "}
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item?.minBillValue)}
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
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              item?.maximumReductionValue ??
                                item?.discountAmount
                            )}
                          </p>
                        </span>
                        <span>
                          {item?.reduceForm === 1 && (
                            <p>Số tiền giảm: {item?.discountAmount} %</p>
                          )}
                          {item?.reduceForm === 0 && (
                            <p>
                              Số tiền giảm:{" "}
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item?.discountAmount)}{" "}
                            </p>
                          )}
                        </span>
                      </div>

                      <p>Ngày kết thúc: {item?.endDate}</p>
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
