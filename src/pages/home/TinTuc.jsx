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
const TinTuc = () => {
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        <div className="row">
          <div className="col-3">
            <h4>TIN TỨC</h4>
          </div>
          <div className="col-8">
            <hr />
          </div>
          <div className="col-1">
            <Button
              style={{
                backgroundColor: "#33CCFF",
                color: "#666666",
                borderRadius: "50px",
              }}
            >
              Xem thêm
            </Button>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col span={4}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>

            <Col span={4}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={4}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={4}>
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
export default TinTuc;
