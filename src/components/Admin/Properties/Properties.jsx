import { Button, Table, Radio, Tag, Tooltip, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import {
  callDoActiveAccount,
  callDoActiveBrand,
  callDoActiveCategory,
  callDoActiveColor,
  callDoActiveSize,
  callDoActiveSole,
  callDoInActiveBrand,
  callDoInActiveCategory,
  callDoInActiveColor,
  callDoInActiveSize,
  callDoInActiveSole,
  callListShoeBrand,
  callListShoeCategory,
  callListShoeColor,
  callListShoeSize,
  callListShoeSole,
} from "../../../services/api";
import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  PlusCircleTwoTone,
  ArrowRightOutlined,
  AppstoreOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ModalCreateProperties from "./ModalCreateProperties";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import "./Properties.scss";
import ModalUpdateProperties from "./ModalUpdateProperties";
const Properties = () => {
  const [listData, setListData] = useState([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [currentProperties, setCurrentProperties] = useState(1);
  const [dataUpdate, setDataUpdate] = useState(null);

  const handleGetListProperties = async () => {
    if (currentProperties === 1) {
      const res = await callListShoeCategory();
      if (res && res.status === 0) {
        setListData(res.data);
      }
    }
    if (currentProperties === 2) {
      const res = await callListShoeBrand();
      if (res && res.status === 0) {
        setListData(res.data);
      }
    }
    if (currentProperties === 3) {
      const res = await callListShoeSole();
      if (res && res.status === 0) {
        setListData(res.data);
      }
    }
    if (currentProperties === 4) {
      const res = await callListShoeSize();
      if (res && res.status === 0) {
        setListData(res.data);
      }
    }
    if (currentProperties === 5) {
      const res = await callListShoeColor();
      if (res && res.status === 0) {
        setListData(res.data);
      }
    }
  };

  const InActivePropertiesByID = async (id) => {
    const data = {
      id: id,
    };
    if (currentProperties === 1) {
      const res = await callDoInActiveCategory(data);
      if (res && res.status === 0) {
        message.success("Hủy kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 2) {
      const res = await callDoInActiveBrand(data);
      if (res && res.status === 0) {
        message.success("Hủy kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 3) {
      const res = await callDoInActiveSole(data);
      if (res && res.status === 0) {
        message.success("Hủy kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 4) {
      const res = await callDoInActiveSize(data);
      if (res && res.status === 0) {
        message.success("Hủy kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 5) {
      const res = await callDoInActiveColor(data);
      if (res && res.status === 0) {
        message.success("Hủy kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
  };

  const ActivePropertiesByID = async (id) => {
    const data = {
      id: id,
    };
    if (currentProperties === 1) {
      const res = await callDoActiveCategory(data);
      if (res && res.status === 0) {
        message.success("Kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 2) {
      const res = await callDoActiveBrand(data);
      if (res && res.status === 0) {
        message.success("Kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 3) {
      const res = await callDoActiveSole(data);
      if (res && res.status === 0) {
        message.success("Kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 4) {
      const res = await callDoActiveSize(data);
      if (res && res.status === 0) {
        message.success("Kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
    if (currentProperties === 5) {
      const res = await callDoActiveColor(data);
      if (res && res.status === 0) {
        message.success("Kích hoạt thành công");
        handleGetListProperties();
      } else {
        message.error(res?.message);
      }
    }
  };

  useEffect(() => {
    handleGetListProperties();
  }, [currentProperties]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
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
            <Tooltip title="Cập nhật">
              <EditOutlined
                style={{ color: "black", transition: "color 0.3s" }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
                onClick={() => {
                  setIsModalUpdateOpen(true);
                  setDataUpdate(record);
                }}
              />
            </Tooltip>
            {record.status === 0 && (
              <Popconfirm
                placement="left"
                title={`Bạn có chắc chắn muốn kích hoạt thuộc tính: ${record.name}?`}
                description={`Kích hoạt thuộc tính: ${record.name} ?`}
                onConfirm={() => ActivePropertiesByID(record.id)}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Tooltip title="Kích hoạt">
                  <FontAwesomeIcon
                    icon={faToggleOff}
                    style={{ color: "black", transition: "color 0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "red")}
                    onMouseOut={(e) => (e.target.style.color = "black")}
                  />
                </Tooltip>

                {/* <Tooltip title="Kích hoạt">
                <FontAwesomeIcon
                  icon={faToggleOn}
                  style={{ color: "#2dca2b" }}
                />
              </Tooltip> */}
              </Popconfirm>
            )}
            {record.status === 1 && (
              <Popconfirm
                placement="left"
                title={`Bạn có chắc chắn muốn hủy kích hoạt thuộc tính: ${record.name}?`}
                description={`Hủy kích hoạt thuộc tính: ${record.name} ?`}
                onConfirm={() => InActivePropertiesByID(record.id)}
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

                {/* <Tooltip title="Kích hoạt">
                <FontAwesomeIcon
                  icon={faToggleOn}
                  style={{ color: "#2dca2b" }}
                />
              </Tooltip> */}
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <i></i>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            className="button-properties"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalCreateOpen(true);
            }}
          >
            Thêm mới
          </Button>
        </span>
      </div>
    );
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setCurrentProperties(e.target.value);
  };

  return (
    <>
      <div
        style={{ paddingLeft: "1.5rem", paddingTop: "20px" }}
        className="button-properties"
      >
        <p style={{ fontSize: "15px" }}>
          <AppstoreOutlined style={{ fontSize: "14px", marginRight: "5px" }} />
          <span>Quản lý sản phẩm </span>
          <ArrowRightOutlined
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          <span>
            <i>Quản lý thuộc tính sản phẩm</i>
          </span>
        </p>
      </div>
      <div style={{ padding: "25px" }}>
        <div style={{ marginBottom: "25px" }}>
          <Radio.Group onChange={(e) => onChange(e)} value={currentProperties}>
            <Radio value={1}>Loại Giày</Radio>
            <Radio value={2}>Hãng Giày</Radio>
            <Radio value={3}>Đế Giày</Radio>
            <Radio value={4}>Kích Cỡ</Radio>
            <Radio value={5}>Màu Sắc</Radio>
          </Radio.Group>
        </div>
        <div className="table">
          <Table
            title={renderHeaderTable}
            dataSource={listData}
            columns={columns}
          />
        </div>
        <ModalCreateProperties
          isModalCreateOpen={isModalCreateOpen}
          setIsModalCreateOpen={setIsModalCreateOpen}
          currentProperties={currentProperties}
          handleGetListProperties={handleGetListProperties}
        />
        <ModalUpdateProperties
          isModalUpdateOpen={isModalUpdateOpen}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          currentProperties={currentProperties}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}
          handleGetListProperties={handleGetListProperties}
        />
      </div>
    </>
  );
};
export default Properties;
