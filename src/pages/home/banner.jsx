import React from "react";
import { Carousel, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPhoneVolume,
  faTag,
  faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
const Banner = () => {
  return (
    <>
      <div
        className="container"
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <div className="row">
          <div className="col-3">
            <iframe
              width="280"
              height="280"
              style={{ borderRadius: "20px" }}
              src="https://www.youtube.com/embed/3Ej5SwgxWNg"
              title="6 cách nhanh nhất để phân biệt Jordan 1 FAKE và REAL [2020 UPDATE] | Jordan 1 Real VS Fake"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <hr style={{ marginLeft: "10px" }} />
            <iframe
              width="280"
              height="280"
              style={{ borderRadius: "20px", marginTop: "8px" }}
              src="https://www.youtube.com/embed/RyPZ53tpJ7s"
              title='Top 5 đôi giày "MUST HAVE" cho nam giới | Phối đồ với chelsea boots, nike af1, chunky boots,loafer..'
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="container" style={{ marginLeft: "20px" }}>
                {" "}
                <Carousel autoplay>
                  <div>
                    {/* <h3 style={contentStyle}></h3> */}
                    <img
                      src="/src/assets/banner1.png"
                      alt=""
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/banner2.png"
                      alt=""
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/banner3.png"
                      alt=""
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                  <div>
                    <img
                      src="/src/assets/banner4.jpg"
                      alt=""
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                </Carousel>
              </div>
            </div>
            <div className="row" style={{ marginTop: "28px" }}>
              <div
                className="container"
                style={{
                  marginLeft: "30px",
                  backgroundColor: "#f2f2f2",
                  width: "93%",
                  height: "190px",
                  borderRadius: "30px",
                }}
              >
                <div
                  className="row"
                  style={{
                    // backgroundColor: "red",
                    marginTop: "60px",
                    width: "90%",
                    marginLeft: "35px",
                  }}
                >
                  <div className="col-1">
                    <div style={{ marginTop: "10px" }}>
                      <FontAwesomeIcon
                        icon={faTicket}
                        beat
                        style={{
                          color: "#6af09e",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-3" style={{ marginLeft: "10px" }}>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ fontWeight: "bold" }}>Deal Hời</p>
                    </div>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ color: "#858997" }}>Voucher hấp dẫn</p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-1">
                    <div style={{ marginTop: "10px" }}>
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        bounce
                        style={{
                          color: "#6af09e",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-3" style={{ marginLeft: "10px" }}>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ fontWeight: "bold" }}>Hỗ trợ online</p>
                    </div>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ color: "#858997" }}>Hoạt động 24/7</p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-1">
                    <div style={{ marginTop: "10px" }}>
                      <FontAwesomeIcon
                        icon={faTag}
                        flip
                        style={{
                          color: "#6af09e",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-2" style={{ marginLeft: "10px" }}>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ fontWeight: "bold" }}>Sale Lớn</p>
                    </div>
                    <div className="row" style={{ fontSize: "14px" }}>
                      <p style={{ color: "#858997" }}>Tuần lễ vàng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
