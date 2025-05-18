import React from 'react';
import styles from './sroom.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/components/Rating/Rating';

export default async function SingleRoom({ params }) {
  const id = Number(params.id);
  // Here you’d fetch room data by id; for now we hard-code:
  const room = {
    name: 'Single Room',
    tagline: 'Cozy, perfect for solo travelers',
    description:
      'A comfortable space designed for solo guests seeking tranquility and modern convenience. Enjoy a peaceful stay with all the essentials at your fingertips.',
    image: '/landing.jpg',
    amenities: [
      'Free Wi-Fi',
      'Flat-screen TV',
      'Air Conditioning',
      'Work Desk',
      'Private Bathroom',
    ],
    price: 234,
    reviews: 13,
    status: 'Available',
  };

  return (
    <div>
      <section className={styles.container}>
      <Link href="/room" className={styles.back}>
        ← Back to Rooms
      </Link>

      <div className={styles.card}>
        <div className={styles.imageArea}>
          <Image
            src={room.image}
            alt={room.name}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.infoArea}>
          <div className="flex justify-between items-center">
            <h1 className={styles.title}>{room.name}</h1>
          <span>{room.reviews} reviews</span>
          </div>
          <p className={styles.tagline}>{room.tagline}</p>
          
          <p className={styles.description}>{room.description}</p>

          <ul className={styles.amenities}>
            {room.amenities.map((amenity, i) => (
              <li key={i} className={styles.amenityItem}>
                {amenity}
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <div className={styles.price}>
              From <span>${room.price}</span> / night
            </div>
            <div className={styles.actions}>
              <span className={`${styles.status} ${styles[room.status.toLowerCase()]}`}>
                {room.status}
              </span>
              <button className={styles.bookButton}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className={styles.ratingRow}>
            <Rating value={room.reviews} /> 
          </div>
    </div>
  );
}
