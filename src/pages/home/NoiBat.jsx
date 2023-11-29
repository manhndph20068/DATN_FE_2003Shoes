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
const NoiBat = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-3">
            <h4>NỔI BẬT</h4>
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
          <div className="col-3">
            <img
              src="/src/assets/converse.jpg"
              alt=""
              style={{
                width: "270px",
                height: "500px",
                borderRadius: "30px",
              }}
            />
          </div>
          {/*  */}
          <div className="col-6">
            <div className="row" style={{ marginLeft: "1px" }}>
              <img
                src="/src/assets/jodan.jpg"
                alt=""
                style={{
                  width: "600px",
                  height: "230px",
                  borderRadius: "30px",
                }}
              />
            </div>
            <div
              className="row"
              style={{ marginTop: "40px", marginLeft: "1px" }}
            >
              <img
                src="/src/assets/nike.jpg"
                alt=""
                style={{
                  width: "600px",
                  height: "230px",
                  borderRadius: "30px",
                }}
              />
            </div>
          </div>
          {/*  */}
          <div className="col-3">
            <img
              src="/src/assets/ultra.jpg"
              alt=""
              style={{
                width: "270px",
                height: "500px",
                borderRadius: "30px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default NoiBat;
