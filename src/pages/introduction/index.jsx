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
import "./introduction.scss";
import { useNavigate } from "react-router-dom";
const IntroductionPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(242, 242, 242)",
          padding: "20px",
        }}
      >
        {/* gioi thieu */}
        <div
          className="container"
          style={{
            paddingTop: "50px",
            paddingBottom: "50px",
            backgroundColor: "white",
            borderRadius: "50px",
          }}
        >
          <div className="row">
            <div className="col-6">
              <img
                src="/src/assets/logo2003Shoes.png"
                alt="logo"
                style={{ height: "300px", marginTop: "100px" }}
              />
            </div>
            <div className="col-6">
              <div className="row">
                <h6 style={{ color: "rgb(99, 190, 246)" }}>2003SHOES STORE</h6>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <h3 style={{ fontWeight: "bold" }}>2003SHOES STORE</h3>
              </div>
              <div
                className="row"
                style={{ marginTop: "20px", width: "500px" }}
              >
                <p style={{ color: "rgb(133, 137, 151)" }}>
                  Chào mừng bạn đến với 2003Shoes Store - nơi tuyệt vời để khám
                  phá và sắm lựa những đôi giày phong cách nhất! Chúng tôi tự
                  hào là địa chỉ đáng tin cậy dành cho những người yêu thời
                  trang và chất lượng, mang đến trải nghiệm mua sắm trực tuyến
                  độc đáo và thoải mái.
                </p>
              </div>
              <div className="row" style={{ width: "500px" }}>
                <p style={{ color: "rgb(133, 137, 151)" }}>
                  <span style={{ fontWeight: "bold" }}>Về Chúng Tôi:</span>{" "}
                  2003Shoes Store không chỉ là nơi bán giày, mà còn là không
                  gian thú vị dành cho những người đam mê thời trang và tự do
                  biểu hiện cá nhân. Chúng tôi tự tin mang đến cho bạn những xu
                  hướng mới nhất và đa dạng nhất từ thế giới giày dép.
                </p>
              </div>
              <div className="row" style={{ width: "500px" }}>
                <p style={{ color: "rgb(133, 137, 151)" }}>
                  <span style={{ fontWeight: "bold" }}>Sản Phẩm:</span> Tại
                  2003Shoes Store, chúng tôi chú trọng vào việc chọn lọc những
                  sản phẩm chất lượng cao từ các thương hiệu nổi tiếng và những
                  thiết kế độc đáo từ những nhà thiết kế tài năng. Bạn sẽ luôn
                  tìm thấy đôi giày phù hợp cho mọi dịp, từ công sở đến dạo phố,
                  từ hoạt động thể thao đến tiệc tùng.
                </p>
              </div>
              {/* button */}
              <div className="row" style={{ marginTop: "10px" }}>
                <Button
                  className="buttonXemCuaHang"
                  onClick={() => {
                    navigate("/productions");
                  }}
                >
                  Xem Ngay Cửa Hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* lien he*/}
        <div
          className="container"
          style={{
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "30px",
          }}
        >
          <div className="row" style={{ height: "200px" }}>
            <div
              className="col-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "70px",
              }}
            >
              <div className="row">
                <div className="col-2" style={{ marginRight: "20px" }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    bounce
                    style={{
                      color: "#68dbf8",
                      width: "50px",
                      height: "50px",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <div className="col-8" style={{ marginLeft: "10px" }}>
                  <div className="row" style={{ fontSize: "14px" }}>
                    <p style={{ fontWeight: "bold" }}>Địa chỉ</p>
                  </div>
                  <div
                    className="row"
                    style={{ fontSize: "14px", width: "200px" }}
                  >
                    <p style={{ color: "#858997" }}>
                      {" "}
                      Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "70px",
              }}
            >
              <div className="row">
                <div className="col-2" style={{ marginRight: "20px" }}>
                  <FontAwesomeIcon
                    icon={faPhoneVolume}
                    bounce
                    style={{
                      color: "#68dbf8",
                      width: "50px",
                      height: "50px",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <div className="col-8" style={{ marginLeft: "10px" }}>
                  <div className="row" style={{ fontSize: "14px" }}>
                    <p style={{ fontWeight: "bold" }}>Điện thoại</p>
                  </div>
                  <div className="row" style={{ fontSize: "14px" }}>
                    <p style={{ color: "#858997" }}>+(84) 988542315</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "70px",
              }}
            >
              <div className="row">
                <div className="col-2" style={{ marginRight: "20px" }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    beat
                    style={{
                      color: "#68dbf8",
                      width: "50px",
                      height: "50px",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <div className="col-8" style={{ marginLeft: "10px" }}>
                  <div className="row" style={{ fontSize: "14px" }}>
                    <p style={{ fontWeight: "bold" }}>Email</p>
                  </div>
                  <div className="row" style={{ fontSize: "14px" }}>
                    <p style={{ color: "#858997", width: "200px" }}>
                      2003shopshoes2023@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* feed back form */}
        <div
          className="container"
          style={{
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "50px",
            height: "700px",
          }}
        >
          <div className="row">
            <div className="col-6">
              <div className="row">
                <p
                  style={{
                    color: "rgb(99, 190, 246)",
                    marginTop: "20px",
                    marginLeft: "45px",
                  }}
                >
                  Feedback Form
                </p>
              </div>
              {/*  */}
              <div
                className="row"
                style={{ width: "500px", marginLeft: "30px" }}
              >
                <h4>Chúng Tôi Mong Muốn Được Nghe Phản Hồi Của Bạn</h4>
              </div>
              {/*  */}
              <div
                style={{
                  marginTop: "20px",
                  marginLeft: "45px",
                  color: "#858997",
                }}
              >
                <span>Tên</span> <br />{" "}
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nhập tên"
                  style={{ marginTop: "10px", borderRadius: "50px" }}
                />
                <br />
                <span>Email</span> <br />{" "}
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nhập email"
                  style={{ marginTop: "10px", borderRadius: "50px" }}
                />
                <br />
                <span>Tiêu đề</span> <br />{" "}
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nhập tiêu đề"
                  style={{ marginTop: "10px", borderRadius: "50px" }}
                />
                <br />
                <span>Ý kiến của bạn (không bắt buộc)</span> <br />{" "}
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  style={{ marginTop: "10px", borderRadius: "50px" }}
                ></textarea>
                <Button className="buttonGui">Gửi</Button>
              </div>
            </div>
            <div className="col-6">
              <div style={{ marginTop: "30px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4492.8163269651795!2d105.72966941868206!3d21.03953584004628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345550b525aa03%3A0x3fdefc40f69a023a!2zQ2FvIMSR4bqzbmcgRlBUIFBo4buRIFRy4buLbmggVsSDbiBCw7QgLCBQaMaw4budbmcgUGjGsMahbmcgQ2FuaCAsIHF14bqtbiBU4burIExpw6pt!5e0!3m2!1svi!2s!4v1701400769120!5m2!1svi!2s"
                  width="500"
                  height="600"
                  maxWidth="550"
                  style={{ border: "0px" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IntroductionPage;
