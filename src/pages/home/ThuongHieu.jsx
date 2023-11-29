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
            backgroundColor: "red",
            borderRadius: "20px",
          }}
        ></div>
      </div>
    </>
  );
};
export default ThuongHieu;
