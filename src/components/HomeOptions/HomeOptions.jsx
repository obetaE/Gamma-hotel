import React from "react";
import styles from "./HomeOptions.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HomeOptions() {
  return (
    <div className={styles.container}>
      <div className={styles.cardsWrapper}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg"
                alt="Room"
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>Single Room</h2>
              <p>Exclusive & Beautiful Lounge</p>
              <div className={styles.cardActions}>
                <button className={styles.button}>Book Now!</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Link href="/book" className={styles.link}>
        See More
      </Link>
    </div>
  );
}