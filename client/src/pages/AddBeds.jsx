import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getLocation as fetchLocation } from "../../Utils/getLocation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  Paper,
} from "@mui/material";

export const AddBeds = () => {
  const [bed, setBed] = useState("");
  const [hospital, setHospital] = useState("");
  const [available, setAvailable] = useState("");
  const [next, setNext] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    fetchLocation(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error.message);
        enqueueSnackbar("Error fetching location: " + error.message, {
          variant: "error",
        });
      }
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleSaveBed = (e) => {
    e.preventDefault();
    if (!location) {
      enqueueSnackbar("Location not available", { variant: "error" });
      return;
    }

    const data = {
      no_of_beds: bed,
      hospital,
      available,
      next_available: next,
      price,
      contact,
      address,
      image:
        "https://tse2.mm.bing.net/th?id=OIP.0rrphCqhzTYTVxKUDHdTCgHaHa&pid=Api&P=0&h=220",
      location: { latitude: location.latitude, longitude: location.longitude },
    };

    axios
      .post("http://localhost:3000/beds", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        enqueueSnackbar("Bed added successfully", { variant: "success" });
        navigate("/adminpage", { state: { newBedData: data } });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 3, mt: 8 }}>
        <Box
          component="form"
          onSubmit={handleSaveBed}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "#fafafa", // Light background color for the form
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            color="textPrimary"
            sx={{ fontWeight: "bold" }} // Make the heading text bold
          >
            Add New Bed
          </Typography>
          <TextField
            label="Number of Beds"
            variant="outlined"
            fullWidth
            value={bed}
            onChange={(e) => setBed(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper", // Background color for input
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold", // Make the label text bold
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold", // Make the input text bold
              },
            }}
          />
          <TextField
            label="Hospital Name"
            variant="outlined"
            fullWidth
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Beds Available"
            variant="outlined"
            fullWidth
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Next Bed Available"
            variant="outlined"
            fullWidth
            value={next}
            onChange={(e) => setNext(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: "text.secondary",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: "text.primary",
                fontWeight: "bold",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Save Bed
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
