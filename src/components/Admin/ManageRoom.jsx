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
} from "react-icons/fa";

// Mock data based on your schema
const mockRooms = [
  {
    _id: "1",
    name: "Deluxe Ocean View",
    tagline: "Wake up to stunning sea vistas",
    description:
      "Spacious room with king bed, private balcony overlooking the ocean, and luxury bathroom amenities.",
    image: "/1.jpg",
    amenities: [
      "Ocean View",
      "King Bed",
      "Private Balcony",
      "Minibar",
      "Smart TV",
    ],
    price: 299,
    status: true,
    rating: 4.8,
  },
  {
    _id: "2",
    name: "Executive Suite",
    tagline: "Business and pleasure combined",
    description:
      "Premium suite with separate living area, work desk, and premium amenities for the discerning traveler.",
    image: "/1.jpg",
    amenities: [
      "Separate Living Area",
      "Work Desk",
      "Premium Wi-Fi",
      "Coffee Machine",
    ],
    price: 399,
    status: true,
    rating: 4.5,
  },
  {
    _id: "3",
    name: "Family Suite",
    tagline: "Comfort for the whole family",
    description:
      "Two connecting rooms with bunk beds for kids, game console, and family-friendly amenities.",
    image: "/1.jpg",
    amenities: ["Connecting Rooms", "Bunk Beds", "Game Console", "Mini Fridge"],
    price: 459,
    status: false,
    rating: 4.2,
  },
];

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from your API
    setRooms(mockRooms);
  }, []);

  const openRoomDetail = (room) => {
    setSelectedRoom(room);
    setFormData({ ...room });
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

  const handleSaveChanges = () => {
    // In a real app, this would send an API request
    setLoading(true);
    setTimeout(() => {
      const updatedRooms = rooms.map((room) =>
        room._id === formData._id ? formData : room
      );
      setRooms(updatedRooms);
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleDeleteRoom = (id) => {
    // In a real app, this would send a delete request
    const updatedRooms = rooms.filter((room) => room._id !== id);
    setRooms(updatedRooms);
    closeModal();
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Rooms</h1>
      </div>

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
                  layout="fill"
                  objectFit="cover"
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
                <button className={styles.editButton}>
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
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>

                <div className={styles.roomDetails}>
                  {isEditing ? (
                    <form className={styles.editForm}>
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
                        <label>Price per Night ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price || ""}
                          onChange={handlePriceChange}
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
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.saveButton}
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
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
