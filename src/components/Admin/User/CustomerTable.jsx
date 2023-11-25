import {
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import "./Table.scss";
import { useEffect, useState } from "react";
import { callGetListAccount, callInActiveAccount } from "../../../services/api";
import InputSearchUser from "./InputSearchUser";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
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

  const InactiveAccByID = async (id) => {
    console.log("id", id);
    const data = {
      id: id,
    };
    const res = await callInActiveAccount(data);
    if (res.status === 0) {
      handleFetchAllListAcc();
      message.success(res.message);
    } else {
      message.error("Huy thất bại");
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
    {
      title: "Thao tác",
      key: "action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 20 }}>
            <Tooltip title="Chi tiết">
              <EyeOutlined
                style={{ color: "black", transition: "color 0.3s" }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
              />
            </Tooltip>
            <Popconfirm
              placement="left"
              title={`Bạn có chắc chắn muốn hủy kích hoạt tài khoản khách hàng: ${record.name}?`}
              description={`Hủy kích hoạt khách hàng: ${record.name} ?`}
              onConfirm={() => InactiveAccByID(record.id)}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Tooltip title="Hủy kích hoạt">
                <FontAwesomeIcon
                  icon={faToggleOff}
                  style={{ color: "black", transition: "color 0.3s" }}
                  onMouseOver={(e) => (e.target.style.color = "red")}
                  onMouseOut={(e) => (e.target.style.color = "black")}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
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
      <div style={{ paddingBottom: "1.5rem" }}>
        <p style={{ fontSize: "15px" }}>
          <UserOutlined style={{ fontSize: "14px", marginRight: "5px" }} />
          <span>Quản lý tài khoản </span>
          <ArrowRightOutlined
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          <span>
            <i>Khách Hàng</i>
          </span>
        </p>
      </div>
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
