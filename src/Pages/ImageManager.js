import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
} from "@mui/material";
import {
  Delete,
  Edit,
  AddPhotoAlternate,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import {
  getCarouselImages,
  addCarouselImage,
  updateCarouselImage,
  deleteCarouselImage,
} from "../Services/allApi";
import { toast, ToastContainer } from "react-toastify";

const ImageManagement = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // Spinner for API calls
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getCarouselImages();
      if (response) {
        setImages(response.data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // Handle adding or updating images
  const handleAddOrUpdateImage = async () => {
    if (!selectedFile || !title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("carousel_image", selectedFile);

    setLoading(true); // Start loading
    try {
      if (editingId) {
        await updateCarouselImage(editingId, formData);
        toast.success("Image updated successfully!");
      } else {
        await addCarouselImage(formData);
        toast.success("Image added successfully!");
      }

      setTitle("");
      setSelectedFile(null);
      setImagePreview(null);
      setEditingId(null);
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Error adding/updating image:", error);
      toast.error("Failed to add/update image!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle delete
  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDeleteImage = async () => {
    setLoading(true);
    try {
      await deleteCarouselImage(deleteId);
      toast.success("Image deleted successfully!");
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image!");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  // Handle edit
  const editSectionRef = useRef(null);

const handleEditImage = (image) => {
  setTitle(image.title);
  setEditingId(image.id);

  if (editSectionRef.current) {
    editSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

  // Carousel navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card sx={{ marginTop: 4, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Manage Carousel Images</Typography>

        {/* Image Upload and Title Input */}
        <Grid ref={editSectionRef} container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Image Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="file-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                color="primary"
                startIcon={<AddPhotoAlternate />}
              >
                {editingId ? "Replace Image" : "Upload Image"}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleAddOrUpdateImage}
              disabled={!selectedFile || !title.trim()}
            >
              {editingId ? "Edit" : "Add"}
            </Button>
          </Grid>
        </Grid>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginTop: "10px",
            }}
          />
        )}
       <Backdrop
  open={loading}
  sx={{
    color: "#fff",
    zIndex: (theme) => theme.zIndex.modal + 1,
    backdropFilter: "blur(5px)", // Smooth blur effect
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Slightly darker background
  }}
>
  <CircularProgress size={60} color="inherit" />
</Backdrop>

        {/* Image List */}
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {images.map((image) => (
            <Grid item xs={12} sm={4} key={image.id}>
              <Card>
                <img
                  src={image.carousel_image}
                  alt={image.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1">{image.title}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditImage(image)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteConfirm(image.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Carousel Section */}
        {images.length > 0 && (
          <div
            style={{
              position: "relative",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">{images[currentIndex].title}</Typography>
            <img
              src={images[currentIndex].carousel_image}
              alt={images[currentIndex].title}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        )}
      </CardContent>
      {showConfirm && (
        <Dialog
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this image?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteImage}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer></ToastContainer>
    </Card>
  );
};

export default ImageManagement;
