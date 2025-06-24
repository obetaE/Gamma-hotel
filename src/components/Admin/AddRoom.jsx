"use client";
import React, { useState, useRef } from "react";
import styles from "./styles/AddRoom.module.css";
import axios from "axios";

export default function AddRoom() {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    highlight: "Newest Collection",
    totalNo: 1,
  });
  const [amenities, setAmenities] = useState([]);
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  // Add new amenity to array
  const addAmenity = () => {
    if (currentAmenity.trim() && !amenities.includes(currentAmenity.trim())) {
      setAmenities([...amenities, currentAmenity.trim()]);
      setCurrentAmenity("");
    }
  };

  // Remove amenity from array
  const removeAmenity = (index) => {
    const updated = amenities.filter((_, i) => i !== index);
    setAmenities(updated);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAmenity();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (
        !formData.name.trim() ||
        !formData.description.trim() ||
        !formData.tagline.trim() ||
        !formData.highlight.trim() ||
        !file ||
        price === "" ||
        amenities.length === 0
      ) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "uploads");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/divixqupd/image/upload",
        cloudinaryData
      );

      // Prepare room data
      const roomData = {
        ...formData,
        amenities,
        price: Number(price),
        image: uploadRes.data.secure_url,
        status: true,
        rating: 0,
        totalNo: Number(formData.totalNo),
      };

      // Send data to API
      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create room");
        throw new Error(errorData.message || "Error creating room");
      }

      // Reset form
      setFormData({
        name: "",
        tagline: "",
        description: "",
        highlight: "Newest Collection",
        totalNo: 1,
      });
      setAmenities([]);
      setCurrentAmenity("");
      setFile(null);
      setPrice("");
      fileInput.current.value = ""; // Clear file input

      setSuccess("Room created successfully!");
    } catch (error) {
      console.error("Error while creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create New Room</h1>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Room Title</label>
            <input
              type="text"
              value={formData.name}
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Deluxe Suite"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tagline">Catchy Subtitle</label>
            <input
              type="text"
              value={formData.tagline}
              name="tagline"
              onChange={handleChange}
              placeholder="Experience luxury like never before"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              value={formData.description}
              name="description"
              onChange={handleChange}
              placeholder="Detailed description of the room..."
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="highlight">Highlight Category</label>
            <select
              value={formData.highlight}
              name="highlight"
              onChange={handleChange}
            >
              <option value="Newest Collection">Newest Collection</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Luxury Choice">Luxury Choice</option>
              <option value="Budget Favorite">Budget Favorite</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price per Night ($)</label>
            <input
              type="number"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="199.99"
              step="0.01"
              min="0"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="totalNo">Number of Rooms Available</label>
            <input
              type="number"
              name="totalNo"
              value={formData.totalNo}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Room Image</label>
            <div className={styles.fileInput}>
              <input
                type="file"
                name="image"
                ref={fileInput}
                onChange={handleFileChange}
                accept="image/*"
              />
              {file && (
                <div className={styles.filePreview}>
                  <span>{file.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.amenityGroup}`}>
            <label>Amenities</label>
            <div className={styles.amenityInputContainer}>
              <input
                type="text"
                value={currentAmenity}
                onChange={(e) => setCurrentAmenity(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add amenity and press Enter/Add"
              />
              <button
                type="button"
                onClick={addAmenity}
                className={styles.addButton}
              >
                Add
              </button>
            </div>

            {/* Display Added Amenities */}
            <div className={styles.amenitiesList}>
              {amenities.map((item, index) => (
                <span key={index} className={styles.amenityTag}>
                  {item}
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button className={styles.submit} disabled={loading}>
          {loading ? "Creating Room..." : "Create Room"}
        </button>
      </form>
    </div>
  );
}
