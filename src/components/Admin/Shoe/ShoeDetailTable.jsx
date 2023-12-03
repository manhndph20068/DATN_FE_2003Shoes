import React, { useEffect, useState } from "react";
import { Table, Row, Col, Tag } from "antd";
import {
  callListBookAdmin,
  callDeletetBook,
  callListShoeDetailAdmin,
  callDoInActiveShoeDetail,
  callDoActiveShoeDetail,
  callGetShoeByName,
} from "../../../services/api";
import InputSearchShoe from "./InputSearchShoe";
import ViewBookDetail from "./ViewShoeDetail";
import {
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Tooltip,
  Space,
  Popconfirm,
  message,
  notification,
} from "antd";
import * as XLSX from "xlsx";
import BookModalCreate from "./ShoeDetailModalCreate";
import ShoeDetailModalUpdate from "./ShoeDetailModalUpdate";
import ImportShoes from "./ImportShoe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import "./Shoe.scss";
import { useNavigate } from "react-router-dom";
const ShoeDetailTable = () => {
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [querySort, setQuerySort] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [modalCreateShoeDetailOpen, setModalCreateShoeDetailOpen] =
    useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const navigate = useNavigate();

  const fetchAllShoes = async () => {
    let query = `page=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `${filter}`;
    }
    if (querySort) {
      query += `&${querySort}`;
    }
    // let res = await callListBookAdmin(query);
    // if (res?.data) {
    //   setListBook(res.data.result);
    //   setTotal(res.data.meta.total);
    // }
    let resShoeDetail = await callListShoeDetailAdmin(query);
    if (resShoeDetail?.data) {
      setListShoeDetail(resShoeDetail.data.result);
      setTotal(resShoeDetail.data.meta.total);
    }
    console.log("listShoeDetail", listShoeDetail);
  };

  const handleFilter = (queryFilter) => {
    console.log("queryFilter", queryFilter);
    setFilter(queryFilter);
  };

  useEffect(() => {
    if (filter) {
      setCurrent(1);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllShoes();
  }, [current, pageSize, filter, querySort]);

  const handleInActiveShoeDetail = async (id) => {
    console.log("id", id);
    const data = {
      idSD: id,
    };
    const res = await callDoInActiveShoeDetail(data);
    if (res.status === 0) {
      message.success("Ngừng kinh doanh thành công");
      fetchAllShoes();
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
      fetchAllShoes();
    } else {
      message.error("Kích hoạt thất bại");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text, record, index) => {
        return (
          <Tooltip title="Xem chi tiết">
            <a
              href="#"
              onClick={() => {
                setOpenViewDetail(true);
                setDataViewDetail(record);
              }}
            >
              {record.id}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      render: (text, record, index) => {
        return <img src={`${record.thumbnail}`} style={{ height: "80px" }} />;
      },
    },
    {
      title: "Tên Giày",
      dataIndex: "nameShoe",
      sorter: true,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      sorter: true,
    },

    {
      title: "Giá tiền",
      dataIndex: "priceInput",
      sorter: true,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      sorter: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      sorter: true,
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
          <div style={{ display: "flex", gap: 20 }}>
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
            <Tooltip title="Thông tin bản ghi">
              <FileSearchOutlined
                style={{
                  cursor: "pointer",
                  color: "black",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
                onClick={async () => {
                  console.log("record", record);
                  const res = await callGetShoeByName(record?.nameShoe);
                  if (res.status === 0) {
                    navigate(`/admin/shoe/${res?.data?.id}`);
                  } else {
                    message.error(res?.message);
                  }
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
      setPageSize(pagination.pageSize);
    }
    if (sorter && sorter.field) {
      let q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setQuerySort(q);
    }
  };

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
              setIsModalImportOpen(true);
            }}
          >
            Import
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

          <Tooltip title="Refresh Data Table">
            <Button
              className="shoes-button"
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={() => {
                setFilter("");
                setQuerySort("");
              }}
            />
          </Tooltip>
        </span>
      </div>
    );
  };

  return (
    <>
      <Row style={{ justifyContent: "center", padding: "20px 0px 20px 0px" }}>
        <Col span={23}>
          <InputSearchShoe handleFilter={handleFilter} />
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col span={23}>
          <Table
            title={renderHeaderTable}
            columns={columns}
            dataSource={listShoeDetail}
            rowKey="id"
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
      <ViewBookDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalCreate
        modalCreateShoeDetailOpen={modalCreateShoeDetailOpen}
        setModalCreateShoeDetailOpen={setModalCreateShoeDetailOpen}
        fetchAllShoes={fetchAllShoes}
      />
      <ShoeDetailModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchAllShoes={fetchAllShoes}
      />
      <ImportShoes
        isModalImportOpen={isModalImportOpen}
        setIsModalImportOpen={setIsModalImportOpen}
        fetchAllShoes={fetchAllShoes}
      />
    </>
  );
};
export default ShoeDetailTable;
