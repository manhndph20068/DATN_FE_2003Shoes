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
import ModalCreateAccount from "./ModalCreateAccount";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ShowDetailUser from "./ShowDetailUser";
const AdminTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);
  const [listAdmin, setListAdmin] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [roleId, setRoleId] = useState(1);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [filter, setFilter] = useState({
    role: 1,
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
      setListAdmin(res.data);
      setTotal(res.total);
    } else {
      message.error(res.mess);
    }
  };

  useEffect(() => {
    handleFetchAllListAcc();
  }, [filter]);

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
      title: "Vai trò",
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
    // {
    //   title: "",
    //   key: "action",
    //   render: (text, record, index) => {
    //     return (
    //       <div style={{ display: "flex", gap: 20 }}>
    //         <Popconfirm
    //           placement="left"
    //           title={`Are you sure to inactive ${record.name}?`}
    //           description={`Inactive the ${record.name} ?`}
    //           onConfirm={() => InactiveAccByID(record.id)}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <DeleteOutlined />
    //         </Popconfirm>
    //       </div>
    //     );
    //   },
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setFilter({
        role: 1,
        page: pagination.current - 1,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(0);
      setPageSize(pagination.pageSize);
      setFilter({
        role: 1,
        page: 0,
        size: pagination.pageSize,
      });
    }
  };

  const renderHeaderTable = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "30px",
        }}
      >
        <i>Danh sách quản trị : </i>
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
                  role: 1,
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
            <i>Admin</i>
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
          dataSource={listAdmin}
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
export default AdminTable;
