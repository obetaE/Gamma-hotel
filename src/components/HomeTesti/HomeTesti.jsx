import React from "react";
import styles from "./HomeTesti.module.css"
import Image from "next/image";

export default function HomeTesti(){
    return (
      <div className={styles.container}>
      <p>Reviews from our Satisfied Customers</p>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.textbox}>
              <span>"</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis
                pariatur esse, id eaque delectus, deleniti ea provident quam
                aspernatur! Placeat, magnam?
              </p>
              <span>"</span>
            </div>
            <div className={styles.client}>
                <div className={styles.imageContainer}>
                    <Image className={styles.img} src="/profile.jpg" alt="Customer's Profile Picture" fill/>
                </div>
                <section>Timothy Steven</section>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.textbox}>
              <span>"</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis
                pariatur esse, id eaque delectus, deleniti ea provident quam
                aspernatur! Placeat, magnam?
              </p>
              <span>"</span>
            </div>
            <div className={styles.client}>
                <div className={styles.imageContainer}>
                    <Image className={styles.img} src="/profile.jpg" alt="Customer's Profile Picture" fill/>
                </div>
                <section>Timothy Steven</section>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.textbox}>
              <span>"</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis
                pariatur esse, id eaque delectus, deleniti ea provident quam
                aspernatur! Placeat, magnam?
              </p>
              <span>"</span>
            </div>
            <div className={styles.client}>
                <div className={styles.imageContainer}>
                    <Image className={styles.img} src="/profile.jpg" alt="Customer's Profile Picture" fill/>
                </div>
                <section>Timothy Steven</section>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.textbox}>
              <span>"</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis
                pariatur esse, id eaque delectus, deleniti ea provident quam
                aspernatur! Placeat, magnam?
              </p>
              <span>"</span>
            </div>
            <div className={styles.client}>
                <div className={styles.imageContainer}>
                    <Image className={styles.img} src="/profile.jpg" alt="Customer's Profile Picture" fill/>
                </div>
                <section>Timothy Steven</section>
            </div>
          </div>
        </div>
      </div>
    );
}