import React from "react";
import styles from "./HomeAbout.module.css";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const HomeAbout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image
            alt="Gamma Suites Hotel"
            src="/about.jpeg"
            fill
            className={styles.img}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.content}>
          <h2 className={`${styles.title} ${playfair.className}`}>
            Experience Luxury at Gamma Suites
          </h2>

          <div className={styles.textContent}>
            <p>
              Nestled in the heart of the city, Gamma Suites offers a perfect
              blend of comfort, elegance, and excitement. Our hotel is designed
              for those who appreciate the finer things in life while seeking
              vibrant nightlife experiences.
            </p>

            <p>
              With breathtaking views, world-class amenities, and unparalleled
              service, we create unforgettable moments for every guest. Whether
              you're here for business or leisure, Gamma Suites provides the
              ultimate urban retreat.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <span>Luxury Accommodations</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <span>Rooftop Pool & Bar</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <span>Fine Dining Restaurant</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✓</div>
                <span>24/7 Concierge Service</span>
              </div>
            </div>

            <button className={styles.aboutButton}>Discover Our Story</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
