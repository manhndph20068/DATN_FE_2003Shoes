import React from "react";
import { Carousel, Button, Card, Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPhoneVolume,
  faTag,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { callGetTop4News } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
const SanPhamMoiNhat = (props) => {
  const { convertSlug } = props;
  const [listProd, setListProd] = useState([]);
  const navigate = useNavigate();

  const handleGetlistTop4ProdNews = async () => {
    const res = await callGetTop4News();
    if (res?.status === 0) {
      setListProd(res.data);
    }
  };

  useEffect(() => {
    handleGetlistTop4ProdNews();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <h4>SẢN PHẨM MỚI NHẤT</h4>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            {listProd.map((item) => {
              return (
                <Col span={6}>
                  <Card title={false} bordered={false}>
                    <img
                      src={item?.thumbnail}
                      alt="anh"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        backgroundColor: "red",
                        objectFit: "contain",
                      }}
                    />
                    <p>{item?.code.toUpperCase()}</p>
                    <p style={{ fontWeight: "bold" }}>
                      {" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item?.priceInput)}
                    </p>
                    <Button
                      style={{
                        backgroundColor: "#33CCFF",
                        color: "#666666",
                        borderRadius: "50px",
                      }}
                      onClick={() => {
                        navigate(
                          `/shoe/${convertSlug(item?.nameShoe)}?id=${item?.id}`
                        );
                      }}
                    >
                      Chi tiết
                    </Button>
                  </Card>
                </Col>
              );
            })}
            {/* <Col span={6}>
              <Card title="Card title" bordered={false}>
                <img src="" alt="anh" />
                <p>Tên sản phẩm</p>
                <p>Mô tả</p>
                <Button
                  style={{
                    backgroundColor: "#33CCFF",
                    color: "#666666",
                    borderRadius: "50px",
                  }}
                >
                  Chi tiết
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                <img src="" alt="anh" />
                <p>Tên sản phẩm</p>
                <p>Mô tả</p>
                <Button
                  style={{
                    backgroundColor: "#33CCFF",
                    color: "#666666",
                    borderRadius: "50px",
                  }}
                >
                  Chi tiết
                </Button>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                <img src="" alt="anh" />
                <p>Tên sản phẩm</p>
                <p>Mô tả</p>
                <Button
                  style={{
                    backgroundColor: "#33CCFF",
                    color: "#666666",
                    borderRadius: "50px",
                  }}
                >
                  Chi tiết
                </Button>
              </Card>
            </Col> */}
          </Row>
        </div>
      </div>
    </>
  );
};
export default SanPhamMoiNhat;
