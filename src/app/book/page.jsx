// app/book-now/page.jsx
import styles from './bookNow.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GiReceiveMoney,
  GiCardPickup,
  GiCirclingFish
} from 'react-icons/gi';

export default function BookNow() {
  const rooms = [
    {
      id: 1,
      title: "Midnight Monarch Suite",
      description: "360° city views with smart glass privacy controls",
      price: 599,
      image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=600",
      amenities: ['24/7 Butler', 'Private Bar', 'Sky Pool Access', 'VR Entertainment'],
      highlight: "Most Popular"
    },
    {
      id: 2,
      title: "Stellar Executive",
      description: "Floor-to-ceiling windows with telescope lounge",
      price: 899,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
      amenities: ['Massage Chair', 'Smart Ambiance', 'Premium Minibar', 'Luxury Bath'],
      highlight: "Luxury Choice"
    },
    {
      id: 3,
      title: "Nebula Pod",
      description: "Futuristic modular living with holographic interface",
      price: 399,
      image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=600",
      amenities: ['Mood Lighting', 'Sound Pod', 'AI Concierge', 'Compact Luxury'],
      highlight: "Budget Favorite"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Night, Elevated</h1>
          <p className={styles.heroSubtitle}>Select Your After-Dark Experience</p>
        </div>
      </section>

      {/* Room Showcase */}
      <main className={styles.main}>
        <div className={styles.roomGrid}>
          {rooms.map((room) => (
            <article key={room.id} className={styles.roomCard}>
              {room.highlight && (
                <div className={styles.highlightBadge}>{room.highlight}</div>
              )}
              <div className={styles.imageContainer}>
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className={styles.roomImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.roomContent}>
                <h2 className={styles.roomTitle}>{room.title}</h2>
                <p className={styles.roomDescription}>{room.description}</p>
                <div className={styles.amenities}>
                  {room.amenities.map((item, index) => (
                    <span key={index} className={styles.amenityPill}>{item}</span>
                  ))}
                </div>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>${room.price}</span>
                  <span className={styles.night}>/night</span>
                </div>
                <Link 
                  href={`/room/${room.id}`} 
                  className={styles.ctaButton}
                >
                  Reserve Experience
                  <span className={styles.buttonGlow} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>


{/* Trust Badges Section */}
<section className={styles.trustSection}>
  <div className={styles.trustContent}>
    <div className={styles.trustBadge}>
      <GiReceiveMoney className={styles.trustIcon} />
      <span>24/7 VIP Support</span>
    </div>
    <div className={styles.trustBadge}>
      <GiCardPickup className={styles.trustIcon} />
      <span>Instant Digital Check-In</span>
    </div>
    <div className={styles.trustBadge}>
      <GiCirclingFish className={styles.trustIcon} />
      <span>Best Rate Guarantee</span>
    </div>
  </div>
</section>

{/* Experience Grid */}
<section className={styles.experienceGrid}>
  <h2 className={styles.sectionTitle}>The Gamma Difference</h2>
  <div className={styles.gridContainer}>
    <div className={styles.gridCard}>
      <div className={styles.gridNumber}>01</div>
      <h3>Smart Room Profiles</h3>
      <p>Your preferences saved across all Gamma properties</p>
    </div>
    <div className={styles.gridCard}>
      <div className={styles.gridNumber}>02</div>
      <h3>Nightlife Concierge</h3>
      <p>Priority access to top clubs and exclusive events</p>
    </div>
    <div className={styles.gridCard}>
      <div className={styles.gridNumber}>03</div>
      <h3>Lunar Lounge Access</h3>
      <p>24/7 premium member-only areas</p>
    </div>
  </div>
</section>

{/* Comparison Table */}
<section className={styles.comparison}>
  <h2 className={styles.sectionTitle}>Suite Showdown</h2>
  <div className={styles.tableWrapper}>
    <table className={styles.comparisonTable}>
      <thead>
        <tr>
          <th>Feature</th>
          {rooms.map(room => (
            <th key={room.id}>{room.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {['Room Size', 'Max Guests', 'Private Bar', 'Sky Pool', 'VR System'].map((feature) => (
          <tr key={feature}>
            <td>{feature}</td>
            {rooms.map(room => (
              <td key={room.id}>
                {feature === 'Room Size' ? '850 sqft' : 
                 feature === 'Max Guests' ? '4' : 
                 feature === 'Private Bar' ? '✓' : 
                 feature === 'Sky Pool' ? '✓' : 'Premium'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Uncertain About Your Choice?</h2>
          <p className={styles.ctaText}>Our night concierge will craft your perfect experience</p>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Moonlight Concierge
            <span className={styles.buttonGlow} />
          </Link>
        </div>
      </section>
    </div>
  );
}