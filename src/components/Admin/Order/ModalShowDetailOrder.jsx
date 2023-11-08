import { Button, Modal, Table } from "antd";
import { useState } from "react";

const ModalShowDetailOrder = (props) => {
  const {
    openModalShowOrderDetail,
    setOpenModalShowOrderDetail,
    historyOrder,
  } = props;

  const handleOk = () => {
    setTimeout(() => {
      setOpenModalShowOrderDetail(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpenModalShowOrderDetail(false);
  };

  const columns = [
    {
      width: "25%",
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      width: "25%",
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      width: "25%",
      title: "Ngày giờ",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      width: "25%",
      title: "Nhân viên xác nhận",
      key: "createdBy",
      dataIndex: "createdBy",
    },
  ];

  return (
    <>
      <Modal
        width={700}
        open={openModalShowOrderDetail}
        title={`Chi tiết hoá đơn ${historyOrder[0]?.code ?? ""}`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<></>]}
      >
        <Table
          className="custom-table"
          columns={columns}
          dataSource={historyOrder}
          pagination={false}
        />
      </Modal>
    </>
  );
};
export default ModalShowDetailOrder;
