import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../service/authService";
import "./auth.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormField from "../../components/Common/FormField";
import { useState } from "react";

import { registerSchema as schema } from '../../schemas/auth.schema';

export default function Register() {
  const [generalError, setGeneralError] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      role: "user",
    },
  });
  const navigate = useNavigate();

  const onInvalid = (errors) => {
    setGeneralError("Thông tin đăng ký không hợp lệ.");
    Object.keys(errors).forEach((field) => {
      setValue(field, "");
    });
  };

  const onSubmit = async (data) => {
    try {
      setGeneralError("");
      await registerUser(data.username, data.password, data.role);
      alert("Đăng ký thành công! Vui lòng Đăng nhập.");
      navigate("/login");
    } catch (error) {
      setGeneralError("Đăng ký thất bại! Tên đăng nhập có thể đã tồn tại.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Tạo tài khoản</h2>
        {generalError && <div className="form-general-error">{generalError}</div>}
        <form className="auth-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <FormField
            name="username"
            placeholder="Tên người dùng hoặc email"
            register={register}
            error={errors.username}
          />

          <FormField
            name="password"
            type="password"
            placeholder="Mật khẩu"
            register={register}
            error={errors.password}
          />

          <FormField
            name="role"
            type="select"
            register={register}
            error={errors.role}
            options={[
              { value: "user", label: "Khách thuê phòng" },
              { value: "master", label: "Chủ nhà trọ" }
            ]}
          />

          <button className="auth-button" type="submit">
            Tạo tài khoản
          </button>
        </form>
        <p className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
