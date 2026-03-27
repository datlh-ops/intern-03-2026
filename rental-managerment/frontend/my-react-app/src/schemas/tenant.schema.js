import * as yup from 'yup';

export const tenantProfileSchema = yup.object({
  name: yup
    .string()
    .required('Họ và tên không được để trống')
    .min(2, 'Họ và tên quá ngắn')
    .matches(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái'),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Số điện thoại không hợp lệ'),
}).required();
