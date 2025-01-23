import React from "react";
import styles from "./home.module.css"
import HomeSlider from "@/components/HomeSlider/HomeSlider";


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeSlider />
      </div>
      Navbar Slider For Houses Talking about the brand Single Component Footer
    </div>
  );
}
