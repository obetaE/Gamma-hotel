"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles/ManageRoom.module.css";
import Image from "next/image";
import {
  FaStar,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSpinner
} from "react-icons/fa";

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setFetchLoading(true);
        const res = await fetch("/api/room");
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchRooms();
  }, []);

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    setFormData({ 
      ...room,
      // Create a copy of amenities to avoid direct mutation
      amenities: [...room.amenities] 
    });
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (e) => {
    setFormData({
      ...formData,
      price: Number(e.target.value),
    });
  };

  const handleTotalNoChange = (e) => {
    setFormData({
      ...formData,
      totalNo: Number(e.target.value),
    });
  };

  const handleStatusChange = () => {
    setFormData({
      ...formData,
      status: !formData.status,
    });
  };

  const addAmenity = () => {
    if (
      currentAmenity.trim() &&
      !formData.amenities.includes(currentAmenity.trim())
    ) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, currentAmenity.trim()],
      });
      setCurrentAmenity("");
    }
  };

  const removeAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      amenities: updatedAmenities,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addAmenity();
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/room", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData._id,
          name: formData.name,
          tagline: formData.tagline,
          description: formData.description,
          highlight: formData.highlight,
          amenities: formData.amenities,
          price: formData.price,
          status: formData.status,
          totalNo: formData.totalNo
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update room");
      }

      const data = await res.json();
      
      // Update the rooms list with the updated room
      const updatedRooms = rooms.map(room => 
        room._id === formData._id ? data.room : room
      );
      
      setRooms(updatedRooms);
      setIsEditing(false);
      setSelectedRoom(data.room);
    } catch (error) {
      setError(error.message);
      console.error("Error updating room:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    
    try {
      const res = await fetch("/api/room", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete room");
      }

      // Update the rooms list
      const updatedRooms = rooms.filter(room => room._id !== id);
      setRooms(updatedRooms);
      
      if (selectedRoom && selectedRoom._id === id) {
        closeModal();
      }
    } catch (error) {
      setError(error.message);
      console.error("Error deleting room:", error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        color={i < Math.floor(rating) ? "gold" : "#ccc"}
        size={20}
      />
    ));
  };

  if (fetchLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Rooms</h1>
      </div>

      {rooms.length === 0 ? (
        <div className={styles.noRooms}>
          <p>No rooms found. Create your first room!</p>
        </div>
      ) : (
        <div className={styles.roomsGrid}>
          {rooms.map((room) => (
            <div key={room._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.roomName}>{room.name}</span>
                <span
                  className={
                    room.status
                      ? styles.statusAvailable
                      : styles.statusUnavailable
                  }
                >
                  {room.status ? "Available" : "Unavailable"}
                  {room.status ? <FaCheck /> : <FaTimes />}
                </span>
              </div>

              <div className={styles.imgContainer}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className={styles.image}
                  />
                </div>
                <div className={styles.priceTag}>
                  ${room.price}
                  <span>/night</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.tagline}>{room.tagline}</p>

                <div className={styles.rating}>
                  <div className={styles.stars}>{renderStars(room.rating)}</div>
                  <span>{room.rating.toFixed(1)}</span>
                </div>

                <div className={styles.amenitiesPreview}>
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className={styles.amenity}>
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className={styles.moreAmenities}>
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button
                  className={styles.viewButton}
                  onClick={() => openRoomDetail(room)}
                >
                  View Details
                </button>
                <div className={styles.actionButtons}>
                  <button
                    onClick={() => openRoomDetail(room)}
                    className={styles.editButton}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteRoom(room._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedRoom && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>

            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{isEditing ? "Edit Room" : selectedRoom.name}</h2>
                {!isEditing && (
                  <button
                    className={styles.editToggle}
                    onClick={handleEditToggle}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalImage}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      fill
                    />
                  </div>
                </div>

                <div className={styles.roomDetails}>
                  {isEditing ? (
                    <form className={styles.editForm}>
                      {error && <div className={styles.formError}>{error}</div>}
                      
                      <div className={styles.formGroup}>
                        <label>Room Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Tagline</label>
                        <input
                          type="text"
                          name="tagline"
                          value={formData.tagline || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                          name="description"
                          value={formData.description || ""}
                          onChange={handleInputChange}
                          rows="3"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Highlight Category</label>
                        <select
                          name="highlight"
                          value={formData.highlight || "Most Popular"}
                          onChange={handleInputChange}
                        >
                          <option value="Most Popular">Most Popular</option>
                          <option value="Luxury Choice">Luxury Choice</option>
                          <option value="Budget Favorite">Budget Favorite</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Price per Night ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price || ""}
                          onChange={handlePriceChange}
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Number Available</label>
                        <input
                          type="number"
                          name="totalNo"
                          value={formData.totalNo || 1}
                          onChange={handleTotalNoChange}
                          min="1"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Amenities</label>
                        <div className={styles.amenityInput}>
                          <input
                            type="text"
                            value={currentAmenity}
                            onChange={(e) => setCurrentAmenity(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Add amenity and press Enter"
                          />
                          <button type="button" onClick={addAmenity}>
                            Add
                          </button>
                        </div>

                        <div className={styles.amenitiesList}>
                          {formData.amenities?.map((item, index) => (
                            <span key={index} className={styles.amenityTag}>
                              {item}
                              <button
                                type="button"
                                onClick={() => removeAmenity(index)}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Status</label>
                        <div className={styles.statusToggle}>
                          <span>Unavailable</span>
                          <label className={styles.switch}>
                            <input
                              type="checkbox"
                              checked={formData.status}
                              onChange={handleStatusChange}
                            />
                            <span className={styles.slider}></span>
                          </label>
                          <span>Available</span>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className={styles.tagline}>{selectedRoom.tagline}</p>
                      <p className={styles.description}>
                        {selectedRoom.description}
                      </p>

                      <div className={styles.detailRow}>
                        <strong>Price:</strong> ${selectedRoom.price} per night
                      </div>

                      <div className={styles.detailRow}>
                        <strong>Available:</strong> {selectedRoom.totalNo}
                      </div>

                      <div className={styles.detailRow}>
                        <strong>Status:</strong>
                        <span
                          className={
                            selectedRoom.status
                              ? styles.statusAvailable
                              : styles.statusUnavailable
                          }
                        >
                          {selectedRoom.status ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className={styles.detailRow}>
                        <strong>Rating:</strong>
                        <div className={styles.stars}>
                          {renderStars(selectedRoom.rating)}
                          <span>({selectedRoom.rating.toFixed(1)})</span>
                        </div>
                      </div>

                      <div className={styles.amenitiesSection}>
                        <strong>Amenities:</strong>
                        <div className={styles.amenitiesList}>
                          {selectedRoom.amenities.map((amenity, index) => (
                            <span key={index} className={styles.amenityTag}>
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                {isEditing ? (
                  <>
                    <button
                      className={styles.cancelButton}
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.saveButton}
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className={styles.spinner} /> Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteRoom(selectedRoom._id)}
                  >
                    <FaTrash /> Delete Room
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}