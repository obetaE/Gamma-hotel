"use client";
import React from 'react'
import { useState, useEffect } from "react";
import styles from "./explore.module.css";
import Image from "next/image";

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

    const heroSlides = [
      {
        id: 1,
        headline: "Your Luxury Is Our Top Priority",
        description:
          "Beyond enjoying your stay, how about a view that brings you peace?",
        path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
      },
      {
        id: 2,
        headline: "Unwind. Indulge. Experience Pure Bliss",
        description:
          "Discover a world where every moment is tailored for your comfort and joy.",
        path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
      },
      {
        id: 3,
        headline: "A Culinary Journey Awaits",
        description:
          "Savor exquisite dishes crafted by world-class chefs in stunning settings.",
        path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
      },
      {
        id: 4,
        headline: "Find Serenity in Our Spa Sanctuary",
        description:
          "Rejuvenate your body and mind with luxurious treatments and peaceful ambiance.",
        path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
      },
      {
        id: 5,
        headline: "Explore the Heartbeat of the City",
        description:
          "Step out and discover vibrant nightlife, historic treasures, and cultural gems nearby.",
        path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
      },
    ];

    useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  }, 3000);
  return () => clearInterval(interval);
}, []); // Empty dependency array, runs once when mounted.



  return (
    <div className={styles.container}>
      {heroSlides.map((slide, i) => (
        <div key={slide.id} className={styles.wrapper}>
          <div className={styles.imgcontainer}>
            <Image
              src={slide.path || "landing.jpg"}
              alt={`Slide ${i + 1}`}
              className={styles.img}
              fill
              onError={(e) => {
                console.error(`Error loading image at index ${i}:`, e);
                e.target.src = "/landing.jpg";
              }}
            />
          </div>
          <div className={styles.title}>
            <p>{slide.headline}</p>
            <span>{slide.description}</span>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default HeroCarousel