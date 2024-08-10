import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

export const Modal = () => {
  const [bed, setBed] = useState("");
  const [hospital, setHospital] = useState("");
  const [available, setAvailable] = useState("");
  const [next, setNext] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${id}`)
      .then((response) => {
        setBed(response.data.no_of_beds);
        setHospital(response.data.hospital);
        setAvailable(response.data.available);
        setNext(response.data.next_available);
        setPrice(response.data.price);
        setContact(response.data.contact);
        setAddress(response.data.address);
      })
      .catch((error) => {
        enqueueSnackbar("An error occurred. Check console for details.", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      no_of_beds: bed,
      hospital,
      available,
      next_available: next,
      price,
      contact,
      address,
    };
    axios
      .put(`http://localhost:3000/beds/${id}`, data)
      .then(() => {
        enqueueSnackbar("Bed updated successfully", { variant: "success" });
        navigate("/details");
      })
      .catch((err) => {
        enqueueSnackbar("Failed to update bed. Please try again.", {
          variant: "error",
        });
        console.log(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Update Bed Information
        </Typography>
        <form onSubmit={handleUpdate}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="No Of Beds"
              variant="outlined"
              fullWidth
              value={bed}
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
                
                },
              }}
              onChange={(e) => setBed(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Hospital Name"
              variant="outlined"
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
                },
              }}
              fullWidth
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Available"
              variant="outlined"
              fullWidth
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
                },
              }}
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Next Bed Available"
              variant="outlined"
              fullWidth
              value={next}
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
                },
              }}
              onChange={(e) => setNext(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
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
                },
              }}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2, bgcolor: "#fafafa" }}>
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              value={contact}
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
                },
              }}
              onChange={(e) => setContact(e.target.value)}
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2, bgcolor: "#fafafa" }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
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
                },
              }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
