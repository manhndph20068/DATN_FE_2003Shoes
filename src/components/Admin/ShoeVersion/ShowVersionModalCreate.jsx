import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import {
  callCreateBook,
  callCreateNewShoeDetail,
  callGetListCategory,
  callGetListSizeExits,
  callGetShoeByName,
  callListNameShoe,
  callListShoeBrand,
  callListShoeCategory,
  callListShoeColor,
  callListShoeImages,
  callListShoeSize,
  callListShoeSole,
  callListShoeThumbnail,
  callUpdateBook,
  callUpdateShoeDetail,
  callUploadBookImg,
} from "../../../services/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const ShowVersionModalCreate = (props) => {
  const {
    modalCreateOpen,
    setModalCreateOpen,
    listVersion,
    handleGetListVersionOfShoe,
  } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [listNameOfShoe, setListNameOfShoe] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [listThumbnail, setListThumbnail] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [initForm, setInitForm] = useState(null);
  const [sizeExits, setSizeExits] = useState([]);
  const [shoe, setShoe] = useState(null);
  const [form] = Form.useForm();

  const fetchNameShoe = async () => {
    const res = await callListNameShoe();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setListNameOfShoe(newOption);
    }
  };
  const fetchListColor = async () => {
    const res = await callListShoeColor();
    if (res?.data) {
      console.log("res.data callListShoeColor", res.data);
      // const dataActive = res.data.filter((item) => item.status === 1);
      const newOption = res.data
        .filter((item) => item.status === 1)
        ?.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });

      setListColor(newOption);
    }
  };

  const fetchListCategory = async () => {
    const res = await callListShoeCategory();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setListCategory(newOption);
    }
  };

  const fetchListBrand = async () => {
    const res = await callListShoeBrand();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setListBrand(newOption);
    }
  };

  useEffect(() => {
    fetchListSize();
  }, [sizeExits]);

  const fetchListSize = async () => {
    const res = await callListShoeSize();
    if (res?.data) {
      if (sizeExits.length > 0) {
        const newOption = res.data
          ?.filter((item) => item.status === 1 && !sizeExits.includes(item.id))
          ?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
        setListSize(newOption);
      } else {
        const newOption = res.data
          ?.filter((item) => item.status === 1)
          ?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          });
        setListSize(newOption);
      }
    }
  };

  const fetchListSole = async () => {
    const res = await callListShoeSole();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setListSole(newOption);
    }
  };

  const fetchListThumbnail = async () => {
    const res = await callListShoeThumbnail();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          imgUrl: item.imgUrl,
          imgName: item.imgName,
        };
      });
      setListThumbnail(newOption);
    }
  };

  const fetchListImages = async () => {
    const res = await callListShoeImages();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          imgUrl: item.imgUrl,
          imgName: item.imgName,
        };
      });
      setListImage(newOption);
    }
  };

  const handleGetShoeByName = async () => {
    console.log("form.getFieldValue", listVersion[0]?.nameShoe);
    const res = await callGetShoeByName(listVersion[0]?.nameShoe);
    setShoe(res.data.id);
  };

  useEffect(() => {
    fetchNameShoe();
    fetchListColor();
    fetchListCategory();
    fetchListBrand();
    fetchListSize();
    fetchListSole();
    fetchListThumbnail();
    if (listVersion[0]?.nameShoe) {
      handleGetShoeByName();
    }
  }, [listVersion[0]?.nameShoe]);

  // useEffect(() => {
  //   const findNameByUrl = (arr, url) => {
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].imgUrl === url) {
  //         return arr[i].imgName;
  //       }
  //     }
  //     return null;
  //   };

  //   if (dataUpdate?.id) {
  //     console.log("dataUpdate", dataUpdate);
  //     const arrThumbnail = [
  //       {
  //         uid: uuidv4(),
  //         name: findNameByUrl(listThumbnail, dataUpdate.thumbnail),
  //         status: "done",
  //         url: dataUpdate.thumbnail,
  //       },
  //     ];

  //     const arrSlider = dataUpdate?.images?.map((item) => {
  //       return {
  //         uid: uuidv4(),
  //         name: findNameByUrl(listImage, item),
  //         status: "done",
  //         url: item,
  //       };
  //     });
  //     console.log("dataUpdate", dataUpdate);

  //     const init = {
  //       id: dataUpdate.id,
  //       shoe: dataUpdate.nameShoe,
  //       size: dataUpdate.size,
  //       color: dataUpdate.color,
  //       price: dataUpdate.priceInput,
  //       category: dataUpdate.category,
  //       quantity: dataUpdate.qty,
  //       createdAt: dataUpdate.updatedAt,
  //       sold: dataUpdate.sold,
  //       sole: dataUpdate.sole,
  //       brand: dataUpdate.brand,
  //       qrCode: dataUpdate.qrCode,
  //       thumbnail: { fileList: arrThumbnail },
  //       slider: { fileList: arrSlider },
  //     };
  //     setInitForm(init);
  //     setDataThumbnail(arrThumbnail);
  //     setDataSlider(arrSlider);
  //     form.setFieldsValue(init);
  //   }
  //   return () => {
  //     form.resetFields();
  //   };
  // }, [dataUpdate]);

  // useEffect(() => {
  //   if (listVersion.length > 0) {
  //     console.log("listVersion", listVersion);
  //     const init = {
  //       shoe: listVersion[0]?.nameShoe,
  //       // size: dataUpdate.size,
  //       // color: dataUpdate.color,
  //       // price: dataUpdate.priceInput,
  //       category: listVersion[0]?.category,
  //       // quantity: dataUpdate.qty,
  //       // createdAt: dataUpdate.updatedAt,
  //       // sold: dataUpdate.sold,
  //       sole: listVersion[0]?.sole,
  //       brand: listVersion[0].brand,
  //       // qrCode: dataUpdate.qrCode,
  //       // thumbnail: { fileList: arrThumbnail },
  //       // slider: { fileList: arrSlider },
  //     };
  //     setInitForm(init);
  //     form.setFieldsValue(init);
  //   }
  // }, [listVersion]);

  const onFinish = async (values) => {
    if (dataThumbnail.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }

    if (dataSlider.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh slider",
      });
      return;
    }

    const findIdByName = (arr, name) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
          return arr[i].id;
        }
      }
      return null;
    };

    const {
      shoe,
      brand,
      price,
      size,
      quantity,
      category,
      sole,
      color,
      qrCode,
    } = values;
    const thumbnail = [{ imgName: dataThumbnail[0].name }];
    const slider = dataSlider.map((item) => ({ imgName: item.name }));

    console.log("values", values);
    console.log("thumbnail", thumbnail);
    console.log("slider", slider);
    // console.log("dataUpdate._id", dataUpdate.id);
    console.log("shoe", findIdByName(listNameOfShoe, shoe));
    console.log("category", findIdByName(listCategory, category));
    console.log("sole", findIdByName(listSole, sole));
    // console.log("size", findIdByName(listSize, size));
    console.log("brand", findIdByName(listBrand, brand));
    // console.log("color", findIdByName(listColor, color));
    console.log("qrCode", qrCode);
    console.log("price", price);

    const data = [
      {
        key: 0,
        shoe: {
          id: findIdByName(listNameOfShoe, shoe),
        },
        priceInput: price,
        quantity: quantity,
        createdAt: null,
        updatedAt: null,
        status: 1,
        color: {
          id: color,
        },
        size: {
          id: size,
        },
        category: {
          id: findIdByName(listCategory, category),
        },
        brand: {
          id: findIdByName(listBrand, brand),
        },
        sole: {
          id: findIdByName(listSole, sole),
        },
        thumbnails: thumbnail,
        images: slider,
      },
    ];

    console.log("data", data);
    setIsSubmit(true);
    const res = await callCreateNewShoeDetail(data);
    if (res.status === 0) {
      notification.success({
        message: "Tạo phiên bản giày thành công",
      });
      setModalCreateOpen(false);
      setIsSubmit(false);
      form.resetFields();
      await handleGetListVersionOfShoe();
      // setInitForm(null);
      // setDataUpdate(null);
    } else {
      notification.error({
        message: "Tạo phiên bản giày thất bại",
      });
      setIsSubmit(false);
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info, type) => {
    console.log("info", info);
    console.log("type", type);
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        console.log("url", url);
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    console.log("file", file.name);
    if (file?.name !== null) {
      setDataThumbnail([
        // ...dataThumbnail,
        {
          name: file.name,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    if (file?.name !== null) {
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: file.name,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      console.log("dataSlider", dataSlider);
      console.log("file.uid", file.uid);
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      console.log("dataSliderÀter", newSlider);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file) => {
    console.log("file", file);
    if (file.url && !file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      return;
    }
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };

  const onChangeColor = async (values) => {
    console.log("values", values);
    console.log("shoe", shoe);
    const data = {
      idShoe: +shoe,
      idColor: +values,
    };
    const res = await callGetListSizeExits(data);
    if (res?.data && res.status === 0) {
      setSizeExits(res.data);
      form.setFieldsValue({ size: null });
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Thêm mới phiên bản giày"
        open={modalCreateOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          // setInitForm(null);
          // setDataUpdate(null);
          setModalCreateOpen(false);
        }}
        okText={"Xác nhận"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        //do not close when click outside
        maskClosable={false}
      >
        <Divider />
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên Giày"
                name="shoe"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hiển thị!" },
                ]}
                initialValue={listVersion[0]?.nameShoe}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Color"
                name="color"
                rules={[{ required: true, message: "Vui lòng chọn màu!" }]}
              >
                <Select
                  options={listColor}
                  onChange={(values) => onChangeColor(values)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Size"
                name="size"
                rules={[{ required: true, message: "Vui lòng chọn kích cỡ!" }]}
              >
                <Select options={listSize} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
              >
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                  // defaultFileList={initForm?.thumbnail?.fileList ?? []}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                  // defaultFileList={initForm?.slider?.fileList ?? []}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Form.Item
              name="category"
              initialValue={listVersion[0]?.category}
            ></Form.Item>
            <Form.Item
              name="sole"
              initialValue={listVersion[0]?.sole}
            ></Form.Item>
            <Form.Item
              name="brand"
              initialValue={listVersion[0]?.brand}
            ></Form.Item>
            <Form.Item
              name="qrCode"
              initialValue={listVersion[0]?.qrCode}
            ></Form.Item>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default ShowVersionModalCreate;
