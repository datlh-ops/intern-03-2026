import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { login as loginUser, loginWithGoogle } from "../../service/authService";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema as schema } from '../../schemas/auth.schema';

import {
  Box, Typography, Button,
  Alert, Link, Divider, Stack, CssBaseline
} from "@mui/material";
import LabeledTextField from '../../components/Common/LabeledTextField';
import LoadingButton from '../../components/Common/LoadingButton';

const s = {
  // Layout chính
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },

  // Cột trái (nền xanh, có hình ảnh)
  leftPanel: {
    flex: 1,
    backgroundImage: `linear-gradient(to right, rgba(25, 118, 210, 0.85), rgba(25, 118, 210, 0.5)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: { xs: 'none', sm: 'flex' },
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    px: { sm: 4, md: 10 },
  },

  // Cột phải (nền tối)
  rightPanel: {
    flex: 1,
    bgcolor: '#1a1a2e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  // Khung chứa form
  formWrapper: {
    maxWidth: 400,
    width: '100%',
    px: 4,
  },

  // Input Email / Password
  textField: {
    mb: 3,
    '& .MuiFilledInput-root': {
      bgcolor: 'rgba(255,255,255,0.08)',
      color: '#fff',
      '&:before, &:after': { display: 'none' },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255,255,255,0.4)',
      opacity: 1,
    },
  },

  // Divider "Or continue with"
  divider: {
    mb: 4,
    '&::before, &::after': { borderColor: 'rgba(255,255,255,0.15)' },
  },

  // Nút Google
  socialButton: {
    textTransform: 'none',
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.2)',
  },

  // Footer bám đáy
  footer: {
    position: 'absolute',
    bottom: 32,
    display: 'flex',
    gap: 3,
    opacity: 0.5,
  },
};

export default function Login() {
  const [generalError, setGeneralError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: { username: "", password: "" },
  });
  const navigate = useNavigate();
  const { loginContext } = useAuth();

  const onSubmit = async (data) => {
    try {
      setGeneralError("");
      const resp = await loginUser(data.username, data.password);
      await loginContext(resp);
      navigate("/");
    } catch (error) {
      setGeneralError("Sai tài khoản hoặc mật khẩu");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      setGeneralError("");
      const credential = response.credential;
      const resp = await loginWithGoogle(credential); // Mặc định là user
      await loginContext(resp);
      navigate("/");
    } catch (error) {
      setGeneralError(error.response?.data?.error || "Đăng nhập bằng Google bị từ chối.");
    }
  };

  return (
    <Box sx={s.container}>
      <CssBaseline />

      {/* CỘT TRÁI */}
      <Box sx={s.leftPanel}>
        <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: '800', mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.3)', lineHeight: 1.2 }}>
          Hệ Thống Quản Lý<br />Phòng Trọ
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 450, lineHeight: 1.6, fontWeight: 400, textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
          Giải pháp hiện đại giúp chủ nhà vận hành trơn tru, và người thuê quản lý thông tin minh bạch, thuận tiện.
        </Typography>
      </Box>

      {/* CỘT PHẢI */}
      <Box sx={s.rightPanel}>
        <Box sx={s.formWrapper}>
          <Typography variant="h4" sx={{ fontWeight: '700', mb: 1, color: '#fff' }}>
            Xin Chào !!!
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'rgba(255,255,255,0.6)' }}>
            Truy cập vào cổng quản lý của bạn
          </Typography>

          {generalError && <Alert severity="error" sx={{ mb: 3 }}>{generalError}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <LabeledTextField
              label="Tên đăng nhập"
              darkMode
              id="username"
              placeholder="name@company.com"
              autoComplete="username"
              sx={s.textField}
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <LabeledTextField
              label="Mật khẩu"
              darkMode
              type="password"
              id="password"
              placeholder="••••••••"
              autoComplete="current-password"
              sx={{ ...s.textField, mb: 1 }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link href="#" variant="caption" sx={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
                Quên mật khẩu?
              </Link>
            </Box>
            <LoadingButton
              isSubmitting={isSubmitting}
              label="Đăng nhập"
              sx={{ mb: 4, bgcolor: '#1976d2' }}
            />
            <Divider sx={s.divider}>
              <Typography variant="caption" sx={{ textTransform: 'uppercase', px: 1, color: 'rgba(255,255,255,0.4)' }}>
                Hoặc tiếp tục với
              </Typography>
            </Divider>

            <Stack direction="row" spacing={2} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setGeneralError('Lỗi kết nối tới Server của Google.')}
                theme="filled_black"
                shape="rectangular"
                width="100%"
              />
            </Stack>

            <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Bạn chưa có tài khoản?{" "}
              <Link component={RouterLink} to="/register" sx={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
                Đăng Ký
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}