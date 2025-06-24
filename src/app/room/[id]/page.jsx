"use client";
import React, { useState, useEffect } from "react";
import styles from "./sroom.module.css";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";
import { useParams } from "next/navigation";

export default function SingleRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "1 Adult",
    stayPrice: 0
  });
  
  const [days, setDays] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const getRoom = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/room/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch room");
        }

        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.error("Error loading room: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) getRoom();
  }, [id]);

  const calculateStayPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !room) return;
    
    // Calculate number of days
    const startDate = new Date(bookingData.checkIn);
    const endDate = new Date(bookingData.checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (days <= 0) return;
    
    setDays(days);
    
    // Calculate total price
    const totalPrice = days * room.price;
    
    // Update state
    setBookingData(prev => ({
      ...prev,
      stayPrice: totalPrice
    }));
  };

  useEffect(() => {
    calculateStayPrice();
  }, [bookingData.checkIn, bookingData.checkOut, room]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!bookingData.name || !bookingData.email || !bookingData.checkIn || 
        !bookingData.checkOut || bookingData.stayPrice <= 0) {
      setError("Please fill in all fields and select valid dates");
      return;
    }
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...bookingData,
          roomId: id,
          roomName: room.name
        })
      });
      
      if (!res.ok) {
        throw new Error("Failed to create booking");
      }
      
      setShowConfirmation(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  // Handle error state
  if (error || !room) {
    return (
      <div className={styles.notFound}>
        <h2>Room Not Found</h2>
        <p>Sorry, the room you're looking for doesn't exist.</p>
        <Link href="/room" className={styles.back}>
          ← Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{room.name}</h1>
          <p className={styles.heroSubtitle}>
            Luxury Accommodation at Gamma Suites
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <Link href="/room" className={styles.back}>
          ← Back to Rooms
        </Link>

        <div className={styles.mainContent}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image
                src={room.image}
                alt={room.name}
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.thumbnailGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.thumbnail}>
                  <Image
                    src={room.image}
                    alt={`${room.name} view ${i}`}
                    fill
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>{room.name}</h1>
                <p className={styles.tagline}>{room.tagline}</p>
              </div>
              <div className={styles.rating}>
                {/* <Rating value={room.rating} /> */}
                <span>
                  {room.rating} ({room.reviews || 12} reviews)
                </span>
              </div>
            </div>

            <div className={styles.highlightBadge}>{room.highlight}</div>

            <p className={styles.description}>{room.description}</p>

            <div className={styles.divider}></div>

            <div className={styles.features}>
              <h3>Room Features</h3>
              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <strong>Size</strong>
                    <p>35 m²</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <strong>Bed Type</strong>
                    <p>King Size</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <strong>View</strong>
                    <p>City View</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <strong>Occupancy</strong>
                    <p>2 Adults</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.amenities}>
              <h3>Amenities</h3>
              <div className={styles.amenityGrid}>
                {room.amenities.map((amenity, i) => (
                  <div key={i} className={styles.amenityItem}>
                    <div className={styles.amenityIcon}>✓</div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.bookingCard}>
              <div className={styles.priceInfo}>
                <div className={styles.price}>
                  ${room.price} <span>/ night</span>
                </div>
                <div className={styles.status}>
                  <span className={styles.available}>Available</span>
                </div>
              </div>

              <div className={styles.bookingForm}>
                {error && <div className={styles.error}>{error}</div>}
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className={styles.datePicker}>
                  <div className={styles.dateGroup}>
                    <label>Check In</label>
                    <input 
                      type="date" 
                      name="checkIn"
                      value={bookingData.checkIn}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.dateGroup}>
                    <label>Check Out</label>
                    <input 
                      type="date" 
                      name="checkOut"
                      value={bookingData.checkOut}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.guests}>
                  <label>Guests</label>
                  <select
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                    <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                  </select>
                </div>
                
                {days > 0 && (
                  <div className={styles.priceSummary}>
                    <div className={styles.priceRow}>
                      <span>{room.price} × {days} nights</span>
                      <span>${room.price * days}</span>
                    </div>
                    <div className={styles.priceRow}>
                      <span>Taxes & Fees</span>
                      <span>${Math.round(room.price * days * 0.12)}</span>
                    </div>
                    <div className={styles.totalPrice}>
                      <span>Total</span>
                      <span>${bookingData.stayPrice + Math.round(bookingData.stayPrice * 0.12)}</span>
                    </div>
                  </div>
                )}
                
                <button 
                  className={styles.bookButton}
                  onClick={handleSubmitBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Confirmation Modal */}
      {showConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.modalContent}>
              <div className={styles.successIcon}>✓</div>
              <h2>Booking Confirmed!</h2>
              <p>Your reservation at Gamma Suites has been successfully created.</p>
              
              <div className={styles.bookingDetails}>
                <div className={styles.detailRow}>
                  <span>Room:</span>
                  <span>{room.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Check-in:</span>
                  <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Check-out:</span>
                  <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Total Price:</span>
                  <span>${bookingData.stayPrice}</span>
                </div>
              </div>
              
              <p>A confirmation email has been sent to <strong>{bookingData.email}</strong></p>
              
              <button 
                className={styles.closeModalButton}
                onClick={() => setShowConfirmation(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}