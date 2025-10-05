import { Form, message, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

const { Option } = Select;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
          <h1 className="text-2xl">
            QUIZ - REGISTER <i className="ri-user-add-line"></i>
          </h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item 
              name="name" 
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name!' },
                { min: 2, message: 'Name must be at least 2 characters long!' },
                { max: 50, message: 'Name cannot exceed 50 characters!' }
              ]}
            >
              <input type="text" placeholder="Enter your full name" />
            </Form.Item>
            
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
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters long!' }
              ]}
            >
              <input type="password" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item 
              name="role" 
              label="Account Type"
              rules={[{ required: true, message: 'Please select your account type!' }]}
              initialValue="user"
            >
              <Select placeholder="Select account type" size="large">
                <Option value="user">
                  <div className="flex items-center gap-2">
                    <i className="ri-user-line"></i>
                    <span>Student - Take exams and view reports</span>
                  </div>
                </Option>
                <Option value="admin">
                  <div className="flex items-center gap-2">
                    <i className="ri-admin-line"></i>
                    <span>Teacher/Admin - Create and manage exams</span>
                  </div>
                </Option>
              </Select>
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Create Account
              </button>
              <Link to="/login">Already have an account? Login here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
