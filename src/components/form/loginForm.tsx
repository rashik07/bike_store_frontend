import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from?.pathname || (user.role === "admin" ? "/admin/dashboard" : user.role === "customer" ? "/" : "login");
      navigate(redirectTo);
    }
  }, [user, navigate, location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    const key = "login";
    message.loading({ content: "Logging in...", key });
    try {
      const res = await login(values).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      message.success({ content: "Logged in successfully!", key, duration: 2 });
      
      const redirectTo = location.state?.from?.pathname || (user.role === "admin" ? "/admin/dashboard" : user.role === "customer" ? "/" : "login");
      navigate(redirectTo);
    } catch (error) {
      console.error("Login error", error);
      message.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg p-6">
        <Title level={2} className="text-center mb-6">
          Login
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email!", type: "email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Button type="default" block onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </Card>
    </div>
  );
};

export default LoginForm;
