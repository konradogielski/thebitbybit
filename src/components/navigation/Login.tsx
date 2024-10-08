import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect(); // Redirects to Auth0 login page
  };

  return (
    <div className="login">
      <h1>Welcome to the App!</h1>
      <p>Please log in to continue.</p>
      <Button variant="contained" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};

export default Login;
