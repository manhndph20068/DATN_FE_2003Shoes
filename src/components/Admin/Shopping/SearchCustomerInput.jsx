import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";

const SearchCustomerInput = (props) => {
  const handleChangeCustomer = (value) => {
    console.log("value", value);
  };

  const optionsCustom = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "mail1@gmail.com",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      email: "mail2@gmail.com",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      email: "mail3@gmail.com",
    },
  ];

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col span={24}>
          <Form.Item
            label="Tìm kiếm khách hàng"
            // style={{ fontSize: "3rem" }}
            name="searchCustomer"
            labelCol={{ span: 24 }}
            labelAlign="left"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            // options={listShoeDetail}
            onChange={(value) => handleChangeCustomer(value)}
            hidden
          >
            <Select
              options={optionsCustom}
              allowClear={true}
              showSearch
              inputIcon={<CaretRightOutlined />}
            />
          </Form.Item>
        </Col>
        {/* <Col span={11}>
          <Form.Item
            label="Khách hàng"
            name="customerName"
            labelCol={{ span: 24 }}
            hidden
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Col> */}
      </Row>
    </>
  );
};
export default SearchCustomerInput;
