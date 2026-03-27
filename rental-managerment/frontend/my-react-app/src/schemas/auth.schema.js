import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.
    string().
    required('Vui lòng nhập tên đăng nhập').
    trim().
    matches(/^\S+$/, 'Tên đăng nhập không được chứa khoảng trắng').
    min(6, 'Tên đăng nhập ít nhất 6 ký tự').
    max(50, 'Tên đăng nhập nhiều nhất 50 ký tự'),
  password: yup.
    string().
    required('Vui lòng nhập mật khẩu').
    trim().
    matches(/^\S+$/, 'Mật khẩu không được chứa khoảng trắng').
    min(6, 'Mật khẩu ít nhất 6 ký tự').
    max(50, 'Mật khẩu nhiều nhất 50 ký tự'),
}).required();

export const registerSchema = yup.object({
  username: yup.
    string().
    required('Vui lòng nhập tên').
    trim().
    matches(/^\S+$/, 'Tên không được chứa khoảng trắng').
    min(6, 'Tên ít nhất 6 ký tự').
    max(200, 'Tên nhiều nhất 200 ký tự'),
  password: yup.
    string().
    required('Vui lòng nhập mật khẩu').
    trim().
    matches(/^\S+$/, 'Mật khẩu không được chứa khoảng trắng').
    min(6, 'Mật khẩu ít nhất 6 ký tự').
    max(200, 'Mật khẩu nhiều nhất 200 ký tự'),
  role: yup.string().required('Vui lòng chọn vai trò'),
}).required();
