import { Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { callGetListVersionOfShoeById } from "../../../services/api";
import { useEffect, useState } from "react";

const ShoeVersion = () => {
  const [listVersion, setListVersion] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);

  const handleGetListVersionOfShoe = async () => {
    const res = await callGetListVersionOfShoeById(id);
    if (res.status === 0) {
      setListVersion(res.data);
    }
  };

  useEffect(() => {
    handleGetListVersionOfShoe();
  }, []);

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Giá tiền",
      dataIndex: "priceInput",
      render: (_, record) => (
        <>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(_)}
        </>
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "qty",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",

      render: (_, record) => (
        <>
          {_ === 0 && <Tag color="red-inverse">Không hoạt động</Tag>}
          {_ === 1 && <Tag color="green-inverse">Hoạt động</Tag>}
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "1.7rem" }}>
      <div className="title" style={{ paddingBottom: "1rem" }}>
        <p style={{ fontSize: "medium" }}>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/admin/shoe");
            }}
          >
            Danh sách sản phẩm
          </a>{" "}
          / {listVersion[0]?.nameShoe}
        </p>
      </div>
      <Table columns={columns} dataSource={listVersion} scroll={{ y: 460 }} />
    </div>
  );
};
export default ShoeVersion;
