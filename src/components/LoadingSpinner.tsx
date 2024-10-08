import { CircularProgress, Box } from "@mui/material";

export const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      mt: 20,
    }}
  >
    <CircularProgress />
  </Box>
);
