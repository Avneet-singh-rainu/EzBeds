import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSuccess = (message) => {
    toast.success(message, { position: "bottom-left" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/signup", {
        name: name,
        password: password,
      });

      const { success, message } = data;

      if (success) {
        enqueueSnackbar(message, { variant: "success" });
        handleSuccess(message);
        navigate("/login");
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
    <div style={styles.signupContainer}>
      <form style={styles.signupForm} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Signup</h2>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          style={styles.inputField}
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          style={styles.inputField}
          required
        />
        <button type="submit" style={styles.submitButton}>
          Signup
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

const styles = {
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  },
  signupForm: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    transition: "border-color 0.3s",
  },
  inputFieldFocus: {
    borderColor: "#6495ed",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    background: "#6495ed",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    background: "#4169e1",
  },
};

export default Signup;
