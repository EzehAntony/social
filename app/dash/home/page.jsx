"use client";

import styles from "../../../styles/home.module.css";
import { useEffect, useState } from "react";

function index() {
    return (
        <>
            <div className={styles.index}>
                <header>
                    <img src="/box-white.svg" alt="" />
                    <input type="text" />
                    <button>Post</button>
                </header>
            </div>
        </>
    );
}

export default index;
