import React from "react";
import styles from "./home.module.css";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeOptions from "@/components/HomeOptions/HomeOptions";
import HomeAbout from "@/components/HomeAbout/HomeAbout";
import HomeTesti from "@/components/HomeTesti/HomeTesti";

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
      <div>
        <HomeTesti/>
      </div>
    </div>
  );
}
