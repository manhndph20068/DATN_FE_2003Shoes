import { Button, Popconfirm, Table, Tag, Tooltip, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  callDoActiveShoeDetail,
  callDoInActiveShoeDetail,
  callGetListVersionOfShoeById,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { EditOutlined, ImportOutlined } from "@ant-design/icons";
import ShowVersionModalCreate from "./ShowVersionModalCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoeDetailModalUpdate from "../Shoe/ShoeDetailModalUpdate";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

const ShoeVersion = () => {
  const [listVersion, setListVersion] = useState([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);

  const handleGetListVersionOfShoe = async () => {
    const res = await callGetListVersionOfShoeById(id);
    if (res.status === 0) {
      setListVersion(res.data);
    }
  };

  const fetchAllShoes = async () => {};

  useEffect(() => {
    handleGetListVersionOfShoe();
  }, []);

  const handleInActiveShoeDetail = async (id) => {
    console.log("id", id);
    const data = {
      idSD: id,
    };
    const res = await callDoInActiveShoeDetail(data);
    if (res.status === 0) {
      message.success("Ngừng kinh doanh thành công");
      handleGetListVersionOfShoe();
    } else {
      message.error("Ngừng kinh doanh thất bại");
    }
  };

  const handleActiveShoeDetail = async (id) => {
    console.log("id", id);
    const data = {
      idSD: id,
    };
    const res = await callDoActiveShoeDetail(data);
    if (res.status === 0) {
      message.success("Kích hoạt thành công");
      handleGetListVersionOfShoe();
    } else {
      message.error("Kích hoạt thất bại");
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      render: (text, record, index) => {
        return <img src={`${record.thumbnail}`} style={{ height: "80px" }} />;
      },
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Giá tiền",
      dataIndex: "priceInput",
      render: (_, record) => (
        <>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(_)}
        </>
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "qty",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",

      render: (_, record) => (
        <>
          {_ === 0 && <Tag color="red-inverse">Không hoạt động</Tag>}
          {_ === 1 && <Tag color="green-inverse">Hoạt động</Tag>}
        </>
      ),
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 15 }}>
            <Tooltip title="Cập nhật">
              <EditOutlined
                style={{
                  cursor: "pointer",
                  color: "black",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
                onClick={() => {
                  setDataUpdate(record);
                  setOpenModalUpdate(true);
                }}
              />
            </Tooltip>
            {record.status === 1 && (
              <Popconfirm
                placement="left"
                title={`Bạn có muốn ngừng kinh doanh kích hoạt ${record.category}?`}
                description={`Ngừng kinh doanh giày ${record.category} ?`}
                onConfirm={() => handleInActiveShoeDetail(record.id)}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Tooltip title="Ngừng kinh doanh">
                  <FontAwesomeIcon
                    icon={faToggleOff}
                    style={{ color: "black", transition: "color 0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "red")}
                    onMouseOut={(e) => (e.target.style.color = "black")}
                  />
                </Tooltip>
              </Popconfirm>
            )}
            {record.status === 0 && (
              <Popconfirm
                placement="left"
                title={`Bạn có muốn kích hoạt ${record.category}?`}
                description={`Kích hoạt giày ${record.category} ?`}
                onConfirm={() => handleActiveShoeDetail(record.id)}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Tooltip title="Kinh doanh">
                  <FontAwesomeIcon
                    icon={faToggleOn}
                    style={{ color: "#2dca2b" }}
                  />
                </Tooltip>
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
        <i>Danh sách sản phẩm:</i>
        <span style={{ display: "flex", gap: 15 }}>
          {/* <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => handleExportUsers()}
          >
            Export
          </Button> */}

          <Button
            className="shoes-button"
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => {
              setModalCreateOpen(true);
            }}
          >
            Thêm mới
          </Button>
          {/* 
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setModalCreateShoeDetailOpen(true);
            }}
          >
            Thêm mới
          </Button> */}

          {/* <Tooltip title="Refresh Data Table">
            <Button
              className="shoes-button"
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={() => {
                setFilter("");
                setQuerySort("");
              }}
            />
          </Tooltip> */}
        </span>
      </div>
    );
  };

  return (
    <div style={{ padding: "1.7rem" }}>
      <div className="title" style={{ paddingBottom: "1rem" }}>
        <p style={{ fontSize: "medium" }}>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/admin/shoe");
            }}
          >
            Danh sách sản phẩm
          </a>{" "}
          / {listVersion[0]?.nameShoe}
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={listVersion}
        scroll={{ y: 460 }}
        title={renderHeaderTable}
      />
      <ShowVersionModalCreate
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
        listVersion={listVersion}
        handleGetListVersionOfShoe={handleGetListVersionOfShoe}
      />
      <ShoeDetailModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchAllShoes={fetchAllShoes}
      />
    </div>
  );
};
export default ShoeVersion;
