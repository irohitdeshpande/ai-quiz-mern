import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="text-2xl">QUIZ - LOGIN <i className="ri-login-circle-line"></i></h1>
            
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item 
              name="email" 
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <input type="email" placeholder="Enter your email address" />
            </Form.Item>
            
            <Form.Item 
              name="password" 
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password!' }
              ]}
            >
              <input type="password" placeholder="Enter your password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login to Account
              </button>
              <Link to="/register" className="underline">
                Don't have an account? Register here
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
