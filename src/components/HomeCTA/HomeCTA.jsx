import React from "react";
import styles from "./HomeCTA.module.css";
import Link from "next/link";

const HomeCTA = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Ready for an Unforgettable Experience?</h2>
        <p className={styles.subtitle}>
          Book your stay at Gamma Suites today and immerse yourself in luxury
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/book" className={styles.primaryButton}>
            Book Your Stay
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCTA;
