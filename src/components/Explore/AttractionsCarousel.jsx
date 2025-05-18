"use client"
import React, { useState } from "react";
import styles from "./styles/Attract.module.css"
import { StarIcon } from "@heroicons/react/24/solid";

const attractions = [
  {
    id: 1,
    title: "Lakeside Garden",
    description: "A serene escape with lush greenery and peaceful waters.",
    location: "Downtown, City Center",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/1467596838/photo/residential-garden-landscaping-design-idea.jpg?s=612x612&w=0&k=20&c=qZVvr9oR3a8ZhWoV4TKYJHWgHemPMs17yWUUXsISFe4=",
  },
  {
    id: 2,
    title: "Historic Castle",
    description: "Step back in time with ancient walls and grand halls.",
    location: "Old Town District",
    rating: 4.7,
    image: "https://cdn.pixabay.com/photo/2016/08/15/08/22/greece-1594689_1280.jpg",
  },
  {
    id: 3,
    title: "Skyline Viewpoint",
    description: "Catch a breathtaking panoramic view of the city lights.",
    location: "Hilltop Park",
    rating: 4.9,
    image: "https://media.istockphoto.com/id/860696690/photo/cityscapes.jpg?s=612x612&w=0&k=20&c=ZIVRl-GkLDWZw3KySz3OaET3Au8SQA04o21Sxr97kE4=",
  },
  {
    id: 4,
    title: "Cultural Museum",
    description: "Discover rich heritage and stunning art exhibitions.",
    location: "Museum Avenue",
    rating: 4.5,
    image: "https://cdn.pixabay.com/photo/2022/08/06/14/23/television-tower-7368721_640.jpg",
  },
  {
    id: 5,
    title: "Night Market",
    description: "Vibrant nights, delicious street food, and local crafts.",
    location: "Market Street",
    rating: 4.6,
    image: "https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014619_640.jpg",
  },
];

const AttractionsSection = () => {
  const [current, setCurrent] = useState(0);
  const active = attractions[current];

  return (
    <div>
       <h1 className={styles.title}>Enjoy the Nearby Scenery</h1>
      <section className={styles.section}>
     
      <div className={styles.imageArea}>
        <img src={active.image} alt={active.title} className={styles.mainImage} />
      </div>

      <div className={styles.detailsArea}>
        <div className={styles.info}>
          <h2>{active.title}</h2>
          <p className={styles.description}>{active.description}</p>
          <p className={styles.location}>📍 {active.location}</p>
          <p className={styles.rating}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={`${styles.star} ${i < Math.floor(active.rating) ? styles.filled : ""}`} />
            ))}
            <span>{active.rating}</span>
          </p>
        </div>

        <div className={styles.thumbnails}>
          {attractions.map((place, idx) => (
            <img
              key={place.id}
              src={place.image}
              alt={place.title}
              className={`${styles.thumb} ${idx === current ? styles.active : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default AttractionsSection;
