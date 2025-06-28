"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./confirmation.module.css";
import Link from "next/link";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;
      
      try {
        setLoading(true);
        const res = await fetch(`/api/bookings/${bookingId}`);
        if (!res.ok) throw new Error("Failed to fetch booking details");
        
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your booking details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className={styles.errorContainer}>
        <h2>Booking Not Found</h2>
        <p>{error || "Sorry, we couldn't find your booking details."}</p>
        <Link href="/" className={styles.homeLink}>
          ← Return to Home
        </Link>
      </div>
    );
  }

  // Format dates
  const checkInDate = new Date(booking.checkIn).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.successIcon}>✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your reservation at Gamma Suites has been successfully created.</p>
      </div>

      <div className={styles.bookingCard}>
        <div className={styles.bookingHeader}>
          <h2>Booking Details</h2>
          <div className={styles.bookingId}>ID: {booking._id}</div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <h3>Guest Name</h3>
            <p>{booking.name}</p>
          </div>
          
          <div className={styles.detailItem}>
            <h3>Email</h3>
            <p>{booking.email}</p>
          </div>
          
          <div className={styles.detailItem}>
            <h3>Check-in</h3>
            <p>{checkInDate}</p>
          </div>
          
          <div className={styles.detailItem}>
            <h3>Check-out</h3>
            <p>{checkOutDate}</p>
          </div>
          
          <div className={styles.detailItem}>
            <h3>Guests</h3>
            <p>{booking.guests}</p>
          </div>
          
          <div className={styles.detailItem}>
            <h3>Total Price</h3>
            <p className={styles.price}>${booking.stayPrice}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
          <button className={styles.printButton} onClick={() => window.print()}>
            Print Confirmation
          </button>
        </div>

        <div className={styles.support}>
          <h3>Need Assistance?</h3>
          <p>Contact our support team at support@gammasuites.com or call (123) 456-7890</p>
        </div>
      </div>
    </div>
  );
}