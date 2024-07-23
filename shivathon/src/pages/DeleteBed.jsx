import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

export const DeleteBed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  
  console.log(id)

  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    if (e.target.name === "nobutton") {
      return navigate("/details");
    }

    axios
      .delete(`http://localhost:3000/beds/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("deleed")
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
        navigate("/details");
      })
      .catch((error) => {
        console.error(error.response.data.message);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.question}>Do you want to delete this bed?</h2>
        <div style={styles.buttonContainer}>
          <button
            name="yesbutton"
            onClick={handleClick}
            style={{ ...styles.button, backgroundColor: "#DC143C" }}
          >
            Yes
          </button>
          <button
            name="nobutton"
            onClick={handleClick}
            style={{ ...styles.button, backgroundColor: "#9FE2BF" }}
          >
            No
          </button>
        </div>
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
    backgroundColor: "#f0f0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    border: "2px solid #ddd",
  },
  question: {
    marginBottom: "20px",
    fontSize: "18px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
