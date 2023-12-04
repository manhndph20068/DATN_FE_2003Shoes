import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  callDeleteAddress,
  callGetListAddressById,
  callUpdateDefaultAddress,
} from "../../services/api";
import ModalAddnewAddress from "./ModalAddnewAddress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlined } from "@ant-design/icons";

const ManageAddress = () => {
  const [dataAddress, setDataAddress] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const user = useSelector((state) => state.account.user);
  const [defaultAddressRowKey, setDefaultAddressRowKey] = useState(null);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, method = "GET", data = {}) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
      },
    };

    if (method === "POST") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response.json();
  };

  const handleGetProvinceName = async (provinceId) => {
    const provinceData = await fetchData(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province"
    );
    const name = provinceData?.data?.find(
      (item) => item.ProvinceID === +provinceId
    )?.ProvinceName;
    console.log("provinceData", name);
    return name;
  };

  const handleGetDistrictName = async (provinceId, districtId) => {
    const districtData = await fetchData(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
      "POST",
      { province_id: +provinceId }
    );
    const name = districtData?.data?.find(
      (item) => item.DistrictID === +districtId
    )?.DistrictName;
    return name;
  };

  const handleGetWardName = async (districtId, wardCode) => {
    console.log("wardCode async", wardCode, districtId);
    const wardData = await fetchData(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
      "POST",
      { district_id: districtId }
    );
    console.log("wardData", wardData);
    const name = wardData?.data?.find(
      (item) => item.WardCode === wardCode
    )?.WardName;
    console.log("wardname", name);
    return name;
  };

  const handleGetListAddress = async () => {
    setIsLoading(true);
    const res = await callGetListAddressById(user?.id);
    if (res?.status === 0) {
      let index = 1;
      for (const item of res.data) {
        item.key = index++;
        item.provinceName = await handleGetProvinceName(item?.province);
        item.districtName = await handleGetDistrictName(
          item?.province,
          item?.district
        );
        item.wardName = await handleGetWardName(item?.district, item?.ward);
      }
      setDataAddress(res?.data);

      setDefaultAddressRowKey(
        res?.data.find((item) => item.defaultAddress === "1")?.key
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetListAddress();
    // handleGetWardName();
  }, []);

  const handleDeleteAddress = async (id) => {
    const data = {
      id: id,
    };
    console.log("data", data);
    const res = await callDeleteAddress(data);
    if (res?.status === 0) {
      handleGetListAddress();
    }
  };

  const columns = [
    // {
    //   title: "STT",
    //   dataIndex: "index",
    //   key: "index",
    // },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "provinceName",
      key: "provinceName",
      // render: (_, record) => <>{handleGetProvinceName(record?.province)}</>,
    },
    {
      title: "Quận/Huyện",
      dataIndex: "districtName",
      key: "district",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phường/Xã",
      dataIndex: "wardName",
      key: "ward",
    },

    {
      title: "Đia chỉ cụ thể",
      dataIndex: "specificAddress",
      key: "specificAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      align: "center",
      title: "Thao tác",
      key: "action",
      render: (text, record, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {record.defaultAddress !== "1" && (
              <Popconfirm
                title={`Bạn có muốn xoá địa chỉ này ?`}
                onConfirm={() => handleDeleteAddress(record.idAddress)}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Tooltip title="Hủy kích hoạt">
                  <DeleteOutlined
                    style={{ color: "black", transition: "color 0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "red")}
                    onMouseOut={(e) => (e.target.style.color = "black")}
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  const handleChangeDefaultAddress = async (record) => {
    console.log("ddd", record);
    const data = {
      id: record?.idAddress,
      accountId: record?.idAccount,
    };
    console.log("data", data);
    const res = await callUpdateDefaultAddress(data);
    if (res?.status === 0) {
      setDefaultAddressRowKey(record.key);
      handleGetListAddress();
    }
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys: defaultAddressRowKey ? [defaultAddressRowKey] : [],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]);
      handleChangeDefaultAddress(selectedRows[0]);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div style={{ padding: "1rem 3rem 3rem 3rem", minHeight: 400 }}>
      <div
        style={{
          marginBottom: "1.2rem",
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button onClick={() => setIsModalCreateOpen(true)}> Thêm mới</Button>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataAddress}
          // onRow={(record) => ({
          //   onClick: () => handleChangeDefaultAddress(record),
          // })}
          pagination={false}
          scroll={{ y: 300 }}
          loading={isLoading}
        />
      </div>
      <ModalAddnewAddress
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        handleGetListAddress={handleGetListAddress}
      />
    </div>
  );
};
export default ManageAddress;
