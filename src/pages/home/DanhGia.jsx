import React from "react";
import { Carousel, Button, Card, Col, Row, Rate } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPhoneVolume,
  faTag,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { callGetTop3Comment } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
const DanhGia = () => {
  const [listComment, setListComment] = useState([]);

  const handleGetListComment = async () => {
    const res = await callGetTop3Comment();
    if (res?.length > 0) {
      setListComment(res);
    }
  };

  useEffect(() => {
    handleGetListComment();
  }, []);

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
            {listComment.map((item, index) => {
              return (
                <Col span={8}>
                  <Card title={false} bordered={false}>
                    <div className={`content-${index}`}>
                      <div
                        className="name"
                        style={{
                          display: "flex",
                          gap: "1rem",
                          // fontSize: "large",
                          color: "#707072",
                          textAlign: "center",
                        }}
                      >
                        <span>
                          <div className="user-name">{item?.nameAccount}</div>
                        </span>
                        <span>
                          <div className="date">{item?.date}</div>
                        </span>
                      </div>

                      <div className="rate">
                        <span className="star">
                          <Rate
                            disabled
                            value={item?.start}
                            autoFocus={false}
                          />
                        </span>
                      </div>
                      <div
                        className="content-rate"
                        style={{ marginTop: "0.5rem" }}
                      >
                        <p>{item?.content}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}

            {/* <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col> */}
          </Row>
        </div>
      </div>
    </>
  );
};
export default DanhGia;
