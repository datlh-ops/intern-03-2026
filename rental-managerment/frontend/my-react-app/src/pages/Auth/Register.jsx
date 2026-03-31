import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { register as registerUser } from "../../service/authService";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema as schema } from '../../schemas/auth.schema';

import {
  Container, Box, Typography,
  Alert, Paper, Link, CssBaseline,
  ToggleButtonGroup, ToggleButton, Divider
} from "@mui/material";

// Components dùng chung
import LabeledTextField from '../../components/Common/LabeledTextField';
import LoadingButton from '../../components/Common/LoadingButton';
import Toast from '../../components/Common/Toast';

const s = {
  // Trang nền ngoài
  page: {
    bgcolor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    py: 4, // Giảm padding trang
  },

  // Tiêu đề trên cùng
  pageTitle: {
    fontWeight: '800',
    letterSpacing: 1,
    fontSize: '1.75rem', // Giảm cỡ tiêu đề
  },

  // Card chứa form
  card: {
    p: { xs: 3, md: 4 }, // Thu nhỏ padding card
    borderRadius: 4,
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  },

  // Toggle chọn vai trò (Tenant / Landlord)
  toggleGroup: {
    bgcolor: '#f1f5f9',
    p: 0.5,
    borderRadius: 2,
    mb: 2, // Giảm margin
    '& .MuiToggleButton-root': {
      border: 'none',
      borderRadius: 1.5,
      py: 0.75, // Thu nhỏ nút toggle
      textTransform: 'none',
      fontWeight: '600',
    },
  },

  // Mỗi toggle button khi được chọn
  toggleButtonSelected: {
    '&.Mui-selected': {
      bgcolor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      color: '#1976d2',
    },
  },

  // Label caption trên mỗi field (được render qua LabeledTextField)
  textField: {
    mb: 2, // Giảm khoảng cách giữa các field
    '& .MuiFilledInput-root': {
      bgcolor: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 2,
      '&:before, &:after': { display: 'none' },
    },
  },

  // Nút Sign Up
  submitButton: {
    py: 1.25, // Thu nhỏ padding nút
    bgcolor: '#1976d2',
    textTransform: 'none',
    fontWeight: '700',
    fontSize: '0.95rem',
    borderRadius: 2,
    mb: 2, // Giảm margin dưới
  },

  // Dòng footer dưới card
  pageFooter: {
    mt: 3, // Giảm mt cho footer
    display: 'flex',
    justifyContent: 'space-between',
    opacity: 0.4,
  },

  footerText: {
    fontWeight: '700',
    fontSize: '0.65rem',
  },
};


export default function Register() {
  const [generalError, setGeneralError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: { username: "", password: "", role: "user" },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setGeneralError("");
      await registerUser(data.username, data.password, data.role);
      setSuccessOpen(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setGeneralError("Đăng ký thất bại! Tên đăng nhập có thể đã tồn tại.");
    }
  };

  return (
    <Box sx={s.page}>
      <CssBaseline />

      <Toast
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message=" Đăng ký thành công! Đang chuyển hướng..."
      />
      <Container maxWidth="sm">
        {/* Tiêu đề */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" sx={s.pageTitle}>ĐĂNG KÝ TÀI KHOẢN</Typography>
        </Box>

        {/* Card form */}
        <Paper elevation={0} sx={s.card}>
          <Typography variant="h5" sx={{ fontWeight: '700', mb: 0.5 }}>Tạo tài khoản</Typography>
          {generalError && <Alert severity="error" sx={{ mb: 2 }}>{generalError}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Toggle Tenant / Landlord */}
            <Box sx={{ mb: 2 }}>
              <Controller
                name="role" control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    {...field} exclusive fullWidth
                    onChange={(e, val) => val && field.onChange(val)}
                    sx={s.toggleGroup}
                  >
                    <ToggleButton value="user" sx={s.toggleButtonSelected}>Người thuê</ToggleButton>
                    <ToggleButton value="master" sx={s.toggleButtonSelected}>Chủ nhà</ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Box>

            <LabeledTextField
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              sx={s.textField}
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <LabeledTextField
              label="Mật Khẩu"
              type="password"
              placeholder="••••••••••••"
              sx={s.textField}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <LoadingButton
              isSubmitting={isSubmitting}
              label="Đăng Ký"
              sx={s.submitButton}
            />

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" align="center" color="text.secondary">
              Đã có tài khoản?{" "}
              <Link component={RouterLink} to="/login" sx={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
                Đăng Nhập
              </Link>
            </Typography>
          </Box>
        </Paper>

      </Container>
    </Box>
  );
}
