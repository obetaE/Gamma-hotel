"use client"
import React, { useState } from 'react'
import styles from "./admin.module.css"
import AddRoom from "@/components/Admin/AddRoom"
import ManageRoom from '@/components/Admin/ManageRoom';
import { FaPlus } from "react-icons/fa";

const adminPanel = () => {
  const [open , setOpen ] = useState(false);
  return (
    <div className={styles.container}>
      {open ? (
        <button onClick={() => setOpen(true)} className={styles.addButton}>
          <FaPlus /> Add New Room
        </button>
      ) : (
        <button onClick={() => setOpen(true)} className={styles.addButton}>
          X Close
        </button>
      )}

      <div className={styles.left}>
        {open ? (
          <div className={styles.addRoom}>
          <AddRoom />
        </div>
        ):(
        <ManageRoom />
        )}
      </div>
    </div>
  );
}

export default adminPanel