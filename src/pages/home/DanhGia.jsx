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
const DanhGia = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row">
          <div className="col-2">
            <h4>ĐÁNH GIÁ</h4>
          </div>
          <div className="col-9" style={{ marginLeft: "80px" }}>
            <hr />
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default DanhGia;
