import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ChangePassword from "./ChangePassword";
import { callGetDataUserById } from "../../services/api";

const ManageAccount = (props) => {
  const user = useSelector((state) => state.account.user);
  const { isModalManageAcconut, setIsModalManageAcconut } = props;
  const [userAvatar, setUseravatar] = useState(user?.avatar ?? "");
  const [urlAvatar, setUrlAvatar] = useState(null);
  const [isTab, setTab] = useState(1);

  const handleClose = () => {
    setIsModalManageAcconut(false);
    // setUseravatar(user?.avatar);
    setTab(items[0].key);
  };

  const handleGetDataUser = async () => {
    console.log("user.id", user?.id);
    const res = await callGetDataUserById(user?.id);
    console.log("res", res);
    if (res?.data && res?.data?.length > 0) {
      setUrlAvatar(res?.data[0]?.avatar);
    }
  };

  useEffect(() => {
    handleGetDataUser();
    // setTab(1);
  }, [isTab]);

  const items = [
    {
      key: 1,
      label: "Cập nhật thông tin",
      children: (
        <UserInfo
          userAvatar={userAvatar}
          setUseravatar={setUseravatar}
          setIsModalManageAcconut={setIsModalManageAcconut}
          setTab={setTab}
          urlAvatar={urlAvatar}
          setUrlAvatar={setUrlAvatar}
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
        maskClosable={false}
        style={{ minWidth: 700 }}
        open={isModalManageAcconut}
        onCancel={() => handleClose()}
        footer={null}
        title={"Quản lý tài khoản"}
        visible={isModalManageAcconut}
      >
        <Tabs
          defaultActiveKey={items.key}
          items={items}
          popupClassName={"asd"}
          onChange={(key) => {
            console.log("key", key);
            setTab(key);
          }}
        />
      </Modal>
    </div>
  );
};
export default ManageAccount;
