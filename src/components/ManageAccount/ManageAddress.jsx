import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { callGetListAddressById } from "../../services/api";

const ManageAddress = () => {
  const [dataAddress, setDataAddress] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const user = useSelector((state) => state.account.user);
  const [defaultAddressRowKey, setDefaultAddressRowKey] = useState(null);

  const handleGetListAddress = async () => {
    const res = await callGetListAddressById(user?.id);
    if (res?.status === 0) {
      let index = 1;
      res.data.forEach((item) => {
        item.key = index++;
      });
      setDataAddress(res?.data);

      setDefaultAddressRowKey(
        res?.data.find((item) => item.defaultAddress === "1")?.key
      );
    }
  };

  useEffect(() => {
    handleGetListAddress();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "province",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "district",
      dataIndex: "district",
      key: "district",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ward",
      dataIndex: "ward",
      key: "ward",
    },

    {
      title: "specificAddress",
      dataIndex: "specificAddress",
      key: "specificAddress",
    },
    {
      title: "defaultAddress",
      dataIndex: "defaultAddress",
      key: "defaultAddress",
    },
  ];

  const rowSelection = {
    type: "radio",
    selectedRowKeys: defaultAddressRowKey ? [defaultAddressRowKey] : [],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKey(selectedRowKeys[0]);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div style={{ padding: "2rem 3rem 0 3rem", minHeight: 300 }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataAddress}
        onRow={(record) => ({
          onClick: () => {
            console.log("Row clicked:", record);
          },
        })}
      />
    </div>
  );
};
export default ManageAddress;
