const validate = (dtoFunction) => {
  return (req, res, next) => {
    try {
      const cleanedData = dtoFunction(req.body);
      req.body = cleanedData;

      next();
    } catch (err) {
      console.error("[DTO Error] Lỗi xử lý dữ liệu đầu vào:", err.message);
      res.status(400).json({ error: "Dữ liệu gửi lên không đúng định dạng!" });
    }
  };
};

module.exports = validate;
