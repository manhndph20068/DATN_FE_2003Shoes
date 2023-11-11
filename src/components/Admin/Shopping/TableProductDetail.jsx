import { DeleteOutlined } from "@ant-design/icons";
import { InputNumber, Popconfirm, Space, Table, message } from "antd";
import {
  callDeleteOrderDetailAtCounter,
  callGetOrderDetailAtCounterById,
  callUpdateOrderDetailAtCounter,
} from "../../../services/api";

const TableProductDetail = (props) => {
  const {
    listOrderDetail,
    activeKey,
    setListOrderDetail,
    handleGetListVoucher,
  } = props;

  const confirmDelete = async (item) => {
    console.log("item", item);
    const data = {
      id: item.id,
      idOrder: activeKey,
    };
    const res = await callDeleteOrderDetailAtCounter(data);
    if (res.status === 0) {
      fetchListOrderDetail();
      handleGetListVoucher(0);
      message.success("Xóa thành công");
    }
  };

  const fetchListOrderDetail = async () => {
    const resCallGetOrderDetail = await callGetOrderDetailAtCounterById(
      activeKey
    );
    setListOrderDetail(resCallGetOrderDetail.data);
  };

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
        fetchListOrderDetail();
        message.success("Cập nhật thành công");
      }
    }
  };

  const columns = [
    {
      width: "15%",
      align: "center",
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
      width: "13%",
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
      width: "13%",
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          style={{ width: "100%" }}
          // className="item-input"
          onChange={(value) => handleChangeInput(value, record)}
          value={record.quantity}
        />
      ),
    },
    {
      width: "15%",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          placement="top"
          title={`Confirm delete?`}
          onConfirm={() => confirmDelete(record)}
          style={{ cursor: "pointer" }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table
        style={{ borderRadius: "0.5em" }}
        columns={columns}
        dataSource={listOrderDetail}
        pagination={false}
      />
    </>
  );
};
export default TableProductDetail;
