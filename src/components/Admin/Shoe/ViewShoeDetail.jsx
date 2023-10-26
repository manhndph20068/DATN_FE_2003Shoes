import React, { useEffect, useState } from "react";
import { Badge, Descriptions, Divider } from "antd";
import { Button, Drawer } from "antd";
import { Modal, Upload } from "antd";
// import { RcFile } from "antd/es/upload";
// import { UploadFile } from "antd/es/upload/interface";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const ViewBookDetail = (props) => {
  const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;
  const [originalImageVisible, setOriginalImageVisible] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState("");

  const onClose = () => {
    setOpenViewDetail(false);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (dataViewDetail) {
      let imgThumbnail = {},
        imgSlider = [];
      if (dataViewDetail.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: "done",
          url: dataViewDetail.thumbnail,
        };
      }
      if (dataViewDetail.images && dataViewDetail.images.length > 0) {
        dataViewDetail.images.map((item) => {
          console.log("item", item);
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: item,
          });
        });
      }
      setFileList([imgThumbnail, ...imgSlider]);
      console.log("fileList", fileList);
    }
  }, [dataViewDetail]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleOriginalImageClick = () => {
    setOriginalImageVisible(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="User Info" bordered column={2}>
          <Descriptions.Item label="id">{dataViewDetail.id}</Descriptions.Item>
          <Descriptions.Item label="Tên Giày">
            {dataViewDetail.nameShoe}
          </Descriptions.Item>
          <Descriptions.Item label="Size">
            {dataViewDetail.size}
          </Descriptions.Item>
          <Descriptions.Item label="PriceInput">
            {dataViewDetail.priceInput}
          </Descriptions.Item>
          <Descriptions.Item label="brand">
            {dataViewDetail.brand}
          </Descriptions.Item>
          <Descriptions.Item label="sole">
            {dataViewDetail.sole}
          </Descriptions.Item>
          <Descriptions.Item label="qty">
            {dataViewDetail.qty}
          </Descriptions.Item>
          <Descriptions.Item label="color">
            {dataViewDetail.color}
          </Descriptions.Item>
          <Descriptions.Item label="category" span={3}>
            <Badge status="processing" text={dataViewDetail.category} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="QrCode" span={3}>
            <img height={125} src={dataViewDetail.qrCode} />
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Ảnh Giày</Divider>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          onPreview={handlePreview}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
};
export default ViewBookDetail;
