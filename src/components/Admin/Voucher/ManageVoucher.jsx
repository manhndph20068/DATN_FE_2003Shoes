import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  callDoActiveVoucher,
  callDoInActiveVoucher,
  callGetListVoucher,
} from "../../../services/api";
import "./ManageVoucher.scss";
import ViewDetailVoucher from "./ViewDetailVoucher";
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  ImportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ImportVoucher from "./ImportVoucher";
import InputSearchVoucher from "./InputSearchVoucher";
import ModalCreateVoucher from "./ModalCreateVoucher";
import ModalUpdateVoucher from "./ModalUpdateVoucher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";

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
  const [newFilterTemp, setNewFilterTemp] = useState({
    page: current,
    size: pageSize,
  });

  const [form] = Form.useForm();

  const handleFetchAllListVoucher = async () => {
    const res = await callGetListVoucher(newFilterTemp);
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
  }, [newFilterTemp]);

  const deleteVoucherByID = async (id) => {
    console.log("id", id);
    const data = {
      id: id,
    };

    const res = await callDoInActiveVoucher(data);
    console.log("res ", res);
    if (res.status === 0) {
      console.log("res red");
      handleFetchAllListVoucher();
    }
  };

  const activeVoucherByID = async (id) => {
    console.log("id", id);
    const data = {
      id: id,
    };

    const res = await callDoActiveVoucher(data);
    console.log("res ", res);
    if (res.status === 0) {
      console.log("res red");
      handleFetchAllListVoucher();
    }
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
          <>
            {record.status === 1 && (
              <div style={{ display: "flex", gap: 20 }}>
                <Tooltip title="Cập nhật"></Tooltip>
                <Popconfirm
                  placement="left"
                  title={`Bạn có chắc chắn muốn xóa ${record.code} không?`}
                  description={`Xóa voucher ${record.name}?`}
                  onConfirm={() => deleteVoucherByID(record.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                ></Popconfirm>
                <Tooltip title="Chi tiết voucher">
                  <EyeOutlined
                    style={{
                      cursor: "pointer",
                      color: "black",
                      transition: "color 0.3s",
                    }}
                    onClick={() => {
                      setOpenViewDetail(true);
                      setDataViewDetail(record);
                    }}
                  />
                </Tooltip>
              </div>
            )}

            {record.status === 0 && (
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
                      console.log("record", record);
                      setDataUpdate(record);
                      setIsModalUpdateOpen(true);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  placement="left"
                  title={`Bạn có chắc chắn muốn hủy kích hoạt voucher ${record.name} không?`}
                  description={`Hủy kích hoạt voucher ${record.name}?`}
                  onConfirm={() => deleteVoucherByID(record.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
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
                <Tooltip title="Chi tiết voucher">
                  <EyeOutlined
                    style={{
                      cursor: "pointer",
                      color: "black",
                      transition: "color 0.3s",
                    }}
                    onClick={() => {
                      setOpenViewDetail(true);
                      setDataViewDetail(record);
                    }}
                  />
                </Tooltip>
              </div>
            )}
            {record.status === 3 && (
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
                      console.log("record", record);
                      setDataUpdate(record);
                      setIsModalUpdateOpen(true);
                    }}
                  />
                </Tooltip>
                <Popconfirm
                  placement="left"
                  title={`Bạn có muốn kích hoạt ${record.name} không?`}
                  description={`Kích hoạt ${record.name}?`}
                  onConfirm={() => activeVoucherByID(record.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Tooltip title="Kích hoạt">
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      style={{ color: "#2dca2b" }}
                    />
                  </Tooltip>
                </Popconfirm>
                <Tooltip title="Chi tiết voucher">
                  <EyeOutlined
                    style={{
                      cursor: "pointer",
                      color: "black",
                      transition: "color 0.3s",
                    }}
                    onClick={() => {
                      setOpenViewDetail(true);
                      setDataViewDetail(record);
                    }}
                  />
                </Tooltip>
              </div>
            )}

            {record.status === 2 && (
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
                      console.log("record", record);
                      setDataUpdate(record);
                      setIsModalUpdateOpen(true);
                    }}
                  />
                </Tooltip>
                {/* <Popconfirm
                  placement="left"
                  title={`Bạn có muốn kích hoạt ${record.code} không?`}
                  description={`Kích hoạt ${record.name}?`}
                  onConfirm={() => activeVoucherByID(record.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Tooltip title="Kích hoạt">
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      style={{ color: "black", transition: "color 0.3s" }}
                      onMouseOver={(e) => (e.target.style.color = "red")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    />
                  </Tooltip>
                </Popconfirm> */}
                <Tooltip title="Chi tiết voucher">
                  <EyeOutlined
                    style={{
                      cursor: "pointer",
                      color: "black",
                      transition: "color 0.3s",
                    }}
                    onClick={() => {
                      setOpenViewDetail(true);
                      setDataViewDetail(record);
                    }}
                  />
                </Tooltip>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const handleExportUsers = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/admin/voucher-order/export-voucher",
      newFilterTemp,
      {
        responseType: "arraybuffer",
      }
    );
    console.log("response", response);

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    console.log("link", link);
    link.href = window.URL.createObjectURL(blob);
    link.download = "list-order-file.xlsx";
    link.click();
  };

  const renderHeaderTable = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <i>Danh sách voucher :</i>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            className="voucherButton"
            type="primary"
            icon={<ExportOutlined />}
            onClick={() => handleExportUsers()}
          >
            Export
          </Button>

          <Button
            className="voucherButton"
            type="primary"
            icon={<ImportOutlined />}
            onClick={() => {
              setIsModalImportOpen(true);
            }}
          >
            Import
          </Button>

          <Button
            className="voucherButton"
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
              className="voucherButton"
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
      setNewFilterTemp({
        ...filter,
        page: pagination.current,
        size: pageSize,
      });
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setCurrent(1);
      setPageSize(pagination.pageSize);
      setNewFilterTemp({
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
              <InputSearchVoucher
                setFilter={setFilter}
                filter={filter}
                form={form}
                newFilterTemp={newFilterTemp}
                setNewFilterTemp={setNewFilterTemp}
              />
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
