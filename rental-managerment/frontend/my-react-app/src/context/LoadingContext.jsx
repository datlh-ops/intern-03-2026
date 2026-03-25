import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import "../styles/loading.css";


const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);
export const LoadingProvider = ({ children }) => {
  const [requestCount, setRequestCount] = useState(0);
  useEffect(() => {
    const reqInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        setRequestCount((prev) => prev + 1);
        return config;
      },
      (error) => {
        setRequestCount((prev) => Math.max(0, prev - 1));
        return Promise.reject(error);
      }
    );
    const resInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        setRequestCount((prev) => Math.max(0, prev - 1));
        return response;
      },
      (error) => {
        setRequestCount((prev) => Math.max(0, prev - 1));
        return Promise.reject(error);
      }
    );
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
