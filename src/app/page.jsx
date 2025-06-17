import React from "react";
import styles from "./home.module.css";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeOptions from "@/components/HomeOptions/HomeOptions";
import HomeAbout from "@/components/HomeAbout/HomeAbout";
import HomeTesti from "@/components/HomeTesti/HomeTesti";
import HomeCTA from "@/components/HomeCTA/HomeCTA";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeSlider />
      <div className={styles.contentWrapper}>
        <HomeAbout />
        <HomeOptions />
        <HomeTesti />
        <HomeCTA />
      </div>
    </div>
  );
}
