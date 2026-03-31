const yup = require("yup");
const mongoose = require("mongoose");

const roomSchema = yup.object({
  roomNumber: yup
    .string()
    .required("Số phòng là bắt buộc")
    .trim()
    .min(1, "Số phòng không được để trống"),
  price: yup
    .number()
    .typeError("Giá phòng phải là một số")
    .required("Giá thuê là bắt buộc")
    .min(1000000, "Giá thuê phải lớn hơn 1.000.000")
    .max(10000000, "Giá thuê phải nhỏ hơn 10.000.000")
    .positive("Giá thuê phải lớn hơn 0"),
  capacity: yup
    .number()
    .typeError("Sức chứa phải là một số")
    .integer("Sức chứa phải là số nguyên")
    .min(1, "Sức chứa tối thiểu là 1 người")
    .max(5, "Sức chứa tối đa là 5 người")
    .default(2),
  currentTenants: yup
    .number()
    .typeError("Số người đang ở phải là một số")
    .integer("Số người đang ở phải là số nguyên")
    .min(0, "Số người đang ở không được âm")
    .max(5, "Số người đang ở không được vượt quá sức chứa")
    .default(0)
    .test(
      "is-less-or-equal",
      "Số người đang ở không được vượt quá sức chứa",
      function (value) {
        return value <= this.parent.capacity;
      }
    ),
  status: yup
    .string()
    .oneOf(
      ["Trống", "Đang xử lý", "Đã thuê", "Bảo trì"],
      "Trạng thái phòng không hợp lệ"
    )
    .default("Trống"),
  masterId: yup
    .string()
    .required("Thiếu thông tin chủ trọ")
    .test("is-valid-objectid", "Master ID không hợp lệ", (value) =>
      mongoose.Types.ObjectId.isValid(value)
    ),
  area: yup
    .number()
    .typeError("Diện tích phải là một số")
    .required("Diện tích là bắt buộc")
    .positive("Diện tích phải lớn hơn 0")
    .max(100, "Diện tích phải nhỏ hơn 100")
    .default(20),
  title: yup
    .string()
    .required("Tiêu đề là bắt buộc")
    .trim()
    .min(1, "Tiêu đề không được để trống")
    .max(100, "Tiêu đề không được vượt quá 100 ký tự"),
  district: yup
    .string()
    .required("Quận là bắt buộc")
    .trim()
    .min(1, "Quận không được để trống")
    .max(100, "Quận không được vượt quá 100 ký tự"),
  location: yup
    .string()
    .required("Địa chỉ là bắt buộc")
    .trim()
    .min(1, "Địa chỉ không được để trống")
    .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
  city: yup
    .string()
    .required("Thành phố là bắt buộc")
    .trim()
    .min(1, "Thành phố không được để trống")
    .max(20, "Thành phố không được vượt quá 20 ký tự"),
  ward: yup
    .string()
    .required("Phường là bắt buộc")
    .trim()
    .min(1, "Phường không được để trống")
    .max(20, "Phường không được vượt quá 20 ký tự"),
  isTrending: yup
    .boolean()
    .default(false),
});

class RoomDTO {
  static async validateRoom(data) {
    return await roomSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  }
}

module.exports = RoomDTO;
