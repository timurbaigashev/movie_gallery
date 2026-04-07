// src/App.test.js
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

// Мок Firebase (чтобы не падало onAuthStateChanged)
jest.mock("./firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((authInstance, callback) => {
      callback(null);           // симулируем: пользователь не залогинен
      return jest.fn();         // unsubscribe
    }),
  },
  googleProvider: {},
}));

// Мок useAuth для стабильности
jest.mock("./context/AuthContext", () => {
  const original = jest.requireActual("./context/AuthContext");
  return {
    ...original,
    useAuth: jest.fn(),
    AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>,
  };
});

const mockUseAuth = require("./context/AuthContext").useAuth;

test("renders search input", () => {
  mockUseAuth.mockReturnValue({
    user: null,
    loading: false,
    loginWithGoogle: jest.fn(),
    logout: jest.fn(),
  });

  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  expect(screen.getByPlaceholderText(/search movie/i)).toBeInTheDocument();
});