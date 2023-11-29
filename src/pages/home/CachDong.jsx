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
const CachDong = () => {
  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-5" style={{ marginLeft: "80px" }}>
            <hr />
          </div>
          <FontAwesomeIcon
            icon={faShoePrints}
            style={{
              color: "#0f151f",
              width: "20px",
              height: "20px",
              marginTop: "5px",
            }}
          />
          <div className="col-5">
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};
export default CachDong;
