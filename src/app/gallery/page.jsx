"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styles from "./gallery.module.css";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Rooms", "Dining", "Events"];

const galleryImages = [
  { src: "/1.jpg", category: "Rooms" },
  { src: "/1.jpg", category: "Rooms" },
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
      <motion.h2 
        className={styles.heading}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Gallery
      </motion.h2>

      <motion.div 
        className={styles.filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`${styles.filterBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${cat}`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => (
            <motion.div
              key={`${img.category}-${index}`}
              className={styles.card}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleImageClick(index)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={img.src}
                  alt={img.category}
                  width={400}
                  height={600}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay} />
                <span className={styles.label}>{img.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={filteredImages.map((img) => ({ src: img.src }))}
        plugins={[Thumbnails]}
        animation={{ fade: 300 }}
        render={{
          buttonPrev: filteredImages.length > 1 ? undefined : () => null,
          buttonNext: filteredImages.length > 1 ? undefined : () => null,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.9)" },
          thumbnail: { border: "2px solid #a855f7" },
        }}
      />
    </section>
  );
};

export default Gallery;