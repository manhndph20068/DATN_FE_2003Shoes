import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Upload, message } from "antd";
import { useSelector } from "react-redux";
// import {
//   callFetchAccount,
//   callUpdaloadAvatar,
//   callUpdateUserInfor,
// } from "../../services/api";
import { useDispatch } from "react-redux";
// import {
//   doUpdateUserInfoAtion,
//   doUploadAvatarAtion,
// } from "../../redux/account/accountSlice";
import { useState } from "react";
import { useEffect } from "react";

const UserInfo = (props) => {
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.account.user);
  const { userAvatar, setUseravatar, setIsModalManageAcconut } = props;
  const [form] = Form.useForm();
  //   const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
  //     userAvatar || user?.avatar
  //   }`;

  //   const userEmail = user?.email;

  const onFinish = async (values) => {
    //   const { phone, fullName } = values;
    //   const res = await callUpdateUserInfor(
    //     user?.id,
    //     phone,
    //     fullName,
    //     userAvatar
    //   );
    //   if (res && res?.data) {
    //     message.success("Cập nhật thông tin thành công !");
    //     dispatch(doUpdateUserInfoAtion({ phone, fullName, avatar: userAvatar }));
    //     localStorage.removeItem("access_token");
    //     // await callFetchAccount();
    //     setIsModalManageAcconut(false);
    //     // window.location.reload(true);
    //   } else {
    //     message.error("Cập nhật thông tin thất bại !");
    //   }
  };

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    //   const res = await callUpdaloadAvatar(file);
    //   if (res && res?.data) {
    //     const newAvatar = res.data.fileUploaded;
    //     // dispatch(doUploadAvatarAtion(newAvatar));
    //     setUseravatar(newAvatar);
    //     onSuccess("Ok");
    //   } else {
    //     onError("Error");
    //   }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    // customRequest: handleUploadAvatar,
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

  // useEffect(() => {
  //   setUseravatar(user?.avatar);
  // }, []);

  return (
    <div style={{ minHeight: 350 }}>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={12}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Avatar
                  size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 113, xxl: 113 }}
                  icon={<AntDesignOutlined />}
                  shape="circle"
                  //   src={urlAvatar}
                />
              </div>
            </Col>
            <Col span={24}>
              <div style={{ textAlign: "center" }}>
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
              rules={[{ required: true }]}
              //   initialValue={user?.fullName}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              labelCol={{ span: 24 }}
              //   initialValue={user?.phone}
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^0\d{9}$/),
                  message: "Số điện thoại không hợp lệ !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Button onClick={() => form.submit()} htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default UserInfo;
