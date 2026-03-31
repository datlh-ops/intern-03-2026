import { Box, Typography, TextField } from "@mui/material";

export default function LabeledTextField({ label, labelRight, darkMode = false, sx = {}, ...props }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            color: darkMode ? "rgba(255,255,255,0.8)" : "text.secondary",
            fontSize: "0.65rem",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Typography>
        {labelRight && labelRight}
      </Box>
      <TextField fullWidth variant="filled" hiddenLabel sx={sx} {...props} />
    </Box>
  );
}
