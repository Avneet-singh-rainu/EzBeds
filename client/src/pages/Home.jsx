import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "../components/Spinner";

export const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => {
    if (e.target.value === "admin") {
      navigate("/login");
    } else {
      navigate("/details");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return loading ? (
    <div style={styles.spinnerContainer}>
      <Spinner />
    </div>
  ) : (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Our Service</h1>
      <p style={styles.description}>Please select your role to proceed:</p>
      <div style={styles.buttonContainer}>
        <button
          value="user"
          onClick={handleClick}
          style={{ ...styles.button, ...styles.userButton }}
        >
          User
        </button>
        <button
          value="admin"
          onClick={handleClick}
          style={{ ...styles.button, ...styles.adminButton }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundImage:
      "url(https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg?auto=compress&cs=tinysrgb&w=1600)", // High-quality background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "20px",
    textAlign: "center",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    zIndex: 2,
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    zIndex: 2,
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    zIndex: 2,
  },
  button: {
    width: "160px",
    padding: "15px 20px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  userButton: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      backgroundColor: "#43a047",
      transform: "translateY(-3px)",
    },
  },
  adminButton: {
    backgroundColor: "#f44336",
    "&:hover": {
      backgroundColor: "#e53935",
      transform: "translateY(-3px)",
    },
  },
  spinnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay for better contrast
    zIndex: 1,
  },
};
