import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const AdminPage = () => {
  const location = useLocation();
  const newBedData = location.state?.newBedData || {};
  const [beds, setBeds] = useState([newBedData]);

  const navigate = useNavigate();

  const handleBookClick = () => {
    // Implement booking logic here
  };

  const handleViewClick = (id) => {
    navigate("/update", { state: { id } });
  };

  const handleDelete = (id) => {
    console.log(id);
    navigate("/delete", { state: { id } });
  };

  return (
    <div style={styles.container}>
      {beds.map((bed) => (
        <div key={bed._id} style={styles.card}>
          <div style={styles.imgContainer}>
            {/* <img src={bed.image?bed.image:""} alt="hospital" style={styles.img} /> */}
          </div>
          <div style={styles.infoContainer}>
            <div style={styles.header}>
              <h2 style={styles.hospitalName}>Hospital: {bed.hospital}</h2>
              <button
                onClick={() => handleDelete(bed._id)}
                style={styles.deleteButton}
              >
                <CloseIcon />
              </button>
            </div>
            <p style={styles.info}>Beds Available: {bed.no_of_beds}</p>
            <p style={styles.info}>Price: ${bed.price}</p>
            <p style={styles.info}>Address: {bed.address}</p>
            <p style={styles.info}>Contact: {bed.contact}</p>
            <p style={styles.info}>Next Available: {bed.next_available}</p>
            <div style={styles.buttonContainer}>
              <button
                onClick={handleBookClick}
                style={{ ...styles.button, backgroundColor: "#4CAF50" }}
              >
                Book Now
              </button>
              <button
                onClick={() => handleViewClick(bed._id)}
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    display: "flex",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    padding: "15px",
    gap: "15px",
  },
  imgContainer: {
    flexShrink: 0,
  },
  img: {
    width: "150px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  infoContainer: {
    flex: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  hospitalName: {
    margin: 0,
    fontSize: "18px",
    color: "#333",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#f44336",
    fontSize: "20px",
  },
  info: {
    margin: "5px 0",
    color: "#555",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default AdminPage;
