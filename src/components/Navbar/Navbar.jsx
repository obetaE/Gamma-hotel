"use client"
import React from "react"
import styles from "./Navbar.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from 'next/font/google';

  const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700"], // Adjust weights based on your needs
  });


export default function Home(){

  {
    /*
    Group Links:
Combine similar sections under dropdowns. For example:
"Rooms": Group "Rooms & Suites" and "Offers & Packages."
"Explore": Group "Dining & Nightlife" and "Amenities."
    */
  } 

    const navLinks = [
      {
        path: "/room",
        title: "Rooms & Suites",
      },
      {
        path: "/explore",
        title: "Explore",
      },
      {
        path: "/gallery",
        title: "Gallery",
      },
      {
        path: "/contact",
        title: "Contact Us",
      },
    ];
      const pathName = usePathname();
    return (
      <div className={styles.container}>
        <div className={`${styles.left} ${playfairDisplay.className}`}>
          Gamma Suites
        </div>
        <div className={styles.right}>
          {navLinks.map((links) => (
            <Link
              key={links.path}
              href={links.path}
              className={`${styles.links} ${
                pathName === links.path && styles.active
              }`}
            >
              {links.title}
            </Link>
          ))}
          <Link href="/" className={styles.book}>
            Book Now
          </Link>
        </div>
      </div>
    );
}