import { Checkbox, Col, Divider, Form, Radio, Row, Rate } from "antd";
import "./ViewDetail.scss";
import ImageGallery from "react-image-gallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ShoeLoader from "./ShoeLoader";
import { useEffect, useState } from "react";
import {
  callAddToCartAtViewPageItemWithAccount,
  callGetListCartDetailById,
  callGetListSizeOfShoeById,
  callListShoeDetailHomePage,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddToCartAction,
  doAddToTempCart,
  doClearTempCart,
  doInitalCartWithAccount,
} from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";
import RateComponent from "./RateComponent";

const ViewDetail = (props) => {
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const {
    shoeData,
    colorOfShoe,
    setColorSelected,
    setSizeSelected,
    shoeId,
    colorSelected,
    sizeOfShoe,
    convertSlug,
    listShoeDetailGetById,
  } = props;
  const images = shoeData?.items ?? [];
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idCart = useSelector((state) => state.account.idCart);

  // const handleGetListShoeByShoeId = async () => {
  //   const res = await callGetListSizeOfShoeById(shoeId);
  //   if (res.status === 0) {
  //     setListShoeDetailGetById(res.data);
  //   }
  // };

  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
    console.log(">>> shoeData", shoeData);
    console.log(">>> shoeId", shoeId);
    console.log(">>> listShoeDetailGetById", listShoeDetailGetById);
    const tranferData = listShoeDetailGetById.find(
      (item) => item.nameOfSize === values.size
    );
    console.log(">>> tranferData", tranferData);
    if (tranferData.shoeDetailId) {
      form.setFieldsValue({
        size: values.size,
      });
      // setSizeSelected(values.size);
      setCurrentQuantity(1);
      navigate(
        `/shoe/${convertSlug(shoeData.nameShoe)}?id=${tranferData.shoeDetailId}`
      );
    }

    // setColorSelected(changedValues.color);
  };
  // useEffect(() => {
  //   setSizeSelected(shoeData.size);
  // }, [sizeSelected]);

  // useEffect(() => {
  //   form.resetFields(["size"]);
  //   console.log("resetFields----------------------------------------");
  //   setSizeSelected(shoeData.size);
  // }, [colorSelected, sizeSelected]);

  const handleChangeButton = (type) => {
    if (type === "MINUS") {
      if (currentQuantity - 1 <= 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }
    if (type === "PLUS") {
      console.log("shoeData", shoeData);
      if (currentQuantity + 1 > shoeData.qty) return;
      setCurrentQuantity(currentQuantity + 1);
    }
  };

  const handleChangeInput = (value) => {
    if (!isNaN(value)) {
      if (+value > 0 && +value <= +shoeData.qty) {
        setCurrentQuantity(+value);
      }
    }
  };

  const handleAddToCartWithAccount = async (idCart, idShoeDetail, qty) => {
    const res = await callAddToCartAtViewPageItemWithAccount(
      idCart,
      idShoeDetail,
      qty
    );
    if (res?.status === 0) {
      handleGetListCartDetailById(idCart);
    }
  };

  const handleGetListCartDetailById = async (id) => {
    const res = await callGetListCartDetailById(id);
    if (res?.status === 0) {
      dispatch(doInitalCartWithAccount(res.data));
    }
  };

  const handleAddToCart = (qty, shoe) => {
    if (idCart !== null) {
      handleAddToCartWithAccount(idCart, +shoe.id, +qty);
      setCurrentQuantity(1);
    } else {
      dispatch(
        doAddToCartAction({
          quantity: qty,
          detail: shoe,
          id: shoe.id,
          status: 0,
        })
      );
    }
  };

  const handlePaidNow = (qty, shoe) => {
    dispatch(doClearTempCart());
    console.log("handlePaidNow", qty, shoe);
    dispatch(
      doAddToTempCart({
        quantity: qty,
        detail: shoe,
        id: shoe.id,
        status: 1,
      })
    );
    navigate("/order-now");
  };

  // useEffect(() => {
  //   handleGetListShoeByShoeId();
  // }, [shoeId]);

  return (
    <>
      {shoeData && shoeData.id ? (
        <div style={{ background: "#f2f2f2", padding: "20px 0" }}>
          <div
            className="view-detail-book"
            style={{ maxWidth: 1290, margin: "0 auto" }}
          >
            <div
              style={{
                padding: "20px",
                background: "#FFFFFF",
                borderRadius: "6px",
              }}
            >
              <Row gutter={[25, 20]}>
                <Col md={10} sm={0} xs={0}>
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    renderLeftNav={() => <></>}
                    renderRightNav={() => <></>}
                    slideOnThumbnailOver={true}
                    autoPlay={true}
                  />
                </Col>
                <Col md={14} sm={24} xs={24}>
                  <Col md={0} sm={24} xs={24}>
                    <ImageGallery
                      items={images}
                      showPlayButton={false}
                      showFullscreenButton={false}
                      renderLeftNav={() => <></>}
                      renderRightNav={() => <></>}
                      slideOnThumbnailOver={true}
                      autoPlay={true}
                    />
                  </Col>
                  <Col span={24}>
                    <div className="right-content">
                      <div className="brand" style={{ fontSize: "1rem" }}>
                        Brand: <a href="#">{shoeData.brand}</a>
                      </div>
                      <div className="category" style={{ fontSize: "1rem" }}>
                        Category: <a href="#">{shoeData.category}</a>
                      </div>
                      <div className="code" style={{ fontSize: "1rem" }}>
                        <p>Mã Sp: {shoeData.code}</p>
                      </div>
                      <div className="title" style={{ fontSize: "20px" }}>
                        {shoeData.nameShoe}
                      </div>
                      <div className="rating">
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span className="sold">
                          <Divider type="vertical" />
                          {/* Đã bán: {shoeData.sold} */}
                        </span>
                      </div>
                      <div
                        className="price"
                        style={{
                          fontSize: "15px",
                          // backgroundColor: "rgb(250, 250, 250)",
                        }}
                      >
                        <span className="currency">
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(shoeData.priceInput)}
                        </span>
                      </div>
                      <Divider />
                      <div className="delivery">
                        <>
                          <Form
                            form={form}
                            onValuesChange={(changedValues, values) =>
                              handleChangeFilter(changedValues, values)
                            }
                          >
                            <Form.Item
                              name="size"
                              label="Size"
                              labelCol={{ span: 24 }}
                              initialValue={shoeData.size}
                            >
                              <Radio.Group>
                                <Row>
                                  {sizeOfShoe.length > 0 &&
                                    sizeOfShoe.map((item, index) => {
                                      return (
                                        <Col
                                          style={{ padding: "5px 0" }}
                                          key={index + 1}
                                        >
                                          <Radio value={item}>{item}</Radio>
                                        </Col>
                                      );
                                    })}
                                </Row>
                              </Radio.Group>
                            </Form.Item>
                          </Form>
                        </>
                      </div>
                      <div className="color">{}</div>
                      <div className="quantity">
                        <span className="left-side">Số lượng:</span>
                        <span className="right-side">
                          <button
                            className="btn"
                            onClick={() => handleChangeButton("MINUS")}
                          >
                            <MinusOutlined />
                          </button>
                          <input
                            className="btn inp"
                            onChange={(e) => handleChangeInput(e.target.value)}
                            value={currentQuantity}
                          />
                          <button
                            className="btn"
                            onClick={() => handleChangeButton("PLUS")}
                          >
                            <PlusOutlined />
                          </button>
                        </span>
                      </div>
                      <div className="add-to-cart">
                        <button
                          className="btn-add-to-cart"
                          onClick={() =>
                            handleAddToCart(currentQuantity, shoeData)
                          }
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <button
                          className="btn-paid"
                          onClick={() =>
                            handlePaidNow(currentQuantity, shoeData)
                          }
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
          <div
            className="Rate"
            style={{ background: "#f2f2f2", padding: "20px 0" }}
          >
            <div style={{ maxWidth: 1290, margin: "0 auto" }}>
              <div
                style={{
                  padding: "25px",
                  background: "#FFFFFF",
                  borderRadius: "6px",
                }}
              >
                <RateComponent shoeData={shoeData} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ShoeLoader />
      )}
    </>
  );
};
export default ViewDetail;
