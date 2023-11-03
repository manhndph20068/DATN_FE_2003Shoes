import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
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

const ManageVoucher = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [listVoucher, setListVoucher] = useState([]);
  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);

  const handleFetchAllListVoucher = async () => {
    const data = {
      page: current,
      size: pageSize,
    };
    const res = await callGetListVoucher(data);
    console.log("res callGetListVoucher", res);
    if (res?.data) {
      res.data.forEach((item) => {
        item.key = item.id;
      });
      setListVoucher(res.data);
      setTotal(res.total);
    }
  };

  useEffect(() => {
    handleFetchAllListVoucher();
  }, [current, pageSize]);

  const columns = [
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
            <Tag color="blue-inverse">{_} VND</Tag>
          )}
        </>
      ),
    },
    {
      title: "Giá trị đơn hàng tối thiểu",
      key: "minBillValue",
      dataIndex: "discountAmount",
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
          {record.status === 2 && <Tag color="red">Hết hạn</Tag>}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", gap: 20 }}>
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                // setDataUpdate(record);
                // setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="left"
              // title={`Are you sure to delete ${record.mainText}?`}
              // description={`Delete the ${record.category} book?`}
              // onConfirm={() => confirm(record.id)}
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

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table Data Voucher</span>
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
              // onClick={() => {
              //   setFilter("");
              //   setQuery("");
              // }}
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
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
      setPageSize(pagination.pageSize);
    }
  };

  return (
    <>
      <div className="content-container"></div>
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
      <ViewDetailVoucher
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
      />
      <ImportVoucher
        isModalImportOpen={isModalImportOpen}
        setIsModalImportOpen={setIsModalImportOpen}
      />
    </>
  );
};
export default ManageVoucher;
