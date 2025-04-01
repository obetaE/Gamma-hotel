"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./styles/hero.module.css";
import Image from "next/image";

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null); // Store the interval reference

  const heroSlides = [
    {
      id: 1,
      headline: "Your Luxury Is Our Top Priority",
      description:
        "Beyond enjoying your stay, how about a view that brings you peace?",
      path: "https://media.istockphoto.com/id/2093527928/photo/close-up-of-black-man-receiving-room-cardkey-while-checking-in-at-the-hotel.jpg?s=612x612&w=0&k=20&c=SXPIa41fx-9TPfN1UovHyHr0umvtE8Uyj79YJ7K2u-w=",
    },
    {
      id: 2,
      headline: "Unwind. Indulge. Experience Pure Bliss",
      description:
        "Discover a world where every moment is tailored for your comfort and joy.",
      path: "https://media.istockphoto.com/id/1183891002/photo/cropped-shot-of-tourist-woman-pulling-her-luggage-to-her-hotel-bedroom-after-check-in.jpg?s=612x612&w=0&k=20&c=bJgYjo43b2VGMsVb96h9UUN8LIc5gIPSYu4PDCtoi0g=",
    },
    {
      id: 3,
      headline: "A Culinary Journey Awaits",
      description:
        "Savor exquisite dishes crafted by world-class chefs in stunning settings.",
      path: "https://cdn.pixabay.com/photo/2015/09/22/13/16/hotel-951596_640.jpg",
    },
    {
      id: 4,
      headline: "Find Serenity in Our Spa Sanctuary",
      description:
        "Rejuvenate your body and mind with luxurious treatments and peaceful ambiance.",
      path: "https://cdn.pixabay.com/photo/2016/08/11/02/23/massage-therapy-1584711_1280.jpg",
    },
    {
      id: 5,
      headline: "Explore the Heartbeat of the City",
      description:
        "Step out and discover vibrant nightlife, historic treasures, and cultural gems nearby.",
      path: "https://cdn.pixabay.com/photo/2019/07/30/14/12/woman-4373078_640.jpg",
    },
  ];

  // Function to start automatic sliding
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4000);
  };

  // Start automatic sliding on mount
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  // When the index changes, update the radio button
  useEffect(() => {
    const radioButton = document.getElementById(
      `slide-${heroSlides[index].id}`
    );
    if (radioButton) radioButton.checked = true;
  }, [index]);

  // Function to handle manual clicks on labels
  const handleManualClick = (newIndex) => {
    clearInterval(intervalRef.current); // Stop auto-slide
    setIndex(newIndex); // Set new index
    startAutoSlide(); // Restart auto-slide
  };

  return (
    <div className={styles.container}>
      {/* Radio inputs to control the slides */}
      {heroSlides.map((slide, i) => (
        <input
          key={`radio-${slide.id}`}
          type="radio"
          name="group"
          id={`slide-${slide.id}`}
          className={styles.radio}
          defaultChecked={i === 0} // First slide checked by default
        />
      ))}

      <div className={styles.slider}>
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              i === index ? styles.active : styles.inactive
            }`}
            id={`slide${slide.id}`}
          >
            <Image
              src={slide.path}
              alt={`Slide ${i + 1}`}
              fill
              className={styles.img}
            />
            <div className={styles.title}>
              <p>{slide.headline}</p>
              <span>{slide.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className={styles.dots}>
        {heroSlides.map((slide, i) => (
          <label
            key={slide.id}
            htmlFor={`slide-${slide.id}`}
            onClick={() => handleManualClick(i)}
          ></label>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
