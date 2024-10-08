import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography, Avatar } from "@mui/material";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      {isAuthenticated ? (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.name}!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src={user?.picture}
              alt={user?.name}
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Typography variant="body1">Email: {user?.email}</Typography>
        </>
      ) : (
        <Typography variant="h4">
          Please log in to see your dashboard.
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
