import React from "react"
import styles from "./HomeOptions.module.css"
import Image from "next/image";
import Link from "next/link"

export default function HomeOptions(){
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2017/08/10/06/27/hotel-2619040_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
        </div>

        <Link href="/book" className={styles.Link}>See More</Link>
        <div className={styles.wrappers}>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.pixabay.com/photo/2017/08/10/06/27/hotel-2619040_640.jpg"
                alt="car!"
                fill
                className={styles.image}
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
        </div>
      </div>
    );
}