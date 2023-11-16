import { Col, Row, Table } from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";
import { callGetListAccount } from "../../../services/api";
import InputSearchUser from "./InputSearchUser";

const StaffTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listStaff, setListStaff] = useState([]);
  const [filter, setFilter] = useState({
    role: 3,
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
      setListStaff(res.data);
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
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setFilter({
        role: 3,
        page: pagination.current - 1,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(0);
      setPageSize(pagination.pageSize);
      setFilter({
        role: 3,
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
        <Table
          columns={columns}
          onChange={onChange}
          dataSource={listStaff}
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
export default StaffTable;
