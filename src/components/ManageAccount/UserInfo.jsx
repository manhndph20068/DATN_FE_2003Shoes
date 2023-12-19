import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Upload, message } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  callFetchAccount,
  callGetCartByAccountId,
  callGetDataUserById,
  callUpdateInforAccount,
} from "../../services/api";
import { doAddIdCart, doLogin } from "../../redux/account/accountSlice";
import "./ManageAccount.scss";
const UserInfo = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const {
    userAvatar,
    setUseravatar,
    setIsModalManageAcconut,
    urlAvatar,
    setUrlAvatar,
    dataUser,
  } = props;
  // const [urlAvatar, setUrlAvatar] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [base64Url, setBase64Url] = useState(null);
  const [form] = Form.useForm();

  console.log("dataUser", dataUser);

  const fetchAccount = async () => {
    const res = await callFetchAccount();
    if (res?.id) {
      dispatch(doLogin(res));
    }
  };

  const onFinish = async (values) => {
    const { fullName, email } = values;
    console.log("values", values);

    console.log("avatar", fileList[0]?.name);
    const data = {
      id: user?.id,
      name: fullName,
      email: email,
      avatar: fileList[0]?.name,
    };
    const res = await callUpdateInforAccount(data);
    if (res && res?.data) {
      message.success("Cập nhật thông tin thành công !");
      fetchAccount();
    } else {
      message.error("Cập nhật thông tin thất bại !");
    }
  };

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    console.log("file", file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUrlAvatar(event.target.result);
      if (file?.name !== null) {
        setFileList([
          {
            name: file.name,
            uid: file.uid,
            size: file.size,
            type: file.type,
            thumbUrl: event.target.result,
          },
        ]);
        onSuccess("ok");
      } else {
        onError("Đã có lỗi khi upload file");
      }
    };
    reader.onerror = (event) => {
      console.error("file reading error", event);
    };
    reader.readAsDataURL(file);
  };

  const handleGetDataUser = async () => {
    console.log("user.id", user?.id);
    const res = await callGetDataUserById(user?.id);
    console.log("res", res);
    if (res?.data && res?.data?.length > 0) {
      setUrlAvatar(res?.data[0]);
    }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    fileList: fileList,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`File uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`File upload failed.`);
      }
    },
  };

  useEffect(() => {
    // setUseravatar(user?.avatar);
    // handleGetDataUser();
    form.setFieldValue("email", user?.email);
    form.setFieldValue("fullName", dataUser?.name);
  }, [dataUser]);

  return (
    <div style={{ minHeight: 300, paddingTop: "2rem" }}>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 113, xxl: 113 }}
                  icon={<AntDesignOutlined />}
                  shape="square"
                  src={urlAvatar}
                />
              </div>
            </Col>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Upload {...propsUpload}>
                  <Button className="iconAccount" icon={<UploadOutlined />}>
                    Chọn ảnh
                  </Button>
                </Upload>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="email"
              labelCol={{ span: 24 }}
              label="Email"
              //   initialValue={userEmail}
            >
              <Input readOnly={true} disabled={true} />
            </Form.Item>
            <Form.Item
              name="fullName"
              labelCol={{ span: 24 }}
              label="Họ và tên"
              rules={[
                { required: true, message: "Họ và tên không được để trống" },
                {
                  pattern: /^[^\s]*$/,
                  message: "Không được nhập khoảng trắng!",
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Button htmlType="submit" className="buttonAccount">
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
