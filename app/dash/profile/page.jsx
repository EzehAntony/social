"use client";

import React from "react";
import Post from "../../../components/post";
import styles from "../../../styles/profile.module.css";

const getData = async () => {};

function page() {
    return (
        <div className={styles.profile}>
            <header>
                <div className={styles.profileRing}>
                    <div className={styles.profileImg}>
                        <img src="/henessy.jpg" alt="" />
                    </div>
                </div>

                <div className={styles.profileName}>Anthony Ezeh</div>
                <div className={styles.profileUsername}>crayonne</div>
                <div className={styles.profileNumbers}>
                    <div className={styles.following}>
                        <p>50</p>
                        <span>Followings</span>
                    </div>
                    <div className={styles.followers}>
                        <p>40</p>
                        <span>Followers</span>
                    </div>
                    <div className={styles.posts}>
                        <p>5</p>
                        <span>Posts</span>
                    </div>
                </div>
            </header>

            <div className={styles.buttonContainer}>
                <button className={styles.follow}>Follow</button>
                <button className={styles.message}>Message</button>
                <img src="/add.svg" className={styles.suggested} alt="" />
            </div>

            <div className={styles.post}>
                <Post />
            </div>
        </div>
    );
}

export default page;
