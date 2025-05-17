import React from 'react'
import styles from "./styles/exp.module.css"
import Image from "next/image"
import Link from 'next/link';
import { FaBed } from "react-icons/fa";
import { FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaTv } from "react-icons/fa";
import { MdAcUnit, MdSpa } from "react-icons/md";

const ExperiencesSection = () => {
  return (
    <div className={styles.container}>
<section className={styles.amenitiesSection}>
  <div className={styles.amenitiesContainer}>
    <h2 className={styles.sectionTitle}>Nocturnal Luxuries</h2>
    <p className={styles.sectionSubtitle}>Designed for moonlit indulgence</p>
    
    <div className={styles.amenitiesGrid}>
      {/* Amenity Cards */}
      {[
        { 
          title: "Infinity Night Pool", 
          icon: <FaSwimmingPool/>,
          description: "Rooftop pool with LED lighting system synced to ambient music"
        },
        {
          title: "Lunar Lounge",
          icon: <FaUtensils/>,
          description: "24/7 cocktail bar with glowing mixology experiences"
        },
        {
          title: "Stellar Spa",
          icon: <MdSpa/>,
          description: "After-dark spa treatments with bioluminescent therapies"
        },
        {
          title: "Unlimited Wifi",
          icon: <FaWifi/>,
          description: "Exclusive access to our members-only underground club"
        },
        {
          title: "Celestial Cinema",
          icon: <FaTv/> ,
          description: "Outdoor 4D cinema under the stars with luxury pods"
        },
        {
          title: "VIP Sky Suites",
          icon: <FaBed/>,
          description: "Private balconies with panoramic city night views"
        }
      ].map((amenity, index) => (
        <div key={index} className={styles.amenityCard}>
          <div className={styles.amenityIcon}>{amenity.icon}</div>
          <h3 className={styles.amenityTitle}>{amenity.title}</h3>
          <p className={styles.amenityDescription}>{amenity.description}</p>
          <div className={styles.amenityGlow} />
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}

export default ExperiencesSection