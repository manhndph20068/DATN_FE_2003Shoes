import React, { useEffect, useState } from "react";
import { Button, Col, Popconfirm, Row, Space, Table, Tag, Tooltip } from "antd";
import { callGetListVoucher } from "../../../services/api";
import "./ManageVoucher.scss";
import ViewDetailVoucher from "./ViewDetailVoucher";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ImportVoucher from "./ImportVoucher";
import InputSearchVoucher from "./InputSearchVoucher";
import ModalCreateVoucher from "./ModalCreateVoucher";
import ModalUpdateVoucher from "./ModalUpdateVoucher";

const ManageVoucher = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [listVoucher, setListVoucher] = useState([]);
  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [filter, setFilter] = useState({
    page: current,
    size: pageSize,
  });

  const handleFetchAllListVoucher = async () => {
    const res = await callGetListVoucher(filter);
    console.log("res callGetListVoucher", res);
    if (res?.data) {
      let index = 1;
      res.data.forEach((item) => {
        item.key = item.id;
        item.index = index++;
      });
      setListVoucher(res.data);
      setTotal(res.total);
    }
  };

  useEffect(() => {
    handleFetchAllListVoucher();
  }, [filter]);

  const deleteVoucherByID = (id) => {
    console.log("id", id);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Mã Voucher",
      dataIndex: "code",
      key: "code",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setOpenViewDetail(true);
            setDataViewDetail(record);
          }}
        >
          {record.code}
        </a>
      ),
    },
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá trị giảm",
      key: "discountAmount",
      dataIndex: "discountAmount",
      render: (_, record) => (
        <>
          {record.reduceForm === 1 ? (
            <Tag color="green-inverse">{_} %</Tag>
          ) : (
            <Tag color="blue-inverse">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(_)}{" "}
              VND
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Giá trị đơn hàng tối thiểu",
      key: "minBillValue",
      dataIndex: "minBillValue",
    },
    {
      title: "Giá trị Giảm tối đa",
      key: "maximumReductionValue",
      dataIndex: "maximumReductionValue",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <>
          {record.status === 0 && <Tag color="cyan">Chờ kích hoạt</Tag>}
          {record.status === 1 && <Tag color="green">Đang hoạt động</Tag>}
          {record.status === 2 && <Tag color="gold">Hết hạn</Tag>}
          {record.status === 3 && <Tag color="red">Huỷ</Tag>}
        </>
      ),
    },
    {
      title: "",
      key: "action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 20 }}>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("record", record);
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
            />
            <Popconfirm
              placement="left"
              title={`Bạn có chắc chắn muốn xóa ${record.code} không?`}
              description={`Xóa voucher ${record.name}?`}
              onConfirm={() => deleteVoucherByID(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <i>Danh sách voucher :</i>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
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
          </Button>

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
                  page: current,
                  size: pageSize,
                });
              }}
            />
          </Tooltip>
        </span>
      </div>
    );
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
      setFilter({
        page: pagination.current,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
      setPageSize(pagination.pageSize);
      setFilter({
        page: 1,
        size: pagination.pageSize,
      });
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="input-search-voucher">
          <Row
            style={{ justifyContent: "center", padding: "20px 0px 20px 0px" }}
          >
            <Col span={23}>
              <InputSearchVoucher setFilter={setFilter} filter={filter} />
            </Col>
          </Row>
        </div>
        <div className="table-list-voucher">
          <Table
            columns={columns}
            title={renderHeaderTable}
            dataSource={listVoucher}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
            }}
          />
        </div>
      </div>

      <ViewDetailVoucher
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
      />
      <ImportVoucher
        isModalImportOpen={isModalImportOpen}
        setIsModalImportOpen={setIsModalImportOpen}
        handleFetchAllListVoucher={handleFetchAllListVoucher}
      />
      <ModalCreateVoucher
        setIsModalCreateOpen={setIsModalCreateOpen}
        isModalCreateOpen={isModalCreateOpen}
        handleFetchAllListVoucher={handleFetchAllListVoucher}
      />
      <ModalUpdateVoucher
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        handleFetchAllListVoucher={handleFetchAllListVoucher}
      />
    </>
  );
};
export default ManageVoucher;
