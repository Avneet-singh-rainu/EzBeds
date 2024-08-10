import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComp = () => {
  return (
    <div style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={styles.bedCard}>
          <div style={styles.imgContainer}>
            <Skeleton height={120} width={200} />
          </div>
          <div style={styles.details}>
            <Skeleton height={30} width={300} />
            <Skeleton height={20} width={250} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={300} />
            <Skeleton height={20} width={200} />
            <Skeleton height={20} width={250} />
            <div style={styles.buttonContainer}>
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={100} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "40px",
    backgroundColor: "#f4f6f8",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  bedCard: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    },
  },
  imgContainer: {
    width: "100%",
    maxHeight: "200px",
    overflow: "hidden",
  },
  img: {
    marginLeft: "30%",
    width: "40%",
    height: "150px",
    objectFit: "fill",
  },
  details: {
    padding: "20px",
    color: "#444",
  },
  hospitalName: {
    marginBottom: "12px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#333",
  },
  text: {
    margin: "8px 0",
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  button: {
    flex: "1",
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  bookButton: {
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  viewButton: {
    backgroundColor: "#2196f3",
    "&:hover": {
      backgroundColor: "#1e88e5",
    },
  },
  deleteButton: {
    backgroundColor: "#f44336",
    "&:hover": {
      backgroundColor: "#e53935",
    },
  },
  loading: {
    textAlign: "center",
    fontSize: "20px",
    color: "#555",
  },
  error: {
    textAlign: "center",
    fontSize: "20px",
    color: "#f44336",
    marginTop: "20px",
  },
  paginate: {
    display: "flex",
    gap: "4px",
    width: "100px",
    height: "50px",
    marginLeft: "350px",
  },
};

export default SkeletonComp;
