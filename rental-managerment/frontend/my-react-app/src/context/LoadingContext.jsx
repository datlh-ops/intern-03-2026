import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import "../styles/loading.css";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  // Bộ đếm đếm số lượng hàm đang chạy dở.
  // 1 trang gọi 2 API cùng lúc -> Đếm = 2. Trả về thành công 1 cái -> Đếm = 1.
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // 1️⃣ CA GÁC SỐ 1: Bắt Lệnh Request Trước Khi Xuất Phát
    const reqInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        // Tăng bộ đếm Request lên 1 (Kích hoạt Tấm màn nhòe)
        setRequestCount((prev) => prev + 1);
        return config;
      },
      (error) => {
        // Bị lỗi mạng từ lúc chưa kịp đi
        setRequestCount((prev) => Math.max(0, prev - 1));
        return Promise.reject(error);
      }
    );

    // 2️⃣ CA GÁC SỐ 2: Bắt Kết Quả Response Trả Về Từ Server
    const resInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        // Dữ liệu đáp cánh an toàn -> Giảm bộ đếm đi 1 (Trừ đến 0 là tắt màn mờ)
        setRequestCount((prev) => Math.max(0, prev - 1));
        return response;
      },
      (error) => {
        // Bay trả về báo lỗi 400, 500 thì cũng phải hạ bộ đếm để tắt xoay màn hình
        setRequestCount((prev) => Math.max(0, prev - 1));
        return Promise.reject(error);
      }
    );

    // Cleanup: Khử lệnh gác cổng nếu Component này lỡ bị Unmount để chống tràn RAM
    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const isLoading = requestCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && (
        <div className="global-loading-overlay">
          <div className="simple-spinner"></div>
          <div className="loading-text">Vui Lòng chờ chút...</div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
