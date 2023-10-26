import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "antd";
import {
  callListBookAdmin,
  callDeletetBook,
  callListShoeDetailAdmin,
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

const ShoeDetailTable = () => {
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [querySort, setQuerySort] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [modalCreateShoeDetailOpen, setModalCreateShoeDetailOpen] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

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

  const confirm = async (id) => {
    const res = await callDeletetBook(id);
    console.log(res);
    if (res?.data) {
      message.success("Xóa thành công");
      await fetchAllShoes();
      setCurrent(1);
    } else {
      notification.error({
        message: "Error",
        description: "Something Wrong!",
      });
    }
  };

  useEffect(() => {
    if (filter) {
      setCurrent(1);
    }
  }, [filter]);

  useEffect(() => {
    fetchAllShoes();
  }, [current, pageSize, filter, querySort]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setOpenViewDetail(true);
              setDataViewDetail(record);
            }}
          >
            {record.id}
          </a>
        );
      },
    },
    {
      title: "Thumbnail",
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
      title: "Brand",
      dataIndex: "brand",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "priceInput",
      dataIndex: "priceInput",
      sorter: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: true,
    },
    {
      title: "Sole",
      dataIndex: "sole",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 20 }}>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDataUpdate(record);
                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="left"
              title={`Are you sure to delete ${record.mainText}?`}
              description={`Delete the ${record.category} book?`}
              onConfirm={() => confirm(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
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
        <span>Table Data Shoes</span>
        <span style={{ display: "flex", gap: 15 }}>
          {/* <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => handleExportUsers()}
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
              setModalCreateShoeDetailOpen(true);
            }}
          >
            Thêm mới
          </Button>

          <Tooltip title="Refresh Data Table">
            <Button
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
    </>
  );
};
export default ShoeDetailTable;
