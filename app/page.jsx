"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import userStore from "../utils/User";
import styles from "../styles/Splash.module.css";
import Snowfall from "react-snowfall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClapSpinner } from "react-spinners-kit";
import { TimelineMax, Power3, gsap } from "gsap";

import Head from "next/head";

const t1 = new TimelineMax({ ease: "none", duration: 0.8 });

export default function Home() {
    const router = useRouter();

    const addUser = userStore((state) => state.addUser);

    useEffect(() => {
        addUser("");
    }, []);

    //**************UseRef**************//

    var ref = useRef(null);
    const g = gsap.utils.selector(ref);
    //**************Gsap useEffect**************//
    useEffect(() => {
        t1.to(g("#firstDiv"), { y: "100%", opacity: 0 }, 0.2)
            .to(g("#secondDiv"), { y: "100%", opacity: 0 }, 0.4)
            .to(g("#thirdDiv"), { y: "100%", opacity: 0 }, 0.6)
            .to(
                g("#logo"),
                {
                    opacity: 1,
                    y: 20,
                    onComplete: () => {
                        router.push("/auth/register");
                    },
                },
                0.6
            );
    }, []);

    return (
        <div ref={ref} className={styles.container}>
            <Head>
                <title>Droplike</title>
                <meta name="description" content="Social media app" />
                <link rel="icon" href="/logo4.png" />
            </Head>
            <Snowfall />

            <img src="/logo4.png" className={styles.logo} alt="" id="logo" />
            <h3 className={styles.text}>droplike</h3>

            <div className={styles.overlay} id="overlay">
                <div className={styles.firstDiv} id="firstDiv"></div>
                <div className={styles.secondDiv} id="secondDiv"></div>
                <div className={styles.thirdDiv} id="thirdDiv"></div>
            </div>

            <ToastContainer />
        </div>
    );
}
