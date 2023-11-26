import React, { useState } from "react";

import { Button, Descriptions, Drawer, Tag } from "antd";

const ShowDetailUser = (props) => {
  const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpenViewDetail(true);
  };

  const onClose = () => {
    setOpenViewDetail(false);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={openViewDetail}
        width={"40%"}
      >
        <Descriptions title="User Info" column={2} bordered>
          <Descriptions.Item label="Tên">
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {dataViewDetail?.roleId === 1 && (
              <Tag color="green-inverse">ADMIN</Tag>
            )}
            {dataViewDetail?.roleId === 2 && (
              <Tag color="green-inverse">Khách Hàng</Tag>
            )}
            {dataViewDetail?.roleId === 3 && (
              <Tag color="green-inverse">Nhân Viên</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {dataViewDetail?.status === 0 && (
              <Tag color="red-inverse">Không hoạt động</Tag>
            )}
            {dataViewDetail?.status === 1 && (
              <Tag color="green-inverse">Hoạt động</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh đại diện">
            <img src={dataViewDetail?.avatar} style={{ width: "6rem" }} />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default ShowDetailUser;
