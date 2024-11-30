import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { Button, Container, Typography, Box, Snackbar, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiAlert from "@mui/material/Alert";
import { analyzeImage } from "../api/predict";

const Services = React.forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image/jpeg")) {
      setImage(file);
    } else {
      setSnackbarMessage("Only JPG/JPEG images are allowed.");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAnalyzeClick = async () => {
    if (image && user) {
      setLoading(true);
      setSnackbarMessage("Analyzing image...");
      setOpenSnackbar(true);

      const result = await analyzeImage(image, user);

      setLoading(false);

      if (result.success) {
        setSnackbarMessage("Image analyzed successfully!");
        setOpenSnackbar(true);

        // Navigate to the results page with result data
        navigate("/results", { state: { resultUrls: result.data } });
      } else {
        setSnackbarMessage(result.message);
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Please upload an image and login first.");
      setOpenSnackbar(true);
    }
  };

  return (
    <section ref={ref} id="services" className="py-20 bg-gray-50">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Upload Medical Image
        </Typography>
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 1,
              p: 6,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/jpeg"
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload" className="cursor-pointer block">
              <CloudUploadIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="body2" color="textSecondary" mt={2}>
                Drag and drop your medical image here
              </Typography>
              <Typography variant="caption" color="textSecondary">
                or click to browse
              </Typography>
            </label>
          </Box>

          {image && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              Uploaded: {image.name}
            </Typography>
          )}

          {!user && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              Please login to analyze the image.
            </Typography>
          )}

          <Box mt={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: loading ? "green.500" : "#16a34a",
                color: "white",
                py: 2,
                fontSize: "1rem",
                textTransform: "none",
                width: "100%",
                "&:hover": {
                  backgroundColor: loading ? "green.600" : "#15803d",
                },
              }}
              onClick={handleAnalyzeClick}
              disabled={user == null || loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Analyze Image"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity={loading ? "info" : "error"}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </section>
  );
});

export default Services;
