import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const users = [
  {
    name: "admin",
    email: "admin",
    password: "admin",
    role: "admin",
  },
  {
    name: "doctor",
    email: "doctor",
    password: "doctor",
    role: "doctor",
  },
  {
    name: "clinic",
    email: "clinic",
    password: "clinic",
    role: "clinic",
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

  function login(email, password) {
    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );
    if (userFound) {
      dispatch({ type: "login", payload: userFound });
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
