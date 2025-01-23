"use client";
import React, { useState, useEffect } from "react";
import styles from "./slider.module.css";
import Image from "next/image";
import { Imperial_Script } from "next/font/google";

  const imperialScript = Imperial_Script({
    subsets: ["latin"],
    weight: ["400"], // Adjust weights based on your needs
  });

export default function HomeSlider() {
  const [index, setIndex] = useState(0);

  const sliderImages = [
    {
      id: 1,
      path: "https://cdn.pixabay.com/photo/2014/07/05/08/21/pool-384573_640.jpg",
    },
    {
      id: 2,
      path: "/2.jpg",
    },
    {
      id: 3,
      path: "https://cdn.pixabay.com/photo/2014/10/03/22/11/pool-472261_640.jpg",
    },
    {
      id: 4,
      path: "/4.jpg",
    },
    {
      id: 5,
      path: "/5.jpg",
    },
    {
      id: 6,
      path: "/1.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // Adjust the duration for the fade effect
    return () => clearInterval(interval);
  }, [sliderImages]);

  return (
    <div className={styles.container}>
      <div className={`${styles.text}`}>
        <p className={imperialScript.className}>Gamma Suites</p>
        <span>
          "Escape the Ordinary, Embrace the Nightlife! Book Your Stay at Gamma
          Suites and Let the Dazzling Lights Lead You to Unforgettable
          Experiences."
        </span> 
      </div>
      {sliderImages.map((image, i) => (
        <div
          key={image.id}
          className={`${styles.slide} ${
            i === index ? styles.activeSlide : styles.inactiveSlide
          }`}
        >
          <div className={styles.imgContainer}>
            <Image
              src={image.path || "/fallback-image.jpg"}
              alt={`Slide ${i + 1}`}
              fill
              onError={(e) => {
                console.error(`Error loading image at index ${i}:`, e);
                e.target.src = "/fallback-image.jpg";
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
