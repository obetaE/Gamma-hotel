import React from 'react'
import styles from "./styles/dining.module.css"
import Image from "next/image"

const DiningSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>"Dining That Delights the Senses"</h1>
        <span className={styles.desc}>
          "Our chefs curate a menu that blends local flavors with international
          cuisines. Whether it's a romantic dinner under the stars or a casual
          brunch with friends, every meal is a celebration."
        </span>
      </div>
      <div className={styles.slider}>
        <div className={styles.list}>
          <div className={styles.item} style={{ "--position": 1 }}>
            <Image
              src="https://cdn.pixabay.com/photo/2016/11/22/18/58/bowl-1850039_640.jpg"
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 2 }}>
            <Image
              src="https://cdn.pixabay.com/photo/2017/04/22/17/49/wine-2251916_640.jpg"
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 3 }}>
            <Image
              src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 4 }}>
            <Image
              src="https://media.istockphoto.com/id/652696156/photo/fine-dinning-table-restaurant-dish-dinner-wine.jpg?s=612x612&w=0&k=20&c=JKFTkzhnWF1xWequ4jwLVfNvrYZLF3SBPxCUUsFTcr8="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 5 }}>
            <Image
              src="https://media.istockphoto.com/id/882125314/photo/beef-steak-grill-beef-steak-black-lentils-mixed-with-vegetable-cognac-or-brandy-as-drink.jpg?s=612x612&w=0&k=20&c=uaU0gdKJN_sbhIoa9D8mc_QiLxR6Z9VN867NfhtreoM="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 6 }}>
            <Image
              src="https://media.istockphoto.com/id/1353016905/photo/beautiful-table-decor-for-a-romantic-dinner-outdoors.jpg?s=612x612&w=0&k=20&c=gUJoCltLeYc9sn84S0_wzV9mYeMqRTf-1J9FQRWZhfk="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 7 }}>
            <Image
              src="https://media.istockphoto.com/id/623177652/photo/breakfast-at-hotel.jpg?s=612x612&w=0&k=20&c=LAS4LUNHyoEH_Rre2zcX3vT-fKpxnELITCA2Q0M_rWk="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 8 }}>
            <Image
              src="https://media.istockphoto.com/id/1457259411/photo/table-full-of-various-fresh-food-in-luxury-modern-restaurant.jpg?s=612x612&w=0&k=20&c=rr8CnHnichrgFS3AFNEKjTGJeNDw16r_FA1PPF2fAyg="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 9 }}>
            <Image
              src="https://media.istockphoto.com/id/2193979989/photo/man-serving-himself-at-buffet-breakfast.jpg?s=612x612&w=0&k=20&c=ikpnjAnddvjTpMbgUemW5KXC-55vUvvPpKbv--8Dxy4="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
          <div className={styles.item} style={{ "--position": 10 }}>
            <Image
              src="https://media.istockphoto.com/id/626311516/photo/chef-in-hotel-or-restaurant-kitchen-cooking-only-hands.jpg?s=612x612&w=0&k=20&c=_QZO1oRGks3893kJ8nUgVk3AS8tlf632uf6AU6owVa0="
              alt="gallery photos"
              fill
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiningSection