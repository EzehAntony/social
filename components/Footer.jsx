"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "../styles/Footer.module.css";

function Footer() {
    const [color, setColor] = useState({
        home: false,
        search: false,
        add: false,
    });
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (path.includes("/home")) {
            setColor((prev) => ({ ...prev, home: true }));
            setColor((prev) => ({ ...prev, search: false }));
            setColor((prev) => ({ ...prev, newPost: false }));
        }

        if (path.includes("/search")) {
            setColor((prev) => ({ ...prev, search: true }));
            setColor((prev) => ({ ...prev, home: false }));

            setColor((prev) => ({ ...prev, newPost: false }));
        }
        if (path.includes("/newPost")) {
            setColor((prev) => ({ ...prev, newPost: true }));
            setColor((prev) => ({ ...prev, home: false }));
            setColor((prev) => ({ ...prev, search: false }));
        }
        if (path.includes("/profile")) {
            setColor((prev) => ({ ...prev, newPost: false }));
            setColor((prev) => ({ ...prev, home: false }));
            setColor((prev) => ({ ...prev, search: false }));
        }
    }, [path]);

    return (
        <div className={styles.footer}>
            <Link href={"/dash/home"}>
                <li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        fill={color.home == true ? "#0092c6" : "black"}
                        width="48"
                    >
                        <path d="M34.35 24.9q-.45 0-.875-.175T32.7 24.2l-8.9-8.9q-.35-.35-.525-.775-.175-.425-.175-.875 0-.5.175-.9T23.8 12l8.9-8.9q.35-.35.775-.525.425-.175.875-.175.5 0 .9.175T36 3.1l8.9 8.9q.35.35.525.75.175.4.175.9 0 .45-.175.875t-.525.775L36 24.2q-.35.35-.75.525-.4.175-.9.175Zm-29.3-2.65q-1.05 0-1.725-.675T2.65 19.9V7.35q0-1 .675-1.675T5.05 5h12.5q1 0 1.675.675T19.9 7.35V19.9q0 1-.675 1.675t-1.675.675Zm23.05 23.1q-1 0-1.675-.675t-.675-1.725v-12.5q0-1 .675-1.675T28.1 28.1h12.55q1 0 1.675.675T43 30.45v12.5q0 1.05-.675 1.725t-1.675.675Zm-23.05 0q-1.05 0-1.725-.675T2.65 42.95v-12.5q0-1 .675-1.675T5.05 28.1h12.5q1 0 1.675.675t.675 1.675v12.5q0 1.05-.675 1.725t-1.675.675Z" />
                    </svg>
                </li>
            </Link>
            <Link href={"/dash/search"}>
                <li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill={color.search == true ? "#0092c6" : "black"}
                        class="bi bi-search-heart-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                    </svg>
                </li>
            </Link>
            <Link href={"/dash/newPost"}>
                <li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill={color.newPost == true ? "#0092c6" : "black"}
                        class="bi bi-plus-square-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>
                </li>
            </Link>
            <Link href={"/dash/profile"}>
                <li>
                    <img src="/henessy.jpg" className={styles.profile} alt="" />
                </li>
            </Link>
        </div>
    );
}

export default Footer;
