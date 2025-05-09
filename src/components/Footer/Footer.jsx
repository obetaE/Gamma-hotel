import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      {/* Newsletter Section */}
      <div className={styles.top}>
        <h3 className={styles.newsletterTitle}>Join Our Newsletter</h3>
        <form className={styles.subscribe}>
          <input 
            type="email" 
            placeholder="Enter your email"
            className={styles.emailInput}
          />
          <button className={styles.button}>Subscribe</button>
        </form>
      </div>

      {/* Footer Content */}
      <div className={styles.bottom}>
        <div className={styles.grid}>
          {/* Social Links */}
          <div className={styles.socialSection}>
            <h4 className={styles.sectionTitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <Link key={link.id} href={link.href} className={styles.socialLink}>
                  <Image
                    src={link.icon}
                    alt={link.alt}
                    width={40}
                    height={40}
                    className={styles.socialIcon}
                  />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className={styles.hoursSection}>
            <h4 className={styles.sectionTitle}>Opening Hours</h4>
            <ul className={styles.hoursList}>
              {openingHours.map((hour) => (
                <li key={hour.day} className={styles.hourItem}>
                  <span className={styles.day}>{hour.day}</span>
                  <span className={styles.time}>{hour.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.quickLinks}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.quickLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data arrays
const socialLinks = [
  { id: 1, href: "/", icon: "https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Instagram_iccqog.png", alt: "Instagram", label: "@GammaSuite" },
  { id: 2, href: "/", icon: "https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Facebook_hdstbv.png", alt: "Facebook", label: "@GammaSuite" },
  { id: 3, href: "/", icon: "https://res.cloudinary.com/dudlxsoui/image/upload/v1737677762/Untitled_design_5_jvxoou.png", alt: "Phone", label: "+234 805 102 5661" },
  { id: 4, href: "/", icon: "https://res.cloudinary.com/dudlxsoui/image/upload/v1733071562/Twitter_nk36mk.png", alt: "Twitter", label: "@GammaSuite" },
];

const openingHours = [
  { day: "Monday", time: "9:00am - 9:00pm" },
  { day: "Tuesday", time: "9:00am - 9:00pm" },
  { day: "Wednesday", time: "9:00am - 9:00pm" },
  { day: "Thursday", time: "9:00am - 9:00pm" },
  { day: "Friday", time: "9:00am - 9:00pm" },
  { day: "Saturday", time: "9:00am - 11:00pm" },
  { day: "Sunday", time: "12:00am - 10:00pm" },
];

const quickLinks = [
  { href: "/room", label: "Rooms & Suites" },
  { href: "/explore", label: "Explore" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

export default Footer;