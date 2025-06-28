"use client";
import React, { useState, useEffect } from "react";
import styles from "./room.module.css";
import Image from "next/image";
import Link from "next/link";

const Room = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Room categories for filtering
  const categories = [
    { id: "all", name: "All Rooms" },
    { id: "popular", name: "Most Popular" },
    { id: "luxury", name: "Luxury Choices" },
    { id: "budget", name: "Budget Favorites" },
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/room");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);



  // Filter rooms based on category
  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : rooms.filter((room) =>
          room.highlight?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading rooms...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Luxury Accommodations</h1>
          <p className={styles.heroSubtitle}>
            Discover the perfect blend of comfort, style, and sophistication
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                activeFilter === category.id ? styles.activeFilter : ""
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className={styles.roomGridContainer}>
        {filteredRooms.length === 0 ? (
          <div className={styles.noRooms}>
            <p>No rooms found in this category</p>
          </div>
        ) : (
          <div className={styles.roomGrid}>
            {filteredRooms.map((room) => (
              <div key={room._id} className={styles.roomCard}>
                {/* Highlight Badge */}
                {room.highlight && (
                  <div
                    className={`${styles.highlightBadge} ${
                      room.highlight.includes("Popular")
                        ? styles.popularBadge
                        : room.highlight.includes("Luxury")
                        ? styles.luxuryBadge
                        : styles.budgetBadge
                    }`}
                  >
                    {room.highlight}
                  </div>
                )}

                {/* Image */}
                <div className={styles.imageContainer}>
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className={styles.roomImage}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Room Content */}
                <div className={styles.roomContent}>
                  <div className={styles.roomHeader}>
                    <h2 className={styles.roomTitle}>{room.name}</h2>
                    <p className={styles.roomTagline}>{room.tagline}</p>
                  </div>

                  <p className={styles.roomDescription}>{room.description}</p>

                  {/* Amenities */}
                  <div className={styles.amenities}>
                    {room.amenities.slice(0, 4).map((item, index) => (
                      <div key={index} className={styles.amenityItem}>
                        <span className={styles.amenityIcon}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className={styles.priceContainer}>
                    <div>
                      <span className={styles.price}>${room.price}</span>
                      <span className={styles.night}>/night</span>
                    </div>
                    <div>
                      {room.totalNo === 0 ? (
                        <span
                          className={styles.disabledButton}
                        >
                          Unavailable
                        </span>
                      ) : (
                        <Link
                          href={`/room/${room._id}`}
                          className={styles.ctaButton}
                        >
                          Reserve Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Can't Decide Which Room Suits You?
          </h2>
          <p className={styles.ctaText}>
            Our concierge team is ready to help you choose the perfect
            accommodation for your stay at Gamma Suites.
          </p>
          <Link href="/contact" className={styles.ctaButtonLarge}>
            Contact Our Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
