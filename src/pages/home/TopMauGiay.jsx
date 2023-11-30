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
const TopMauGiay = () => {
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        <div className="row">
          <div className="col-6">
            <h4>TOP NHỮNG MẪU GIÀY BẠN NÊN CÓ</h4>
          </div>
          <div className="col-5">
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
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayNike.png"
                  alt="anh"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "10px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Air Force 1 - Giày thể thao huyền thoại của Nike, mang đến sự
                  thoải mái và phong cách độc đáo với thiết kế tinh tế và chất
                  liệu chất lượng, là biểu tượng không thể thiếu trong thế giới
                  sneaker."
                </p>
              </Card>
            </Col>
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayJodan.png"
                  alt="anh"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "10px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Giày Air Jordan - biểu tượng thời trang đỉnh cao, kết hợp
                  phong cách và hiệu suất vượt trội, là sự lựa chọn hoàn hảo cho
                  người yêu thể thao và thời trang."
                </p>
              </Card>
            </Col>
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayConverse.png"
                  alt="anh"
                  style={{
                    width: "130px",
                    height: "100px",
                    marginLeft: "0px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Converse - Những đôi giày kinh điển với phong cách đơn giản,
                  vô cùng linh hoạt và thoải mái. Được yêu thích bởi cả người
                  chơi thể thao và những người đam mê thời trang đường phố."
                </p>
              </Card>
            </Col>
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayUltraboots.png"
                  alt="anh"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "10px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Ultra Boost - Giày chạy bộ hàng đầu của Adidas, nổi tiếng với
                  đệm Boost độc đáo mang lại trải nghiệm êm ái và linh hoạt.
                  Thiết kế hiện đại và chất liệu cao cấp, Ultra Boost là sự kết
                  hợp hoàn hảo giữa phong cách và hiệu suất."
                </p>
              </Card>
            </Col>
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayVan.png"
                  alt="anh"
                  style={{
                    width: "130px",
                    height: "100px",
                    marginLeft: "0px",
                    paddingTop: "40px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Giày Vans - Biểu tượng của văn hóa skateboard và thời trang
                  đường phố. Với thiết kế đơn giản, màu sắc đa dạng và đế waffle
                  nổi tiếng, giày Vans đã trở thành biểu tượng phong cách không
                  thể phủ nhận trong cộng đồng trẻ."
                </p>
              </Card>
            </Col>
            <Col span={4} className="colMauGiay">
              <Card bordered={false} className="cardGiayNenCo">
                <img
                  src="/src/assets/giayYz.png"
                  alt="anh"
                  style={{
                    width: "110px",
                    height: "80px",
                    marginLeft: "10px",
                    marginTop: "20px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>
                  "Yeezy 350 - Dòng giày thời trang độc đáo của Adidas và Kanye
                  West, nổi bật với thiết kế đẳng cấp và chất liệu đàn hồi
                  Primeknit. Yeezy 350 là biểu tượng của sự thoải mái và phong
                  cách đương đại, thu hút sự chú ý từ cả cộng đồng sneaker và
                  người hâm mộ thời trang."
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default TopMauGiay;
