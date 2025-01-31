import React from "react";
import styles from "./home.module.css";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeOptions from "@/components/HomeOptions/HomeOptions";
import HomeAbout from "@/components/HomeAbout/HomeAbout";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeSlider />
      </div>
      <div>
        <HomeOptions />
      </div>
      <div>
        <HomeAbout />
      </div>
      Talking about the brand Single Component
    </div>
  );
}
