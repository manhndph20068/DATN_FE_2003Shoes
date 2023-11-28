import { Modal, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import {
  callAddOrderDetailAtCounter,
  callGetOrderDetailAtCounterById,
  callListShoeDetailAtCounter,
} from "../../../services/api";
const ScanQrCode = (props) => {
  const {
    openScanQr,
    setOpenScanQr,
    listShoeDataQR,
    activeKey,
    setListOrderDetail,
  } = props;
  const [data, setData] = useState(null);

  const qrReader = React.createRef();
  const handleOk = () => {
    setOpenScanQr(false);
  };

  const handleCancel = () => {
    setOpenScanQr(false);
  };

  return (
    <>
      <Modal
        width={300}
        title="ScanQrCode"
        open={openScanQr}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => {
          setData("No result");
        }}
      >
        {openScanQr === true ? (
          <div>
            <QrReader
              ref={qrReader}
              constraints={{
                facingMode: "environment",
              }}
              onResult={async (result, error) => {
                if (!!result) {
                  setData(result?.text);
                  // qrReader.current.stop();
                  const jsonObject = JSON.parse(result?.text);

                  console.log(jsonObject);
                  console.log("listShoeDataQR", listShoeDataQR);
                  const price = listShoeDataQR.filter(
                    (item) => item.id === jsonObject.id
                  )[0].priceInput;
                  console.log("price", price);
                  let objShoeDetailAdd = {};
                  objShoeDetailAdd.idShoeDetail = jsonObject.id;
                  objShoeDetailAdd.idOrder = activeKey;

                  objShoeDetailAdd.price = price;
                  objShoeDetailAdd.quantity = 1;
                  objShoeDetailAdd.discount = 0;
                  objShoeDetailAdd.status = 1;
                  console.log("objShoeDetailAdd", objShoeDetailAdd);
                  const res = await callAddOrderDetailAtCounter(
                    objShoeDetailAdd
                  );
                  if (res.status === 0) {
                    const resCallGetOrderDetail =
                      await callGetOrderDetailAtCounterById(activeKey);
                    setListOrderDetail(resCallGetOrderDetail.data);

                    message.success("Thêm thành công");
                    setOpenScanQr(false);
                    qrReader.current.stopCamera();
                    return;
                    // window.location.reload();
                  } else {
                    message.error("Thêm thất bại");
                  }
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              videoStyle={{ width: "250px" }}
            />
          </div>
        ) : (
          <></>
        )}

        {/* <p>{data}</p> */}
      </Modal>
    </>
  );
};
export default ScanQrCode;
