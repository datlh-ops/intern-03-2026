import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../../../../schemas/master.schema';

export default function ProfileForm({ user, onSave, onCancel }) {
  const [generalError, setGeneralError] = useState("");

  const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: user?.address || '',
    },
  });

  const onInvalid = async (errors) => {
    setGeneralError("Thông tin nhập vào không hợp lệ. Vui lòng kiểm tra lại!");
    Object.keys(errors).forEach((field) => {
      setValue(field, "");
    });
    await trigger();
  };

  const onSubmit = (data) => {
    setGeneralError("");
    onSave(data);
  }

  return (
    <form className="profile-card" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Chỉnh sửa thông tin</h3>

      {generalError && <div className="form-general-error">{generalError}</div>}

      <div className="form-group">
        <label>Họ và tên Quản lý:</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Nhập họ và tên"
          {...register("name")}
        />
        {errors.name && <span className="error-msg">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Số điện thoại:</label>
        <input
          type="text"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          placeholder="0xxxxxxxxx"
          {...register("phone")}
        />
        {errors.phone && <span className="error-msg">{errors.phone.message}</span>}
      </div>

      <div className="form-group">
        <label>Email liên hệ:</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="example@gmail.com"
          {...register("email")}
        />
        {errors.email && <span className="error-msg">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Địa chỉ đăng ký:</label>
        <input
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          placeholder="Số nhà, tên đường..."
          {...register("address")}
        />
        {errors.address && <span className="error-msg">{errors.address.message}</span>}
      </div>

      <div className="button-group">
        <button type="button" className="btn-secondary" onClick={onCancel}>Hủy</button>
        <button type="submit" className="btn-primary">Lưu thay đổi</button>
      </div>
    </form>
  );
}
