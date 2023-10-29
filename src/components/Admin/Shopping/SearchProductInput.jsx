import { Col, Row, Select, Form, message } from "antd";
import {
  callAddOrderDetailAtCounter,
  callGetListOrderAtCounter,
  callGetOrderDetailAtCounterById,
} from "../../../services/api";

const SearchProductInput = (props) => {
  const { listShoeDetail, activeKey, setListOrderDetail } = props;
  const [form] = Form.useForm();

  const handleChangeShoeDetail = async (values) => {
    console.log("values", values);
    let arr = values.split("-");
    let objShoeDetailAdd = {};
    objShoeDetailAdd.idShoeDetail = arr[0];
    objShoeDetailAdd.idOrder = arr[1];
    objShoeDetailAdd.thumbanil = arr[2];
    objShoeDetailAdd.price = arr[3];
    objShoeDetailAdd.quantity = arr[4];
    objShoeDetailAdd.discount = arr[5];
    objShoeDetailAdd.status = arr[6];
    console.log("objShoeDetailAdd", objShoeDetailAdd);
    const res = await callAddOrderDetailAtCounter(objShoeDetailAdd);
    console.log("res", res);
    if (res.status === 0) {
      const resCallGetOrderDetail = await callGetOrderDetailAtCounterById(
        activeKey
      );
      console.log("resCallGetOrderDetail", resCallGetOrderDetail);
      setListOrderDetail(resCallGetOrderDetail.data);
      form.resetFields(["itemShoeDetailSelect"]);
      console.log("activeKey");
      message.success("Thêm thành công");
    }
  };

  return (
    <>
      <Form layout={"vertical"} form={form}>
        <Row>
          <Col span={24}>
            <Form.Item name="itemShoeDetailSelect">
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={listShoeDetail}
                onChange={(value) => handleChangeShoeDetail(value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default SearchProductInput;
