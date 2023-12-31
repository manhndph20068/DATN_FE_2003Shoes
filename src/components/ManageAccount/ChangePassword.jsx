import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
// import { callChangePassword } from "../../services/api";
import { useEffect } from "react";
import { callDoChangePassword } from "../../services/api";

const ChangePassword = (props) => {
  const { setIsModalManageAcconut, isModalManageAcconut, setTab } = props;
  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);

  const onFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    console.log("id", user.id);
    console.log("values", values);
    const data = {
      id: user.id,
      yourOldPassword: oldpass,
      newPassword: newpass,
      enterNewPassword: newpass,
    };
    const res = await callDoChangePassword(data);
    if (res?.status === 0) {
      message.success("Đổi mật khẩu thành công");
      setIsModalManageAcconut(false);
    } else {
      message.error("Đổi mật khẩu thất bại");
    }
  };

  useEffect(() => {
    if (!isModalManageAcconut) {
      form.resetFields();
      setTab(1);
    }
  }, [isModalManageAcconut, form]);

  return (
    <div
      style={{
        paddingLeft: "7rem",
        minHeight: 300,
        paddingTop: "2rem",
        // textAlign: "center",
      }}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 700 }}
      >
        <Form.Item
          name="email"
          labelCol={{ span: 5 }}
          label="Email"
          initialValue={user?.email}
        >
          <Input
            style={{ maxWidth: "350px" }}
            readOnly={true}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="oldpass"
          label="Mật khẩu cũ"
          labelCol={{ span: 5 }}
          rules={[
            { required: true, message: "Mật khẩu cũ không được để trống !" },
            {
              pattern: /^[^\s]*$/,
              message: "Không được nhập khoảng trắng!",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu cũ"
            style={{ maxWidth: "350px" }}
          />
        </Form.Item>

        <Form.Item
          name="newpass"
          label="Mật khẩu mới"
          labelCol={{ span: 5 }}
          rules={[
            {
              required: true,
              message: "Mật khẩu mới không được để trống !",
            },
            {
              pattern: /^[^\s]*$/,
              message: "Không được nhập khoảng trắng!",
            },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            style={{ maxWidth: "350px" }}
          />
        </Form.Item>

        <div style={{ paddingLeft: "7.6rem" }}>
          <Button
            className="buttonAccount"
            onClick={() => form.submit()}
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ChangePassword;
