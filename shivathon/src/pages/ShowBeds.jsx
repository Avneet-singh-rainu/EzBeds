import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as geolib from "geolib";
import { display, height } from "@mui/system";
import AssistantDirectionSharpIcon from "@mui/icons-material/AssistantDirectionSharp";
import Map from "../components/map";

export const ShowBeds = () => {
  const itemsPerPage = 5;
  const [currPage, setCurrPage] = useState(1);
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);

  const [currLocation, setCurrLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const isAdmin = localStorage.getItem("token") || null;

  const getCurrLocation = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        setCurrLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // latitude: 30.10778,
          // longitude: 78.29255,
        });
      },
      (err) => console.error("Error getting current location:", err),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        setBeds(res.data);
        setLoading(false);
        getCurrLocation();
      })
      .catch((err) => {
        console.error(err.message);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, [currLocation]);

  const handleBookClick = () => {
    // Implement booking logic here
  };

  const handleViewClick = (id) => {
    navigate("/update", { state: { id } });
  };

  const handleDelete = (id) => {
    navigate("/delete", { state: { id: id } });
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
    setActiveButton(page - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMapClick = (dest) => {
    navigate("/map", { state: { location: currLocation, dest: dest } });
  };

  if (loading) {
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
  }

  if (error) return <div style={styles.error}>{error}</div>;

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currItems = beds.slice(startIndex, endIndex);
  const totalPages = Math.ceil(beds.length / itemsPerPage);

  return (
    <div style={styles.container}>
      {currItems.map((bed) => {
        const bedLat = parseFloat(bed.location?.latitude) || 0;
        const bedLon = parseFloat(bed.location?.longitude) || 0;
        const currLat = parseFloat(currLocation.latitude) || 0;
        const currLon = parseFloat(currLocation.longitude) || 0;
        const distanceInMeters = bed.location
          ? geolib.getPreciseDistance(
              { latitude: currLat, longitude: currLon },
              { latitude: bedLat, longitude: bedLon }
            )
          : null;
        const distanceInKilometers = distanceInMeters
          ? (distanceInMeters / 1000).toFixed(2)
          : "N/A";

        return (
          <div key={bed._id} style={styles.bedCard}>
            <div style={styles.imgContainer}>
              <img
                src={
                  "https://cdn-share-sprites.flaticon.com/pack/4/4696/4696753-learning_3x2.jpg"
                }
                alt="hospital"
                style={styles.img}
              />
            </div>
            <div style={styles.details}>
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h1 style={styles.hospitalName}>{bed.hospital}</h1>
                <h5>
                  {bed.location
                    ? `${distanceInKilometers} kms away`
                    : "Location unavailable"}

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleMapClick(bed.location);
                    }}
                  >
                    <AssistantDirectionSharpIcon />
                  </div>
                </h5>
              </span>
              <p style={styles.text}>Beds Available: {bed.no_of_beds}</p>
              <p style={styles.text}>Price: ${bed.price}</p>
              <p style={styles.text}>Address: {bed.address}</p>
              <p style={styles.text}>Contact: {bed.contact}</p>
              <p style={styles.text}>
                Next Available Room: {bed.next_available}
              </p>
              {!isAdmin && (
                <button
                  onClick={handleBookClick}
                  style={{ ...styles.button, ...styles.bookButton }}
                >
                  Book Now
                </button>
              )}
              {isAdmin && (
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => handleViewClick(bed._id)}
                    style={{ ...styles.button, ...styles.viewButton }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(bed._id)}
                    style={{ ...styles.button, ...styles.deleteButton }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div style={styles.paginate}>
        {Array.from({ length: totalPages }).map((k, index) => {
          return (
            <button
              style={{
                ...styles.button,
                backgroundColor:
                  activeButton === index
                    ? "rgb(102, 153, 153)"
                    : "rgb(0, 128, 128)",
              }}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
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
