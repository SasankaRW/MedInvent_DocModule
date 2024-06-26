import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useAlert } from "./AlertContext";
import config from "../config";

const AuthContext = createContext();

const initialState = {
  user: null,
  accessToken: null,
  roles: null,
  isAuthenticated: false,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login_request":
      return { ...state, isLoading: true };

    case "login_success":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        roles: action.payload.roles,
        isAuthenticated: true,
        isLoading: false,
      };

    case "login_failure":
      return { ...state, isLoading: false };

    case "logout":
      return {
        ...state,
        user: null,
        accessToken: null,
        roles: [],
        isAuthenticated: false,
        isLoading: false,
      };

    case "set_clinicFees":
      return { ...state, user: { ...state.user, clinicFees: action.payload } };

    default:
      throw new Error("Unsupported action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, accessToken, roles, isAuthenticated, isLoading }, dispatch] =
    useReducer(reducer, initialState);

  const { showAlert } = useAlert();

  const login = async (email, password) => {
    dispatch({ type: "login_request" });
    try {
      const response = await axios.post(`${config.baseURL}/user/login`, {
        email,
        password,
      });
      const { accessToken, user, roles } = response.data.data;
      dispatch({
        type: "login_success",
        payload: { user, accessToken, roles },
      });
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      showAlert("error", "Invalid credentials entered");
      dispatch({ type: "login_failure" });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  const setClinicFees = (fee) => {
    dispatch({ type: "set_clinicFees", payload: fee });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        roles,
        isAuthenticated,
        isLoading,
        login,
        logout,
        setClinicFees,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
