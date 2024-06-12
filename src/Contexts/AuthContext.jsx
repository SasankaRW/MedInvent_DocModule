import { createContext, useContext, useReducer } from "react";
import { useAlert } from "./AlertContext";

const AuthContext = createContext();

const users = [
  {
    id: "",
    name: "admin",
    email: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: "c98c4ae2-4319-4f41-8411-111877e8254f",
    name: "John Doe",
    email: "doctor",
    password: "doctor",
    role: "doctor",
  },
  {
    id: "492419fb-c662-447c-bb95-b007229539a3",
    name: "Health care clinic",
    email: "clinic",
    password: "clinic",
    role: "clinic",
    clinicFee: 850.0,
  },
];

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("fails");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { showAlert } = useAlert();

  function login(email, password) {
    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userFound) {
      dispatch({ type: "login", payload: userFound });
    } else {
      showAlert("error", "Invalid credentials entered");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
