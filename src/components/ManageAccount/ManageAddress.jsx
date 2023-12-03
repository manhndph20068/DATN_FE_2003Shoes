import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { callGetListAddressById } from "../../services/api";

const ManageAddress = () => {
  const [dataAddress, setDataAddress] = useState([]);
  const user = useSelector((state) => state.account.user);

  const handleGetListAddress = async () => {
    const res = await callGetListAddressById(user?.id);
    console.log("res0000000000", res);
  };

  useEffect(() => {
    handleGetListAddress();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <>
          <img src={record.avatar} alt="" style={{ width: "50px" }} />
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "roleId",
      key: "roleId",
      //   render: (_, record) => (
      //     <>
      //       {_ === 1 && <Tag color="green-inverse">ADMIN</Tag>}
      //       {_ === 2 && <Tag color="green-inverse">Khách Hàng</Tag>}
      //       {_ === 3 && <Tag color="green-inverse">Nhân Viên</Tag>}
      //     </>
      //   ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      //   render: (_, record) => (
      //     <>
      //       {_ === 0 && <Tag color="red-inverse">Không hoạt động</Tag>}
      //       {_ === 1 && <Tag color="green-inverse">Hoạt động</Tag>}
      //     </>
      //   ),
    },
  ];
  return (
    <div style={{ paddingLeft: "3rem", minHeight: 300, paddingTop: "2rem" }}>
      {/* <Table dataSource={dataSource} columns={columns} /> */}
    </div>
  );
};
export default ManageAddress;
