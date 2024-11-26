import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { Button, Container, Typography, Box, Snackbar, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiAlert from "@mui/material/Alert";

const Services = React.forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAnalyzeClick = () => {
    if (image) {
      setLoading(true); // Show loading indicator
      setSnackbarMessage("Analyzing image...");
      setOpenSnackbar(true);

      // Simulating an image analysis (you can replace this with actual logic)
      setTimeout(() => {
        setLoading(false); // Hide loading indicator
        setSnackbarMessage("Image analyzed successfully!");
        setOpenSnackbar(true);
      }, 2000); // Simulate a delay of 2 seconds for analysis
    } else {
      setSnackbarMessage("Please upload an image first.");
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
              accept="image/*"
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
                backgroundColor: loading ? "green.500" : "#16a34a", // Ensure green.600 is applied (hex equivalent of green.600)
                color: "white",
                py: 2,
                fontSize: "1rem",
                textTransform: "none",
                width: "100%",
                "&:hover": {
                  backgroundColor: loading ? "green.600" : "#15803d", // Darker green on hover
                },
              }}
              onClick={handleAnalyzeClick}
              disabled={user == null || loading} // Disable while loading or if not logged in
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Analyze Image"}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity={image && !loading ? "success" : "info"}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </section>
  );
});

export default Services;
