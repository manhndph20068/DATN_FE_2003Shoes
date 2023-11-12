import { Col, Row, Table } from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";
import { callGetListAccount } from "../../../services/api";

const CustomerTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listCustomer, setListCustomer] = useState([]);
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
  return (
    <div style={{ padding: "1.7rem" }}>
      <div className="input-search-order" style={{ marginBottom: "2rem" }}>
        <Row>
          <Col span={24}>
            {/* <InputSearchOrder setFilter={setFilter} filter={filter} /> */}
          </Col>
        </Row>
      </div>
      <div className="table-list-order">
        <Table
          columns={columns}
          //   onChange={onChange}
          dataSource={listCustomer}
          //   pagination={{
          //     current: current,
          //     pageSize: pageSize,
          //     total: total,
          //     showSizeChanger: true,
          //   }}
        />
      </div>
    </div>
  );
};
export default CustomerTable;
