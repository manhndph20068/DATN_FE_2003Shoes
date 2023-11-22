import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import {
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const ModalCreateShoeTableItems = (props) => {
  const { setDataCreateShoeDetail, price, setPrice, quantity, setQuantity } =
    props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);

  const columns = [
    {
      title: "Chi tiết giày",
      dataIndex: "shoeDetails",
      width: "45%",
      render: (_, record) => {
        const { shoe, size, color } = record;
        console.log("record", record);
        return `${shoe.id} - Size ${size.id} - Color ${color.id}`;
      },
    },
    {
      title: "Giá",
      dataIndex: "priceInput",
      width: "25%",
      editable: true,
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={`priceInput-${record.key}`}
            initialValue={text}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "15%",
      editable: true,
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={`quantity-${record.key}`}
            initialValue={text}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng!",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
        ) : (
          text
        );
      },
    },

    {
      title: "",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link style={{ marginRight: 8 }}>
              <Popconfirm
                title="Bạn có chắc chắn muốn cập nhật?"
                okText="Đồng ý"
                cancelText="Không"
                onConfirm={() => save(record)}
              >
                <a>Lưu</a>
              </Popconfirm>
            </Typography.Link>
            <Popconfirm
              title="Bạn muốn hủy cập nhật?"
              okText="Đồng ý"
              cancelText="Không"
              onConfirm={() => cancel(record)}
            >
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== null}
              onClick={() => edit(record)}
            >
              <EditOutlined
                style={{ color: "black", transition: "color 0.3s" }}
                onMouseOver={(e) => (e.target.style.color = "blue")}
                onMouseOut={(e) => (e.target.style.color = "black")}
              />
            </Typography.Link>
            {props.dataCreateShoeDetail.length >= 1 ? (
              <Popconfirm
                title="Bạn có muốn xóa?"
                onConfirm={() => handleDelete(record.key)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <a style={{ marginLeft: 8 }}>
                  <DeleteOutlined
                    style={{ color: "black", transition: "color 0.3s" }}
                    onMouseOver={(e) => (e.target.style.color = "red")}
                    onMouseOut={(e) => (e.target.style.color = "black")}
                  />
                </a>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleDelete = (key) => {
    setDataCreateShoeDetail((prevData) => {
      const itemToDelete = prevData.find((item) => item.key === key);
      const newData = prevData.filter(
        (item) =>
          item.color.id !== itemToDelete.color.id ||
          item.size.id !== itemToDelete.size.id
      );
      return newData;
    });
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields([
        `priceInput-${record.key}`,
        `quantity-${record.key}`,
      ]);

      setDataCreateShoeDetail((prevData) => {
        return prevData.map((item) => {
          if (item.key === record.key) {
            const updatedItem = {
              ...item,
              priceInput: row[`priceInput-${record.key}`],
              quantity: row[`quantity-${record.key}`],
            };

            setPrice((prevPrice) => [
              ...prevPrice,
              {
                idColor: updatedItem.color.id,
                idSize: updatedItem.size.id,
                price: updatedItem.priceInput,
              },
            ]);

            setQuantity((prevQuantity) => [
              ...prevQuantity,
              {
                idColor: updatedItem.color.id,
                idSize: updatedItem.size.id,
                quantity: updatedItem.quantity,
              },
            ]);

            return updatedItem;
          }

          return item;
        });
      });

      setEditingKey(null);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={props.dataCreateShoeDetail}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default ModalCreateShoeTableItems;
