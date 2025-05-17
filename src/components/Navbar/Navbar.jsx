"use client"
import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/room", title: "Rooms & Suites" },
    { path: "/explore", title: "Explore" },
    { path: "/gallery", title: "Gallery" },
    { path: "/contact", title: "Contact Us" },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Desktop Navigation */}
      <div className={styles.desktopNav}>
        <Link href="/" className={styles.logo}>
          Gamma Suites
        </Link>
        
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.link} ${
                pathname === link.path ? styles.active : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link href="/book" className={styles.bookButton}>
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.logo}>
            Gamma Suites
          </Link>
          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className={styles.closeIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className={styles.hamburger}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
          <div className={styles.menuContent}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.mobileLink} ${
                  pathname === link.path ? styles.active : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link href="/" className={styles.mobileBookButton}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}