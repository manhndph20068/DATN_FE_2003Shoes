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
  callGetListCategory,
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

const ShoeDetailModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const nameAccount = useSelector((state) => state.account.user.name);
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
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
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
  const fetchListSize = async () => {
    const res = await callListShoeSize();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setListSize(newOption);
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

  useEffect(() => {
    fetchNameShoe();
    fetchListColor();
    fetchListCategory();
    fetchListBrand();
    fetchListSize();
    fetchListSole();
    fetchListThumbnail();
    fetchListImages();
  }, []);

  useEffect(() => {
    const findNameByUrl = (arr, url) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].imgUrl === url) {
          return arr[i].imgName;
        }
      }
      return null;
    };

    if (dataUpdate?.id) {
      console.log("dataUpdate", dataUpdate);
      const arrThumbnail = [
        {
          uid: uuidv4(),
          name: findNameByUrl(listThumbnail, dataUpdate.thumbnail),
          status: "done",
          url: dataUpdate.thumbnail,
        },
      ];

      const arrSlider = dataUpdate?.images?.map((item) => {
        return {
          uid: uuidv4(),
          name: findNameByUrl(listImage, item),
          status: "done",
          url: item,
        };
      });
      console.log("dataUpdate", dataUpdate);

      const init = {
        id: dataUpdate.id,
        shoe: dataUpdate.nameShoe,
        size: dataUpdate.size,
        color: dataUpdate.color,
        price: dataUpdate.priceInput,
        category: dataUpdate.category,
        quantity: dataUpdate.qty,
        createdAt: dataUpdate.updatedAt,
        sold: dataUpdate.sold,
        sole: dataUpdate.sole,
        brand: dataUpdate.brand,
        qrCode: dataUpdate.qrCode,
        thumbnail: { fileList: arrThumbnail },
        slider: { fileList: arrSlider },
      };
      setInitForm(init);
      setDataThumbnail(arrThumbnail);
      setDataSlider(arrSlider);
      form.setFieldsValue(init);
    }
    return () => {
      form.resetFields();
    };
  }, [dataUpdate]);

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
      return null; // Trả về null nếu không tìm thấy
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
    console.log("dataUpdate._id", dataUpdate.id);
    console.log("shoe", findIdByName(listNameOfShoe, shoe));
    console.log("category", findIdByName(listCategory, category));
    console.log("sole", findIdByName(listSole, sole));
    console.log("size", findIdByName(listSize, size));
    console.log("brand", findIdByName(listBrand, brand));
    console.log("color", findIdByName(listColor, color));
    console.log("qrCode", qrCode);
    console.log("price", price);

    setIsSubmit(true);
    const res = await callUpdateShoeDetail(
      dataUpdate.id,
      findIdByName(listNameOfShoe, shoe),
      price,
      quantity,
      dataUpdate.createdAt,
      findIdByName(listColor, color),
      findIdByName(listCategory, category),
      findIdByName(listBrand, brand),
      findIdByName(listSize, size),
      findIdByName(listSole, sole),
      qrCode,
      "createdBy",
      nameAccount,
      thumbnail,
      slider
    );
    console.log("res", res);
    if (res && res.status === 0) {
      message.success("Update shoedetail thành công");
      form.resetFields();
      setDataSlider([]);
      setDataThumbnail([]);
      setOpenModalUpdate(false);
      await props.fetchAllShoes();
      window.location.reload();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
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
  return (
    <>
      <Modal
        title="Update Shoe Detail"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setInitForm(null);
          setDataUpdate(null);
          setOpenModalUpdate(false);
        }}
        okText={"Update"}
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
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Size"
                name="size"
                rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Color"
                name="color"
                rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
              >
                <Input disabled />
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
                  defaultFileList={initForm?.thumbnail?.fileList ?? []}
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
                  defaultFileList={initForm?.slider?.fileList ?? []}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Form.Item name="category"></Form.Item>
            <Form.Item name="sole"></Form.Item>
            <Form.Item name="brand"></Form.Item>
            <Form.Item name="qrCode"></Form.Item>
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
export default ShoeDetailModalUpdate;
