import { Button, Col, Row, Table, Tag, Tooltip } from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";
import { callGetListAccount } from "../../../services/api";
import InputSearchUser from "./InputSearchUser";
import ModalCreateAccount from "./ModalCreateAccount";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const StaffTable = () => {
  const [current, setCurrent] = useState(1);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listStaff, setListStaff] = useState([]);
  const [roleId, setRoleId] = useState(3);
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

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table Account</span>
        <span style={{ display: "flex", gap: 15 }}>
          {/* <Button
            type="primary"
            icon={<ExportOutlined />}
            // onClick={() => handleExportUsers()}
          >
            Export
          </Button>

          <Button
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => {
              setIsModalImportOpen(true);
            }}
          >
            Import
          </Button> */}

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalCreateOpen(true);
            }}
          >
            Thêm mới
          </Button>

          <Tooltip title="Refresh Data Table">
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={() => {
                setFilter({
                  role: 3,
                  page: current - 1,
                  size: pageSize,
                });
              }}
            />
          </Tooltip>
        </span>
      </div>
    );
  };

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
      render: (_, record) => (
        <>
          {_ === 1 && <Tag color="green-inverse">ADMIN</Tag>}
          {_ === 2 && <Tag color="green-inverse">Customer</Tag>}
          {_ === 3 && <Tag color="green-inverse">STAFF</Tag>}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {_ === 0 && <Tag color="red-inverse">InActive</Tag>}
          {_ === 1 && <Tag color="green-inverse">Active</Tag>}
        </>
      ),
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
          title={renderHeaderTable}
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
      <ModalCreateAccount
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        roleId={roleId}
        handleFetchAllListAcc={handleFetchAllListAcc}
      />
    </div>
  );
};
export default StaffTable;
