import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "../../Components/Button/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useAlert } from "../../Contexts/AlertContext";
import { LineWave } from "react-loader-spinner";

function Login() {
  const { login, isAuthenticated, user, isLoading, roles } = useAuth();

  const { showAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleLogin() {
    if (email === "" || password === "") {
      showAlert("error", "Email or password cannot be empty");
      return;
    }

    if (!isValidEmail(email)) {
      showAlert("error", "Please enter a valid email");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated && user !== null) {
        if (roles.includes("admin")) {
          navigate("/admin", { replace: true });
        } else if (roles.includes("doctor")) {
          navigate("/doctor", { replace: true });
        } else if (roles.includes("clinic")) {
          navigate("/clinic", { replace: true });
        }
      }
    },
    [isAuthenticated, navigate, user, roles]
  );

  return (
    <div
      style={{ backgroundColor: "#edf8ff", height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <div className="h1 text-center pt-3 position-absolute top-0">
        MedInvent
      </div>
      <motion.div
        className="d-flex bg-white shadow p-1 justify-content-between rounded-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center p-5">
          <div className="d-inline-block  text-start">
            <div className="h5 m-0">
              <b>Welcome back to MedInvent</b>
            </div>
            <div className="text-secondary">Sign in here</div>
          </div>

          <div className="mt-5 d-flex flex-column">
            <FormControl>
              <InputLabel id="email" size="small">
                Email
              </InputLabel>
              <OutlinedInput
                size="small"
                id="email"
                label="Email"
                variant="outlined"
                sx={{ borderRadius: "30px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl className="mt-3">
              <InputLabel htmlFor="outlined-adornment-password" size="small">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                sx={{ borderRadius: "30px" }}
                size="small"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          {isLoading ? (
            <LineWave
              visible={true}
              color="#2c82bb"
              ariaLabel="line-wave-loading"
              wrapperStyle={{ justifyContent: "center" }}
              wrapperClass=""
              firstLineColor="#75bded"
              middleLineColor="#2c82bb"
              lastLineColor="#75bded"
            />
          ) : (
            <div className="mt-5">
              <Button onClick={handleLogin} text="Log in" width="100%" />
            </div>
          )}
        </div>
        <div
          className={`${styles.image} d-none d-lg-flex flex-column align-items-center`}
          style={{ width: "40%" }}
        >
          <div className="h4 text-light my-4 py-4">MedInvent</div>
          <img src="../../images/login.png" alt="img" height={270} />
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
