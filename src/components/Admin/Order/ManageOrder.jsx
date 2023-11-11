import { Col, Row, Space, Table, Tag } from "antd";
import { useState } from "react";
import { callGetListOrder } from "../../../services/api";
import { useEffect } from "react";
import InputSearchOrder from "./InputSearchOrder";
import {
  EyeOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [filter, setFilter] = useState({
    page: current - 1,
    size: pageSize,
  });

  const navigate = useNavigate();

  const handleFetchAllListOrder = async () => {
    const res = await callGetListOrder(filter);
    console.log("res", res);
    if (res.status === 0) {
      let index = 1;
      res.data.forEach((item) => {
        item.key = item.id;
        item.index = index++;
      });
      setListOrder(res.data);
      setTotal(res.total);
    } else {
      message.error(res.mess);
    }
  };

  useEffect(() => {
    handleFetchAllListOrder();
  }, [filter]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tổng tiền",
      key: "totalMoney",
      dataIndex: "totalMoney",
      render: (_, record) =>
        _ ? (
          <div style={{ color: "red" }}>
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(_)}
          </div>
        ) : null,
    },
    {
      title: "type",
      key: "type",
      dataIndex: "type",
      render: (_, record) => (
        <div>
          {+record?.type === 1 && (
            <Tag style={{ fontSize: "small" }} color="geekblue">
              Tại quầy
            </Tag>
          )}
          {+record?.type === 2 && (
            <Tag style={{ fontSize: "small" }} color="orange">
              Online
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      key: "createdDate",
      dataIndex: "createdDate",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
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
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <FileSearchOutlined
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={() => {
            navigate(`/admin/order/detail/?code=${record.code}`);
          }}
        />
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setFilter({
        page: pagination.current - 1,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(0);
      setPageSize(pagination.pageSize);
      setFilter({
        page: 0,
        size: pagination.pageSize,
      });
    }
  };

  return (
    <div style={{ padding: "1.7rem" }}>
      <div className="input-search-order" style={{ marginBottom: "2rem" }}>
        <Row>
          <Col span={24}>
            <InputSearchOrder setFilter={setFilter} filter={filter} />
          </Col>
        </Row>
      </div>
      <div className="table-list-order">
        <Table
          columns={columns}
          onChange={onChange}
          dataSource={listOrder}
          pagination={{
            current: current,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
};
export default ManageOrder;
