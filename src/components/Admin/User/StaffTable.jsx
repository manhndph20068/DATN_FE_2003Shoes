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
import {
  callDoActiveAccount,
  callDoUpdateUser,
  callGetListAccount,
  callInActiveAccount,
} from "../../../services/api";
import InputSearchUser from "./InputSearchUser";
import ModalCreateAccount from "./ModalCreateAccount";
import {
  PlusOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
  UserOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import ShowDetailUser from "./ShowDetailUser";
const StaffTable = () => {
  const [current, setCurrent] = useState(1);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listStaff, setListStaff] = useState([]);
  const [roleId, setRoleId] = useState(3);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
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
        <i>Danh sách nhân viên: </i>
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

  const ActiveAccByID = async (record) => {
    console.log("record", record);
    const data = {
      id: record?.id,
    };
    console.log("data", data);
    const res = await callDoActiveAccount(data);
    if (res.status === 0) {
      handleFetchAllListAcc();
      message.success(res.message);
    } else {
      message.error("Huy thất bại");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <>
          <img src={record.avatar} alt="" style={{ width: "50px" }} />
        </>
      ),
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
                onClick={() => {
                  setDataViewDetail(record);
                  setOpenViewDetail(true);
                }}
              />
            </Tooltip>

            {record?.status === 1 && (
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
            )}
            {record?.status === 0 && (
              <Popconfirm
                placement="left"
                title={`Bạn có chắc chắn muốn kích hoạt tài khoản khách hàng: ${record.name}?`}
                description={`Kích hoạt khách hàng: ${record.name} ?`}
                onConfirm={() => ActiveAccByID(record)}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Tooltip title="Kích hoạt">
                  <Tooltip title="Kích hoạt">
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      style={{ color: "#2dca2b" }}
                    />
                  </Tooltip>
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

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
    <div className="staff" style={{ padding: "1.7rem" }}>
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
            <i>Nhân Viên</i>
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
      <ShowDetailUser
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
      />
    </div>
  );
};
export default StaffTable;
