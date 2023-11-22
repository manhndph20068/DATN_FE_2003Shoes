import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  callUploadBookImg,
} from "../../../services/api";

const BookModalCreate = (props) => {
  const { modalCreateShoeDetailOpen, setModalCreateShoeDetailOpen } = props;
  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const showModal = () => {
    setModalCreateShoeDetailOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setModalCreateShoeDetailOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setModalCreateShoeDetailOpen(false);
  };

  const onFinish = async (values) => {
    console.log(">>> check values: ", values);
    console.log(">>> check data thumbnail: ", dataThumbnail);
    console.log(">>> check data slider: ", dataSlider);

    if (dataThumbnail.length === 0) {
      notification.error({
        message: "Error(Validate)",
        description: "Vui lòng updaload anh Thumbnail",
      });
      return;
    }

    if (dataSlider.length === 0) {
      notification.error({
        message: "Error(Validate)",
        description: "Vui lòng updaload anh Silder",
      });
      return;
    }

    const { mainText, author, price, sold, quantity, category } = values;
    const thumbnail = dataThumbnail[0].name;
    const slider = dataSlider.map((item) => item.name);

    const res = await callCreateBook(
      thumbnail,
      slider,
      mainText,
      author,
      price,
      sold,
      quantity,
      category
    );
    if (res && res.data) {
      message.success("Created boook successfully");
      form.resetFields();
      setDataSlider([]);
      setDataThumbnail([]);
      setModalCreateShoeDetailOpen(false);
      await props.fetchAllBooks();
    } else {
      notification.error({
        message: "Something Wrong !",
        description: res.message,
      });
    }
  };

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     const res = await callGetListCategory();
  //     if (res?.data) {
  //       let dt = res.data.map((item) => {
  //         return { label: item, value: item };
  //       });
  //       // console.log("dt", dt);
  //       setListCategory(dt);
  //     }
  //   };
  //   fetchCategory();
  // }, []);

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
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // const handleUploadFile = ({ file, onSuccess, onError }) => {
  //   setTimeout(() => {
  //     onSuccess("ok");
  //   }, 1000);
  // };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    console.log(">>> file ", file);
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataThumbnail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
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
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file) => {
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
        title="Tạo mới giày"
        open={modalCreateShoeDetailOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        width={"50vw"}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        //do not close when click fetchBook
        maskClosable={false}
      >
        <Form
          form={form}
          name="complex-form"
          onFinish={onFinish}
          autoComplete="off"
          //   labelCol={{ span: 8 }}
          //   wrapperCol={{ span: 16 }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên Giày"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập Tên giày!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Vui lòng nhập Tên tác giả!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập Giá tiền!" }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  min={0}
                  style={{ width: "100%" }}
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thể loại"
                name="category"
                rules={[{ required: true, message: "Vui lòng chọn Thể loại!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a Category"
                  optionFilterProp="children"
                  defaultValue={null}
                  allowClear
                  options={listCategory}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Vui lòng nhập Số lượng!" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="đã bán"
                name="sold"
                rules={[
                  { required: true, message: "Vui lòng nhập Tên tác giả!" },
                ]}
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  style={{ width: "100%" }}
                />
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
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
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
export default BookModalCreate;
