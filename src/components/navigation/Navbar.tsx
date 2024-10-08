import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <nav className="nav">
      <div className="nav__items">
        <NavLink className="nav__item" to="/">
          Home
        </NavLink>
        <NavLink className="nav__item" to="/fetch-todos">
          Fetch data
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink className="nav__item" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav__item" to="/todo">
              Crate toDo list
            </NavLink>
          </>
        )}
      </div>
      {isAuthenticated ? (
        <div className="nav__login-wrap">
          <span>Hello, {user?.name}!</span>
          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
