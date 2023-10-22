import React, { useState } from "react";
import { Badge, Descriptions } from "antd";
import { Button, Drawer } from "antd";
import moment from "moment";

const ViewUserDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const onClose = () => {
    setOpenViewDetail(false);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="User Info" bordered column={2}>
          <Descriptions.Item label="id">{dataViewDetail._id}</Descriptions.Item>
          <Descriptions.Item label="fullName">
            {dataViewDetail.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="email">
            {dataViewDetail.email}
          </Descriptions.Item>
          <Descriptions.Item label="phone">
            {dataViewDetail.phone}
          </Descriptions.Item>
          <Descriptions.Item label="role" span={3}>
            <Badge status="processing" text={dataViewDetail.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default ViewUserDetail;
