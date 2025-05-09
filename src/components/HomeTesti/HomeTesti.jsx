"use client"
import React, { useRef, useEffect } from "react";
import styles from "./HomeTesti.module.css";
import Image from "next/image";

export default function HomeTesti() {
  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    {
      id: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    {
      id: 6,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa beatae vero eligendi voluptatem odio fugiat sint nisi reiciendis pariatur esse...",
      author: "Timothy Steven",
    },
    // Add more testimonials as needed
  ];


  // Double the array for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const sliderRef = useRef(null);

 return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews from our Satisfied Customers</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper} ref={sliderRef}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className={styles.card}>
              <div className={styles.textbox}>
                <span aria-hidden="true">"</span>
                <p>{testimonial.text}</p>
                <span aria-hidden="true">"</span>
              </div>
              <div className={styles.client}>
                <div className={styles.imageContainer}>
                  <Image 
                    src="/profile.jpg" 
                    alt={`${testimonial.author}'s profile`}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 50px, 60px"
                  />
                </div>
                <p className={styles.author}>{testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}