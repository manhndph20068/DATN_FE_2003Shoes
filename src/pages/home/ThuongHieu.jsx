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
import "./home.scss";
const ThuongHieu = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "60px" }}>
        <div className="row">
          <div className="col-3">
            <h4>CÁC THƯƠNG HIỆU</h4>
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "20px",
            height: "200px",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <div
            className="row"
            style={{
              backgroundColor: "white",
              marginLeft: "30px",
              marginTop: "25px",
              width: "95%",
            }}
          >
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoVans.png"
                alt="ảnh"
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>
            {/*  */}
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoAirJdan.png"
                alt="ảnh"
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>
            {/*  */}
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoConverse.png"
                alt="ảnh"
                style={{
                  width: "250px",
                  height: "150px",
                }}
              />
            </div>
            {/*  */}
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoAdidas.png"
                alt="ảnh"
                style={{
                  marginTop: "35px",
                  width: "110px",
                  height: "80px",
                }}
              />
            </div>
            {/*  */}
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoNike.png"
                alt="ảnh"
                style={{
                  width: "200px",
                  height: "100px",
                  marginTop: "20px",
                }}
              />
            </div>
            {/*  */}
            <div
              className="col-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="/src/assets/logoMlb.png"
                alt="ảnh"
                style={{
                  width: "100px",
                  height: "100px",
                  marginTop: "25px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThuongHieu;
