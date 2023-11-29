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
const SanPhamMoiNhat = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <h4>SẢN PHẨM MỚI NHẤT</h4>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
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
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default SanPhamMoiNhat;
