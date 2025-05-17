"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "./Gallery.module.css";
import { motion } from "framer-motion";

const categories = ["All", "Rooms", "Dining", "Events"];

const galleryImages = [
  { src: "/1.jpg", category: "Rooms" },
  { src:"/1.jpg", category: "Rooms" },
  { src: "/2.jpg", category: "Dining" },
  { src: "/2.jpg", category: "Dining" },
  { src: "/3.jpg", category: "Events" },
  { src: "/3.jpg", category: "Events" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Gallery</h2>

      <div className={styles.filter}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {filteredImages.map((img, index) => (
          <motion.div
            key={index}
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={img.src}
              alt={img.category}
              width={400}
              height={250}
              className={styles.image}
            />
            <span className={styles.label}>{img.category}</span>
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({ src: img.src }))}
      />
    </section>
  );
};

export default Gallery;
