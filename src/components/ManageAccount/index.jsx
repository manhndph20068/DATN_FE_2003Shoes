import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ChangePassword from "./ChangePassword";

const ManageAccount = (props) => {
  const user = useSelector((state) => state.account.user);
  const { isModalManageAcconut, setIsModalManageAcconut } = props;
  const [userAvatar, setUseravatar] = useState(user?.avatar ?? "");
  const [isTab, setTab] = useState(1);

  const handleClose = () => {
    setIsModalManageAcconut(false);
    setUseravatar(user?.avatar);
    setTab(1);
  };

  useEffect(() => {
    setTab(1);
  }, []);

  const items = [
    {
      key: isTab,
      label: "Cập nhật thông tin",
      children: (
        <UserInfo
          userAvatar={userAvatar}
          setUseravatar={setUseravatar}
          setIsModalManageAcconut={setIsModalManageAcconut}
          setTab={setTab}
        />
      ),
    },
    {
      key: 2,
      label: "Đổi mật khẩu",
      children: (
        <ChangePassword
          setIsModalManageAcconut={setIsModalManageAcconut}
          isModalManageAcconut={isModalManageAcconut}
          setTab={setTab}
        />
      ),
    },
  ];

  return (
    <div>
      <Modal
        style={{ minWidth: 700 }}
        open={isModalManageAcconut}
        onCancel={() => handleClose()}
        footer={null}
        title={"Quản lý tài khoản"}
        visible={isModalManageAcconut}
      >
        <Tabs defaultActiveKey="1" items={items} popupClassName={"asd"} />
      </Modal>
    </div>
  );
};
export default ManageAccount;
