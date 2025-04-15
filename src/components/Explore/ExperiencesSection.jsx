import React from 'react'
import {
  CakeIcon,
  WifiIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import styles from "./styles/exp.module.css"
import Image from "next/image"

const ExperiencesSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Enjoy The Best, <p>We have So Much To Make your Stay Comfortable</p>{" "}
      </h1>
      <div className={styles.wrapper}>
        <h2>With Offers Like:</h2>
        <div className={styles.card}>
          <div className={styles.benefit}>
            <figure className={styles.imgContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2018/04/05/13/08/water-3292794_640.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </figure>
          </div>
          <div className={styles.about}>
            <span>Sky Pool</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperiencesSection