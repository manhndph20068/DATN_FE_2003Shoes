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
import Banner from "./banner";
import SanPhamBanChay from "./SanPhamBanChay";
import SanPhamMoiNhat from "./SanPhamMoiNhat";
import NoiBat from "./NoiBat";
import CachDong from "./CachDong";
import DanhGia from "./DanhGia";
import ThuongHieu from "./ThuongHieu";
import TopMauGiay from "./TopMauGiay";
// const contentStyle = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
const HomePage = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          paddingBottom: "10px",
        }}
      >
        {/* banner */}
        <Banner></Banner>
        {/*  */}
        <CachDong></CachDong>
        {/* sản phẩm bán chạy */}
        <SanPhamBanChay></SanPhamBanChay>
        {/* nổi bật*/}
        <NoiBat></NoiBat>
        {/*  */}
        <CachDong></CachDong>
        {/* sản phẩm mới nhất */}
        <SanPhamMoiNhat></SanPhamMoiNhat>
        {/* Đánh giá */}
        <DanhGia></DanhGia>
        {/* Cac thuong hieu */}
        <ThuongHieu></ThuongHieu>
        {/* Tin tuc */}
        <TopMauGiay></TopMauGiay>
      </div>
    </>
  );
};
export default HomePage;
