import React from 'react'
import {
  CakeIcon,
  WifiIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import styles from "./styles/exp.module.css"
import Image from "next/image"
import Link from 'next/link';

const ExperiencesSection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Enjoy The Best of Your Stay
      </h1>
      <h2 className="text-center mb-4 text-white ">We Have So Much to Make Your Stay Better</h2>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.benefit}>
            <figure className={styles.imgContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2021/06/24/15/54/model-6361674_640.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </figure>
          </div>
          <div className={styles.about}>
            <span>Sky Pool</span>
            <p>Relax with a view.
              Unwind by our stunning rooftop infinity pool, offering panoramic views and a serene escape.

            </p>
          </div>
        </div>
        <div className={styles.cardd}>
          <div className={styles.about}>
            <span> Gourmet Restaurant</span>
            <p>A feast for the senses.
            Savor exquisite dishes crafted by world-class chefs using the freshest local ingredients.
            </p>
          </div>
          <div className={styles.benefit}>
            <figure className={styles.imgContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2017/07/31/11/22/man-2557408_640.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </figure>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.benefit}>
            <figure className={styles.imgContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2022/07/06/12/04/candles-7304948_1280.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </figure>
          </div>
          <div className={styles.about}>
            <span> Spa & Wellness Center</span>
            <p>Revitalize your body and mind.
            Indulge in therapeutic massages, facials, and holistic treatments in our serene spa sanctuary.
            </p>
          </div>
        </div>
        <div className={styles.cardd}>
          <div className={styles.about}>
            <span> Luxury Suites</span>
            <p>Comfort redefined.
            Sleep in style with premium bedding, mood lighting, and top-tier room service at your fingertips.
            </p>
          </div>
          <div className={styles.benefit}>
            <figure className={styles.imgContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2015/08/16/04/07/bed-890579_640.jpg"
                alt=""
                fill
                className={styles.img}
              />
            </figure>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
      <div className={styles.more}>
        And so Much More :
      </div>
      <Link href="/room" className={styles.bookmore}>
       Book Now
      </Link>
      </div>
    </div>
  );
}

export default ExperiencesSection