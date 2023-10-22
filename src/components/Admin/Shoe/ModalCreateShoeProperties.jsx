import { useEffect, useRef, useState } from "react";
import {
  callCreateNewBrand,
  callCreateNewCategory,
  callCreateNewColor,
  callCreateNewShoeDetail,
  callCreateNewSize,
  callCreateNewSole,
  callListShoeBrand,
  callListShoeCategory,
  callListShoeColor,
  callListShoeSize,
  callListShoeSole,
} from "../../../services/api";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalCreateShoeTableItems from "./ModalCreateShoeTableItems";

const ModalCreateShoeProperties = (props) => {
  const [nameCategoryOptions, setNameCategoryOptions] = useState([]);
  const [addNameCategory, setAddNameCategory] = useState(null);

  const [nameBrandOptions, setNameBrandOptions] = useState([]);
  const [addNameBrand, setAddNameBrand] = useState(null);

  const [nameSoleOptions, setNameSoleOptions] = useState([]);
  const [addNameSole, setAddNameSole] = useState(null);

  const [nameColorOptions, setNameColorOptions] = useState([]);
  const [addNameColor, setAddNameColor] = useState(null);

  const [nameSizeOptions, setNameSizeOptions] = useState([]);
  const [addNameSize, setAddNameSize] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const selectRef = useRef(null);

  const fetchNameCategory = async () => {
    const res = await callListShoeCategory();
    if (res?.data && res.data.length > 0) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameCategoryOptions(newOption);
    }
  };

  const fetchNameBrand = async () => {
    const res = await callListShoeBrand();
    if (res?.data && res.data.length > 0) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameBrandOptions(newOption);
    }
  };

  const fetchNameSole = async () => {
    const res = await callListShoeSole();
    if (res?.data && res.data.length > 0) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameSoleOptions(newOption);
    }
  };

  const fetchNameColor = async () => {
    const res = await callListShoeColor();
    if (res?.data && res.data.length > 0) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameColorOptions(newOption);
    }
  };

  const fetchNameSize = async () => {
    const res = await callListShoeSize();
    if (res?.data && res.data.length > 0) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameSizeOptions(newOption);
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    if (props.dataThumbnail.length === 0) {
      notification.error({
        message: "Error(Validate)",
        description: "Vui lòng updaload anh Thumbnail",
      });
      setIsLoading(false);
      return;
    }

    if (props.dataSlider.length === 0) {
      notification.error({
        message: "Error(Validate)",
        description: "Vui lòng updaload anh Silder",
      });
      setIsLoading(false);
      return;
    }
    props.setDataCreateShoeDetail(values);
    const res = await callCreateNewShoeDetail(props.dataCreateShoeDetail);
    console.log("res", res);
    if (res.status === 0) {
      setIsLoading(false);
      message.success("Create new shoe detail success");
      props.setColorSelected(null);
      props.setSizeSelected(null);
      props.setDataCreateShoeDetail(null);
      props.setShoeNameSelected(null);
    } else {
      notification.error({
        message: "Error(add new shoe detail)",
        description: res.message,
      });
      props.setColorSelected(null);
      props.setSizeSelected(null);
      setIsLoading(false);
    }

    console.log("dataCreateShoeDetail", props.dataCreateShoeDetail);
    console.log("dataThumbnail", props.dataThumbnail);
    console.log("dataSlider", props.dataSlider);
  };

  useEffect(() => {
    form.resetFields();
    props.setColorSelected(null);
    props.setSizeSelected(null);
    props.setDataCreateShoeDetail([]);
  }, [props.shoeNameSelected]);

  useEffect(() => {
    fetchNameCategory();
    fetchNameBrand();
    fetchNameSole();
    fetchNameColor();
    fetchNameSize();
  }, []);

  const handleAddNewCategory = async () => {
    if (addNameCategory === null) {
      message.error("Vui lòng nhập tên loại giày");
      return;
    }
    if (addNameCategory.trim() !== "") {
      let exits = nameCategoryOptions.some(
        (item) => item.label === addNameCategory
      );
      if (exits) {
        message.error("Loại giày đã tồn tại");
        setAddNameCategory(null);
      } else {
        const res = await callCreateNewCategory(addNameCategory);
        if (res?.data && res.data.status === 1) {
          fetchNameCategory();
        }
        message.success("tên loại giày");
        setAddNameCategory(null);
        return;
      }
    } else {
      message.error("Vui lòng nhập tên loại giày");
      setAddNameCategory(null);
    }
  };

  const handleAddNewBrand = async () => {
    if (addNameBrand === null) {
      message.error("Vui lòng nhập tên loại giày");
      return;
    }
    if (addNameBrand.trim() !== "") {
      let exits = nameBrandOptions.some(
        (item) => item.label === addNameCategory
      );
      if (exits) {
        message.error("Brand đã tồn tại");
        setAddNameBrand(null);
      } else {
        const res = await callCreateNewBrand(addNameBrand);
        console.log("res", res);
        if (res?.data && res.data.status === 0) {
          fetchNameBrand();
        }
        message.success("tên brand");
        setAddNameBrand(null);
        return;
      }
    } else {
      message.error("Vui lòng nhập tên brand");
      setAddNameBrand(null);
    }
  };

  const handleAddNewSole = async () => {
    if (addNameSole === null) {
      message.error("Vui lòng nhập tên Sole");
      return;
    }
    if (addNameSole.trim() !== "") {
      let exits = nameSoleOptions.some((item) => item.label === addNameSole);
      if (exits) {
        message.error("Sole đã tồn tại");
        setAddNameSole(null);
      } else {
        const res = await callCreateNewSole(addNameSole);
        console.log("res", res);
        if (res?.data && res.data.status === 0) {
          fetchNameSole();
        }
        message.success("tên Sole");
        setAddNameSole(null);
        return;
      }
    } else {
      message.error("Vui lòng nhập tên Sole");
      setAddNameSole(null);
    }
  };

  const handleAddNewColor = async () => {
    if (addNameColor === null) {
      message.error("Vui lòng nhập tên Color");
      return;
    }
    if (addNameColor.trim() !== "") {
      let exits = nameColorOptions.some((item) => item.label === addNameColor);
      if (exits) {
        message.error("Color đã tồn tại");
        setAddNameColor(null);
      } else {
        const res = await callCreateNewColor(addNameColor);
        console.log("res", res);
        if (res?.data && res.data.status === 1) {
          fetchNameColor();
        }
        message.success("tên Color");
        setAddNameColor(null);
        return;
      }
    } else {
      message.error("Vui lòng nhập tên Sole");
      setAddNameColor(null);
    }
  };

  const handleAddNewSize = async () => {
    const numericRegex = /^[0-9]*(\.[0-9]+)?$/; // Biểu thức chính quy để kiểm tra số hoặc float

    if (addNameSize === null) {
      message.error("Vui lòng nhập tên Size");
      return;
    }

    if (numericRegex.test(addNameSize)) {
      // Nếu addNameSize là số hoặc float
      if (addNameSize.trim() !== "") {
        let exists = nameSizeOptions.some((item) => item.label === addNameSize);
        if (exists) {
          message.error("Size đã tồn tại");
          setAddNameSize(null);
        } else {
          const res = await callCreateNewSize(addNameSize);
          console.log("res", res);
          if (res?.data && res.data.status === 1) {
            fetchNameSize();
          }
          message.success("tên Size");
          setAddNameSize(null);
          return;
        }
      } else {
        message.error("Vui lòng nhập tên Size");
        setAddNameSize(null);
      }
    } else {
      message.error("Vui lòng nhập số hoặc float");
      setAddNameSize(null);
    }
  };

  const handleUploadFileThumbnail = async (
    { file, onSuccess, onError },
    item
  ) => {
    console.log("file", file);
    console.log("item", item);
    if (file?.name !== null) {
      props.setDataThumbnail((dataThumbnail) => [
        ...dataThumbnail,
        {
          idColor: item,
          name: file.name,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info, type) => {
    console.log("info", info);
    if (info.file.status === "uploading") {
      console.log("uploading", info.file.status);
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log("done", info.file.status);
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      props.setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = props.dataSlider.filter((x) => x.uid !== file.uid);
      props.setDataSlider(newSlider);
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

  const handleUploadFileSlider = async ({ file, onSuccess, onError }, item) => {
    if (file?.name !== null) {
      props.setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          idColor: item,
          name: file.name,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file");
    }
  };

  return (
    <>
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ width: "90%" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Loại giày"
          name="shoeCategory"
          rules={[
            {
              required: true,
              message: "Please input your shoe category!",
            },
          ]}
        >
          <Select
            style={{ width: 300 }}
            placeholder="Chọn loại giày!"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={addNameCategory}
                    onChange={(e) => {
                      setAddNameCategory(e.target.value);
                    }}
                  />
                  <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to add new item?"}
                    onConfirm={() => handleAddNewCategory()}
                    onCancel={() => setAddNameCategory(null)}
                    okText="Yes"
                    cancelText="No"
                    disabled={
                      addNameCategory === null || addNameCategory.trim() === ""
                        ? true
                        : false
                    }
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{ gap: 3 }}
                    >
                      Add item
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
            options={nameCategoryOptions}
            onChange={(value) => props.setCategorySelected(value)}
            onDropdownVisibleChange={(open) => {
              if (!open) {
                setAddNameCategory(null);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="shoeBrand"
          rules={[
            {
              required: true,
              message: "Please input your shoe brand!",
            },
          ]}
        >
          <Select
            style={{ width: 300 }}
            placeholder="Chọn Brand!"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={addNameBrand}
                    onChange={(e) => {
                      setAddNameBrand(e.target.value);
                    }}
                  />
                  <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to add new item?"}
                    onConfirm={() => handleAddNewBrand()}
                    onCancel={() => setAddNameBrand(null)}
                    okText="Yes"
                    cancelText="No"
                    disabled={
                      addNameBrand === null || addNameBrand.trim() === ""
                        ? true
                        : false
                    }
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{ gap: 3 }}
                    >
                      Add item
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
            options={nameBrandOptions}
            onChange={(value) => props.setBrandSelected(value)}
            onDropdownVisibleChange={(open) => {
              if (!open) {
                setAddNameBrand(null);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Sole"
          name="shoeSole"
          rules={[
            {
              required: true,
              message: "Please input your shoe sole!",
            },
          ]}
        >
          <Select
            style={{ width: 300 }}
            placeholder="Chọn sole!"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={addNameSole}
                    onChange={(e) => {
                      setAddNameSole(e.target.value);
                    }}
                  />
                  <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to add new item?"}
                    onConfirm={() => handleAddNewSole()}
                    onCancel={() => setAddNameSole(null)}
                    okText="Yes"
                    cancelText="No"
                    disabled={
                      addNameSole === null || addNameSole.trim() === ""
                        ? true
                        : false
                    }
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{ gap: 3 }}
                    >
                      Add item
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
            options={nameSoleOptions}
            onChange={(value) => props.setSoleSelected(value)}
            onDropdownVisibleChange={(open) => {
              if (!open) {
                setAddNameSole(null);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Color"
          name="shoeColor"
          rules={[
            {
              required: true,
              message: "Please input your shoe color!",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: 300 }}
            placeholder="Chọn color!"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={addNameColor}
                    onChange={(e) => {
                      setAddNameColor(e.target.value);
                    }}
                  />
                  <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to add new item?"}
                    onConfirm={() => handleAddNewColor()}
                    onCancel={() => setAddNameColor(null)}
                    okText="Yes"
                    cancelText="No"
                    disabled={
                      addNameColor === null || addNameColor.trim() === ""
                        ? true
                        : false
                    }
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{ gap: 3 }}
                    >
                      Add item
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
            options={nameColorOptions}
            onChange={(value) => props.setColorSelected(value)}
            onDropdownVisibleChange={(open) => {
              if (!open) {
                setAddNameColor(null);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label="Size"
          name="shoeSize"
          rules={[
            {
              required: true,
              message: "Please input your shoe size!",
            },
          ]}
        >
          <Select
            mode="multiple"
            ref={selectRef}
            style={{ width: 300 }}
            placeholder="Chọn size!"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    value={addNameSize}
                    onChange={(e) => {
                      setAddNameSize(e.target.value);
                    }}
                  />
                  <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to add new item?"}
                    onConfirm={() => handleAddNewSize()}
                    onCancel={() => setAddNameSize(null)}
                    okText="Yes"
                    cancelText="No"
                    disabled={
                      addNameSize === null || addNameSize.trim() === ""
                        ? true
                        : false
                    }
                  >
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{ gap: 3 }}
                    >
                      Add item
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
            options={nameSizeOptions}
            onChange={(value) => props.setSizeSelected(value)}
            onDropdownVisibleChange={(open) => {
              if (!open) {
                setAddNameSize(null);
              }
            }}
          />
        </Form.Item>

        <div className="img-list-shoe-item">
          {props.colorSelected &&
            props.colorSelected?.length > 0 &&
            props.sizeSelected?.length > 0 &&
            props.colorSelected.map((item) => {
              const colorName = nameColorOptions.find(
                (color) => color.value === item
              )?.label;

              // const filteredData = props.dataCreateShoeDetail.filter(
              //   (detail) => detail.color.id === item
              // );
              const filteredData = Array.isArray(props.dataCreateShoeDetail)
                ? props.dataCreateShoeDetail.filter(
                    (detail) => detail.color.id === item
                  )
                : [];

              return (
                <div key={item}>
                  Các sản phẩm màu sắc {colorName}
                  <div className="table-list-shoe-item">
                    <ModalCreateShoeTableItems
                      dataCreateShoeDetail={filteredData}
                      setDataCreateShoeDetail={props.setDataCreateShoeDetail}
                      price={props.price}
                      setPrice={props.setPrice}
                      quantity={props.quantity}
                      setQuantity={props.setQuantity}
                    />
                  </div>
                  <div
                    className="img-slider"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <Col span={12}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="Ảnh Thumbnail"
                        name="thumbnail"
                      >
                        <Upload
                          name={`thumbnail-${item}`}
                          listType="picture-card"
                          className="avatar-uploader"
                          maxCount={1}
                          multiple={false}
                          customRequest={(info) =>
                            handleUploadFileThumbnail(info, item)
                          }
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                          onRemove={(file) =>
                            handleRemoveFile(file, "thumbnail")
                          }
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
                          customRequest={(info) =>
                            handleUploadFileSlider(info, item)
                          }
                          beforeUpload={beforeUpload}
                          onChange={(info) => handleChange(info, "slider")}
                          onRemove={(file) => handleRemoveFile(file, "slider")}
                          onPreview={handlePreview}
                        >
                          <div>
                            {loadingSlider ? (
                              <LoadingOutlined />
                            ) : (
                              <PlusOutlined />
                            )}
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </div>
                </div>
              );
            })}
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
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
export default ModalCreateShoeProperties;
