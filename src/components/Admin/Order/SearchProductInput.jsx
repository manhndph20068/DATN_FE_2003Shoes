import { useEffect, useState } from "react";
import {
  callAddOrderDetailAtCounter,
  callGetOrderDetailAtCounterById,
  callListShoeDetailAtCounter,
  callUpdateNewOrderAtCounter,
} from "../../../services/api";
import { Col, Row, Select, Form, message, Space, Button } from "antd";

const SearchProductInput = (props) => {
  const { activeKey, handleGetOrder, dataOrder, handleCalTotalPrice } = props;
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [form] = Form.useForm();

  const fetchListShoeDetailAtCounter = async () => {
    const res = await callListShoeDetailAtCounter();
    console.log("res", res);
    if (res.data.length > 0) {
      const list = res.data.map((item) => {
        return {
          price: item.priceInput,
          thumbnail: item.thumbnail,
          label: item.code,
          value:
            item.id +
            "-" +
            activeKey +
            "-" +
            item.thumbnail +
            "-" +
            item.priceInput +
            "-" +
            1 +
            "-" +
            0 +
            "-" +
            1,
        };
      });

      setListShoeDetail(list);
    } else {
      setListShoeDetail([]);
    }
  };

  const updateOrder = async () => {
    // const resHandleGetOrder = await handleGetOrder();
    // console.log("dataOrder", dataOrder);
    // console.log("resHandleGetOrder", resHandleGetOrder);
    const data = {
      id: dataOrder?.id,
      idVoucher: null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder?.customerName ?? null,
      phoneNumber: dataOrder?.phoneNumber ?? null,
      address: dataOrder?.address ?? null,
      shipFee: dataOrder?.shipFee ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: ((await handleCalTotalPrice()) ?? 0) + dataOrder?.shipFee,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: dataOrder?.updatedBy ?? null,
      note: "Nhân viên sửa",
      status: dataOrder?.status,
    };
    console.log("data", data);

    const res = await callUpdateNewOrderAtCounter(data);
    if (res.status === 0) {
      message.success("Cập nhật thành công");
      await handleGetOrder();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  const handleChangeShoeDetail = async (values) => {
    console.log("values", values);
    let arr = values.split("-");
    let objShoeDetailAdd = {};
    objShoeDetailAdd.idShoeDetail = arr[0];
    objShoeDetailAdd.idOrder = arr[1] ?? activeKey;
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
      form.resetFields(["itemShoeDetailSelect"]);
      console.log("activeKey");

      const res = await updateOrder();
      message.success("Thêm thành công");
    } else if (res.status === 3) {
      message.error("Sản phẩm đã hết hàng");
    }
  };

  useEffect(() => {
    fetchListShoeDetailAtCounter();
  }, []);

  return (
    <>
      <Form layout={"vertical"} form={form}>
        <Row>
          <Col span={24}>
            <Form.Item name="itemShoeDetailSelect">
              <Select
                showSearch
                placeholder="Chọn sản phẩm"
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
                onChange={(value) => handleChangeShoeDetail(value)}
              >
                {listShoeDetail.map((item) => {
                  return (
                    <Option value={item.value} label={item.label}>
                      <div
                        style={{
                          gap: "3rem",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <span>
                          <img
                            src={item.thumbnail}
                            alt={item.thumbnail}
                            style={{ height: "3rem", width: "3rem" }}
                          />{" "}
                        </span>

                        <span>Mã sp: {item.label}</span>
                        <span>Giá: {item.price}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
              {/* <Select options={listShoeDetail}>hi</Select> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default SearchProductInput;
