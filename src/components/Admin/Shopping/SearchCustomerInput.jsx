import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";

const SearchCustomerInput = (props) => {
  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col span={11}>
          <Form.Item
            label="Tìm kiếm khách hàng"
            // style={{ fontSize: "3rem" }}
            name="searchCustomer"
            labelCol={{ span: 24 }}
            labelAlign="left"
          >
            <Select
              allowClear={true}
              showSearch
              inputIcon={<CaretRightOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="Khách hàng"
            name="customerName"
            labelCol={{ span: 24 }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default SearchCustomerInput;
