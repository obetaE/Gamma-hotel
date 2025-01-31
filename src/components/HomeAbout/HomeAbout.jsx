import React from "react";
import styles from "./HomeAbout.module.css";
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

  const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"], // Adjust weights based on your needs
  });

const HomeAbout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          alt="about image"
          src="/about.jpeg"
          fill
          className={styles.img}
        />
        <span className={playfairDisplay.className}>About Us</span>
      </div>
      <div className={styles.right}>
        <p className={playfairDisplay.className}>
          "Welcome to Gamma Suites, where luxury meets the vibrant energy of
          nightlife. Nestled in the heart of the city, our hotel offers a
          perfect blend of comfort, elegance, and excitement. Whether you're
          here for business or leisure, indulge in our stylish rooms, top-notch
          amenities, and world-class service. Experience unforgettable stays,
          breathtaking views, and the dazzling lights of the city. Your escape
          to luxury begins here!"
        </p>
      </div>
    </div>
  );
};

export default HomeAbout;
