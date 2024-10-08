import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../components/navigation/Login";

jest.mock("@auth0/auth0-react");

describe("Login Component", () => {
  const loginWithRedirect = jest.fn();

  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect,
    });
  });

  it("renders the login component", () => {
    render(<Login />);

    expect(screen.getByText(/Welcome to the App!/i)).toBeInTheDocument();
    expect(screen.getByText(/Please log in to continue./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("calls loginWithRedirect when the button is clicked", () => {
    render(<Login />);

    const loginButton = screen.getByRole("button", { name: /Log In/i });
    fireEvent.click(loginButton);

    expect(loginWithRedirect).toHaveBeenCalled();
  });
});
