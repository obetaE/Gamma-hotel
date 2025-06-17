import React from "react";
import styles from "./HomeOptions.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HomeOptions() {
  const roomTypes = [
    {
      id: 1,
      name: "Deluxe Suite",
      description:
        "Spacious suite with panoramic city views and premium amenities",
      price: "$299/night",
    },
    {
      id: 2,
      name: "Executive Room",
      description: "Sophisticated accommodation for business travelers",
      price: "$229/night",
    },
    {
      id: 3,
      name: "Premium Double",
      description: "Comfortable room with queen beds and modern decor",
      price: "$199/night",
    },
    {
      id: 4,
      name: "Penthouse",
      description: "Luxurious top-floor suite with private balcony",
      price: "$499/night",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Our Accommodations</h2>
        <p className={styles.sectionSubtitle}>
          Experience luxury in every detail
        </p>
      </div>

      <div className={styles.cardsWrapper}>
        {roomTypes.map((room) => (
          <div key={room.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={`https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg`}
                alt={room.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.roomHeader}>
                <h3 className={styles.cardTitle}>{room.name}</h3>
                <span className={styles.price}>{room.price}</span>
              </div>
              <p className={styles.cardDescription}>{room.description}</p>
              <div className={styles.cardActions}>
                <button className={styles.button}>Book Now</button>
                <button className={styles.secondaryButton}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/book" className={styles.link}>
        View All Accommodations
      </Link>
    </div>
  );
}
