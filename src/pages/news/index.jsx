import React from "react";
import { Carousel, Button, Card, Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPhoneVolume,
  faTag,
  faShoePrints,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./new.scss";
const NewsPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "rgb(242, 242, 242)", padding: "20px" }}>
        <div
          className="container"
          style={{
            height: "600px",
            // backgroundColor: "red",
            borderRadius: "30px",
          }}
        >
          <div className="row">
            <Row gutter={16} style={{ marginTop: "40px" }}>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/1.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/2.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Những kiểu phối sneakers thẩm mỹ, nhìn mê ly
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/3.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    5 cách ‘mix’ giày sneakers cho phái đẹp
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/4.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Mỹ nhân phim ‘Bẫy tình yêu’ năng động
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/5.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Nike chi 162 triệu euro thuê Cristiano Ronaldo
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/6.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Ca sĩ HyunA – “Bom sex Hàn Quốc” với sneakers
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
            </Row>
            {/*  */}
            <Row gutter={16} style={{ marginTop: "40px" }}>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/7.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Phối đồ với sneakers với Hoàng tử Thái Lan
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/8.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    6 xu hướng sneakers khuynh đảo năm 2023
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/9.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Những đôi sneakers nổi tiếng được ưa chuộng
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/10.png"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Chàng trai sở hữu 800 đôi giày thể thao
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/11.jpg"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Lịch sử hình thành và phát triển của hãng giày converse
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  bordered={false}
                  className="cardTinTuc"
                  style={{ color: "#858997" }}
                >
                  <img
                    src="/src/assets/12.jpg"
                    alt="anh"
                    style={{
                      width: "120px",
                      height: "100px",
                      borderRadius: "20px",
                    }}
                  />
                  <p style={{ marginTop: "10px" }}>
                    Mẫu giày Nike mới ra được săn đón rất nhiều
                  </p>
                  {/* <p style={{ marginTop: "10px", fontSize: "14px" }}>
                    Street style ấn tượng ở London Fashion Week
                  </p> */}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsPage;
