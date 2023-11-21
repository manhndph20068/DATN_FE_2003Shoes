import { Button, Col, Row, Table, Tag, Tooltip } from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";
import { callGetListAccount } from "../../../services/api";
import InputSearchUser from "./InputSearchUser";

const CustomerTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listCustomer, setListCustomer] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [roleId, setRoleId] = useState(2);
  const [filter, setFilter] = useState({
    role: 2,
    page: current - 1,
    size: pageSize,
  });

  const handleFetchAllListAcc = async () => {
    const res = await callGetListAccount(filter);
    console.log("res", res);
    if (res.status === 0) {
      let index = 1;
      res.data.forEach((item) => {
        item.key = item.id;
        item.index = index++;
      });
      setListCustomer(res.data);
      setTotal(res.total);
    } else {
      message.error(res.mess);
    }
  };

  useEffect(() => {
    handleFetchAllListAcc();
  }, [filter]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vài Trò",
      dataIndex: "roleId",
      key: "roleId",
      render: (_, record) => (
        <>
          {_ === 1 && <Tag color="green-inverse">ADMIN</Tag>}
          {_ === 2 && <Tag color="green-inverse">Khách Hàng</Tag>}
          {_ === 3 && <Tag color="green-inverse">Nhân Viên</Tag>}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {_ === 0 && <Tag color="red-inverse">Không hoạt động</Tag>}
          {_ === 1 && <Tag color="green-inverse">Hoạt động</Tag>}
        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setFilter({
        role: 2,
        page: pagination.current - 1,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(0);
      setPageSize(pagination.pageSize);
      setFilter({
        role: 2,
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
            <InputSearchUser setFilter={setFilter} filter={filter} />
          </Col>
        </Row>
      </div>
      <div className="table-list-order">
        <div>
          <i>Danh sách khách hàng:</i>
        </div>
        <Table
          columns={columns}
          onChange={onChange}
          dataSource={listCustomer}
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
export default CustomerTable;
