import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";

const ScanQrCode = (props) => {
  const { openScanQr, setOpenScanQr } = props;

  const handleOk = () => {
    setOpenScanQr(false);
  };

  const handleCancel = () => {
    setOpenScanQr(false);
  };

  return (
    <>
      <Modal
        title="ScanQrCode"
        open={openScanQr}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>tdđ</p>
      </Modal>
    </>
  );
};
export default ScanQrCode;
