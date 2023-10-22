import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

const ModalCreateShoeTableItems = (props) => {
  const { setDataCreateShoeDetail, price, setPrice, quantity, setQuantity } =
    props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);

  const columns = [
    {
      title: "Shoe Details",
      dataIndex: "shoeDetails",
      width: "45%",
      render: (_, record) => {
        const { shoe, size, color } = record;
        console.log("record", record);
        return `${shoe.id} - Size ${size.id} - Color ${color.id}`;
      },
    },
    {
      title: "Price Input",
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
                message: "Please input price!",
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
      title: "Quantity",
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
                message: "Please input quantity!",
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => cancel(record)}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== null}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            {props.dataCreateShoeDetail.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <a style={{ marginLeft: 8 }}>Delete</a>
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
