import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { callGetHistoryOrderCustomerById } from "../../services/api";
import { useSelector } from "react-redux";
import { FileSearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [listOrder, setListOrder] = useState([]);
  const navigate = useNavigate();
  const dataAcc = useSelector((state) => state?.account?.user);
  console.log("dataAcc", dataAcc?.id);
  const handleGetListOrder = async () => {
    const data = {
      idAccount: dataAcc?.id,
    };
    const res = await callGetHistoryOrderCustomerById(data);

    if (res?.length > 0) {
      setListOrder(res);
    }
  };

  useEffect(() => {
    handleGetListOrder();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (_, record) => (
        <div style={{ color: "red" }}>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(_)}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <div>
          {record.status === 0 && (
            <Tag style={{ fontSize: "small" }} color="cyan">
              Hoá đơn chờ
            </Tag>
          )}
          {record.status === 1 && (
            <Tag style={{ fontSize: "small" }} color="gold">
              Chờ thanh toán
            </Tag>
          )}
          {record.status === 2 && (
            <Tag style={{ fontSize: "small" }} color="green">
              Đã thanh toán
            </Tag>
          )}
          {record.status === 3 && (
            <Tag style={{ fontSize: "small" }} color="red">
              Huỷ
            </Tag>
          )}
          {record.status === 4 && (
            <Tag style={{ fontSize: "small" }} color="blue">
              Chờ xác nhận
            </Tag>
          )}
          {record.status === 5 && (
            <Tag style={{ fontSize: "small" }} color="lime">
              Đã xác nhận
            </Tag>
          )}
          {record.status === 6 && (
            <Tag style={{ fontSize: "small" }} color="purple">
              Chờ giao hàng
            </Tag>
          )}
          {record.status === 7 && (
            <Tag style={{ fontSize: "small" }} color="pink">
              Đã bàn giao
            </Tag>
          )}
          {record.status === 8 && (
            <Tag style={{ fontSize: "small" }} color="green-inverse">
              Hoàn thành
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Ngày nhận dự kiến",
      dataIndex: "desiredDate",
      key: "desiredDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <FileSearchOutlined
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={() => {
            navigate(`/history/detail/?code=${record.code}`);
            // alert(`Chức năng đang được phát triển${record.code}`);
          }}
        />
      ),
    },
  ];
  return (
    <>
      <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
        <div>
          <div style={{ padding: "3rem" }}>
            <Table dataSource={listOrder} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderHistory;
