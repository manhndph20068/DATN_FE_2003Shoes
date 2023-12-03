import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ChangePassword from "./ChangePassword";
import { callGetDataUserById } from "../../services/api";
import ManageAddress from "./ManageAddress";

const ManageAccount = (props) => {
  const user = useSelector((state) => state?.account?.user);
  const { isModalManageAcconut, setIsModalManageAcconut } = props;
  const [userAvatar, setUseravatar] = useState(user?.avatar ?? null);
  const [urlAvatar, setUrlAvatar] = useState(user?.avatar);
  const [isTab, setTab] = useState(1);
  const [listAddress, setListAddress] = useState([]);
  const [dataUser, setDataUser] = useState(null);

  const handleClose = () => {
    setIsModalManageAcconut(false);
    setUrlAvatar(user?.avatar);
    setTab(0);
    handleGetDataUser();
  };

  const handleGetDataUser = async () => {
    console.log("user.id", user?.id);
    const res = await callGetDataUserById(user?.id);
    console.log("res", res);
    if (res?.data) {
      setUrlAvatar(res?.data?.avatar);
      setDataUser(res?.data);
    }
  };

  useEffect(() => {
    handleGetDataUser();
    // setTab(1);
  }, [user]);

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
          dataUser={dataUser}
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
    {
      key: 3,
      label: "Địa chỉ nhận hàng",
      children: (
        <ManageAddress
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
