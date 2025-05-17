// app/book-now/page.jsx
import styles from './bookNow.module.css';

export default function BookNow() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Experience Gamma Nights</h1>
          <p className={styles.subtitle}>Book Your Midnight Oasis</p>
        </div>
      </section>

      {/* Booking Form */}
      <main className={styles.bookingSection}>
        <form className={styles.bookingForm}>
          {/* Dates Section */}
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Select Dates</h2>
            <div className={styles.dateGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="checkin" className={styles.inputLabel}>Check-in</label>
                <input type="date" id="checkin" className={styles.dateInput} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="checkout" className={styles.inputLabel}>Check-out</label>
                <input type="date" id="checkout" className={styles.dateInput} />
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Room Type</h2>
            <div className={styles.roomGrid}>
              {['Midnight Suite', 'Twilight Chamber', 'Starlight Loft'].map((room) => (
                <div key={room} className={styles.roomCard}>
                  <input type="radio" name="room" id={room} className={styles.radioInput} />
                  <label htmlFor={room} className={styles.roomLabel}>
                    <span className={styles.roomName}>{room}</span>
                    <span className={styles.roomPrice}>$299/night</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Info */}
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Guest Information</h2>
            <div className={styles.guestGrid}>
              <input type="text" placeholder="First Name" className={styles.textInput} />
              <input type="text" placeholder="Last Name" className={styles.textInput} />
              <input type="email" placeholder="Email" className={styles.textInput} />
              <input type="tel" placeholder="Phone" className={styles.textInput} />
            </div>
          </div>

          {/* Payment Section */}
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>Payment Details</h2>
            <div className={styles.paymentGrid}>
              <div className={styles.cardPreview}>
                {/* Credit Card Preview */}
                <div className={styles.creditCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardLogo}>Gamma</span>
                    <span className={styles.cardType}>VISA</span>
                  </div>
                  <div className={styles.cardNumber}>•••• •••• •••• 1234</div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardName}>JOHN DOE</span>
                    <span className={styles.cardExpiry}>12/24</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardForm}>
                <input type="text" placeholder="Card Number" className={styles.textInput} />
                <input type="text" placeholder="Expiration Date" className={styles.textInput} />
                <input type="text" placeholder="CVC" className={styles.textInput} />
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Confirm Reservation
            <span className={styles.buttonGlow} />
          </button>
        </form>
      </main>


    </div>
  );
}