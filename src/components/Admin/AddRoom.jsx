"use client"
import React, { useState, useRef } from "react"
import styles from "./styles/AddRoom.module.css"
import axios from "axios"

export default function AddRoom(){
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    desc: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [currentAmenity, setCurrentAmenity] = useState(""); // New state for input
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
            if(!formData.name.trim() || !formData.desc.trim() || !formData.tagline.trim() || !file || price === undefined || amenities.length === 0){
                setError("All fields are Required")
                setLoading(false);
                return;
            }

            const cloudinaryData = new FormData();
            cloudinaryData.append("file", file);
            cloudinaryData.append("upload_preset", "uploads");

            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/divixqupd/image/upload",
                cloudinaryData
            )

            const roomData = {
              ...formData,
              amenities,
              price,
              image: uploadRes.data.secure_url,
            };

            const res = await fetch("/api/room", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(roomData),
            })

            if(!res.ok){
                const errorData = await res.json();
                setError("Failed to create room");
                throw new Error(errorData.message || "Error creating room")
            }

            setFormData({
              name: "",
              tagline: "",
              desc: "",
            });
            setAmenities([]);
            setCurrentAmenity("");
            setFile(null);
            setPrice("")
        } catch (error) {
            console.log("Error while creating room: ", error)
        } finally {
            setLoading(false);
            setTimeout(()=> {
                setSuccess("Room created successfully!");
            },3000)
        }

      }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create a room</h1>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <div className={styles.formInput}>
          <label htmlFor="name">Title of the Room</label>
          <input
            type="text"
            value={formData.name}
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="tagline">Add a catchy Subtitle</label>
          <input
            type="text"
            value={formData.tagline}
            name="tagline"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="desc">Add a Description</label>
          <input
            type="text"
            value={formData.desc}
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="image">Add an Image</label>
          <input
            type="file"
            name="image"
            ref={fileInput}
            onChange={handleFileChange} // Updated handler
            accept="image/*"
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="price">Add the Price for the Room</label>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="amenity">Amenities</label>
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
        <button className={styles.submit} disabled={loading}>
          {loading ? "Creating Room" : "Create Room"}
        </button>
      </form>
    </div>
  );
}