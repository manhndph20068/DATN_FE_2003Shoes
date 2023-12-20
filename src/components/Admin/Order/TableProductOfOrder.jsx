import { InputNumber, Popconfirm, Table, message } from "antd";
import {
  callDeleteOrderDetailAtCounter,
  callDoUpdateTien,
  callUpdateNewOrderAtCounter,
  callUpdateOrderDetailAtCounter,
} from "../../../services/api";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TableProductOfOrder = (props) => {
  const {
    listOrderDetail,
    handleGetOrder,
    activeKey,
    handleCalTotalPrice,
    dataOrder,
    totalPrice,
    paymentMethodOrder,
  } = props;

  // useEffect(() => {
  //   if (totalPrice !== undefined) {
  //     updateOrder();
  //   }
  // }, [totalPrice]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (totalPrice !== undefined && !isUpdated) {
      updateOrder();
      setIsUpdated(true);
    }
  }, [totalPrice, isUpdated]);

  const staffName = useSelector((state) => state.account.user.name);
  // const [totalMoney, setTotalMoney] = useState(0);

  // const handleCalTotalPrice = () => {
  //   let total = 0;
  //   listOrderDetail?.forEach((item) => {
  //     total += item.price * item.quantity;
  //   }) ?? 0;
  //   console.log("total", total);
  //   return total;
  // };

  const handleChangeInput = async (value, record) => {
    if (isNaN(value) || value <= 0) {
      return;
    } else {
      const data = {
        id: record.id,
        idOrder: activeKey,
        idShoeDetail: record.idShoeDetail,
        price: record.price,
        quantity: value,
        discount: record.discount,
        status: record.status,
      };
      const res = await callUpdateOrderDetailAtCounter(data);
      if (res.status === 0) {
        await handleGetOrder();
        message.success("Cập nhật thành công");
        await updateOrder();
        await handleGetOrder();
      } else {
        message.error("Số lượng sản phẩm không đủ");
      }
    }
  };

  const updateOrder = async () => {
    const data = {
      id: dataOrder?.id,
      idVoucher: null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder?.customerName ?? null,
      phoneNumber: dataOrder?.phoneNumber ?? null,
      address: dataOrder?.address ?? null,
      shipFee: dataOrder?.shipFee ?? 0,
      moneyReduce: 0,
      totalMoney: totalPrice ?? 0,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: staffName ?? null,
      note: "Nhân viên sửa",
      status: dataOrder?.status,
    };
    console.log("hi");

    const res = await callUpdateNewOrderAtCounter(data);
    if (res.status === 0) {
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  console.log("totalPriceCheckTable", totalPrice);
  const confirmDelete = async (item) => {
    console.log("item", item);
    const data = {
      id: item.id,
      idOrder: activeKey,
    };
    const res = await callDeleteOrderDetailAtCounter(data);
    if (res.status === 0) {
      await handleGetOrder();
      message.success("Xóa thành công");
    }
  };

  const columnOfListOrder = [
    {
      align: "center",
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (_, record) => (
        <img style={{ height: "6rem" }} alt="img" src={record.imgUrl} />
      ),
    },
    {
      title: "Mã SP",
      dataIndex: "codeShoeDetail",
      key: "codeShoeDetail",
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: (_, record) => (
        <>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price)}
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) =>
        dataOrder.id &&
        dataOrder?.status === 4 &&
        paymentMethodOrder?.[0]?.method === "Thanh toán khi nhận hàng" ? (
          <InputNumber
            // style={{ width: "100%" }}
            // className="item-input"
            onChange={(value) => handleChangeInput(value, record)}
            value={record.quantity}
          />
        ) : (
          <>{record.quantity}</>
        ),
    },
    {
      title: "Thành tiền",
      key: "totalPrice",
      render: (_, record) => (
        <div style={{ color: "red" }}>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price * record.quantity)}
        </div>
      ),
    },
    {
      width: "5%",
      align: "center",
      title: "",
      key: "action",
      render: (_, record) =>
        dataOrder.id &&
        dataOrder?.status === 4 &&
        paymentMethodOrder?.[0]?.method === "Thanh toán khi nhận hàng" ? (
          <Popconfirm
            placement="top"
            title={`Xóa sản phẩm?`}
            onConfirm={() => confirmDelete(record)}
            style={{ cursor: "pointer" }}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <DeleteOutlined
              style={{ color: "black", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.target.style.color = "red")}
              onMouseOut={(e) => (e.target.style.color = "black")}
            />
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <>
      <Table
        className="custom-table"
        columns={columnOfListOrder}
        dataSource={listOrderDetail}
        pagination={false}
      />
    </>
  );
};
export default TableProductOfOrder;
