import React, { useState } from "react";
import { useNavigate } from "react-router";
import {Link} from "react-router-dom"
import axios from "axios";
import { useSnackbar } from "notistack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState("");

  const handleSuccess = (message) => {
    toast.success(message, { position: "bottom-left" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        name,
        password,
      });

      const { success, message, userdata: beddata, token } = data;

      if (success) {
        enqueueSnackbar(message, { variant: "success" });
        handleSuccess(message);
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/adminpage", { state: beddata });
      } else {
        enqueueSnackbar(message, { variant: "error" });
        setName("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Login</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            style={styles.input}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
          <div>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    marginTop: "20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Login;
