"use client";

//React Imports
import { useState, useContext, useEffect, useRef } from "react";
import { TimelineLite, Power3, gsap } from "gsap";
import { useRouter } from "next/navigation";
import { ClapSpinner } from "react-spinners-kit";
import Link from "next/link";
import Snowfall from "react-snowfall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../styles/Register.module.css";
import axios from "axios";

function register() {
    //Input state
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        gender: "",
        profile: null,
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    //Form Submit function
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("file", input.profile);
        data.append("upload_preset", "uploads");

        await axios
            .post("https://api.cloudinary.com/v1_1/dq1m3buf0/image/upload", data)
            .then(async (res) => {
                await axios({
                    url: "https://droplikebackend.herokuapp.com/api/auth/register",
                    method: "POST",
                    withCredentials: true,
                    data: {
                        gender: input.gender,
                        firstname: input.firstName,
                        lastname: input.lastName,
                        username: input.username,
                        password: input.password,
                        profile: res.data.url,
                    },
                })
                    .then((res) => {
                        setLoading(false);
                        toast.success("Registered", {
                            type: "success",
                            isLoading: false,
                            theme: "colored",
                            autoClose: 3000,
                            onClose: () => {
                                navigate("/login");
                            },
                        });
                    })
                    .catch((err) => {
                        setLoading(false);
                        let message = "";
                        if (err.response.data) {
                            message = err.response.data;
                        } else {
                            message = "err";
                        }
                        toast(message, {
                            theme: "colored",
                            type: "err",
                            autoClose: 2000,
                            isLoading: false,
                        });
                    });
            })
            .catch((err) => {
                setLoading(false);
                const message = "Something went wrong";
                toast(message, {
                    theme: "colored",
                    type: "error",
                    autoClose: 2000,
                    isLoading: false,
                });
            });
    };

    //***********UseRef*****************//

    let ref = useRef();
    const g = gsap.utils.selector(ref);

    //************Gsap TImeline*************//
    const t1 = new TimelineLite({ duration: 0.8, ease: Power3.easeIn });

    //************UseEffect for Gsap*************//

    return (
        <div className={styles.register} ref={ref}>
            <img id="logo" src="/logo4.png" alt="" />

            <form id="form" onSubmit={submit}>
                <h2>Register</h2>
                <header>
                    <label>
                        <img src="/add.svg" className={styles.add} alt="" />
                        <input
                            type="file"
                            maxLength={15}
                            minLength={5}
                            onChange={(e) =>
                                setInput((prev) => ({
                                    ...prev,
                                    profile: e.target.files[0],
                                }))
                            }
                            required={true}
                        />
                    </label>
                    {input.profile ? (
                        <h3 style={{ color: "#00ff89" }}>Profile picture selected</h3>
                    ) : (
                        <h3 style={{ color: "#e3229e" }}>No profile picture selected</h3>
                    )}
                </header>

                <input
                    type="text"
                    placeholder="firstname"
                    maxLength={15}
                    minLength={5}
                    value={input.firstName}
                    onChange={(e) =>
                        setInput((prev) => ({
                            ...prev,
                            firstName: e.target.value.toLowerCase().trim(),
                        }))
                    }
                    required={true}
                />
                <input
                    type="text"
                    placeholder="lastname"
                    value={input.lastName}
                    maxLength={15}
                    minLength={3}
                    onChange={(e) =>
                        setInput((prev) => ({
                            ...prev,
                            lastName: e.target.value.toLowerCase().trim(),
                        }))
                    }
                    required={true}
                />
                <input
                    type="text"
                    placeholder="username"
                    autoSave="true"
                    value={input.username}
                    minLength={5}
                    maxLength={20}
                    onChange={(e) =>
                        setInput((prev) => ({
                            ...prev,
                            username: e.target.value.toLowerCase().trim(),
                        }))
                    }
                    required={true}
                />

                <input
                    type="password"
                    autoSave="true"
                    placeholder="password"
                    value={input.password}
                    minLength={5}
                    onChange={(e) =>
                        setInput((prev) => ({
                            ...prev,
                            password: e.target.value.toLowerCase().trim(),
                        }))
                    }
                    maxLength={15}
                    required={true}
                />
                <div className={styles.gender}>
                    gender: <span>M</span>
                    <input
                        type="radio"
                        name="gender"
                        value="m"
                        onChange={(e) => setInput((prev) => ({ ...prev, gender: e.target.value }))}
                    />
                    <span>F</span>
                    <input
                        type="radio"
                        name="gender"
                        required
                        value="f"
                        onChange={(e) => setInput((prev) => ({ ...prev, gender: e.target.value }))}
                    />
                </div>

                <button type="submit" id="button" onSubmit={submit}>
                    {!loading && "Sign Up"}
                    <ClapSpinner size={15} loading={loading} />
                </button>
                <h3 id="text">
                    Already have an account? <Link href="/auth/login">login</Link>
                </h3>
            </form>
            <Snowfall />
            <ToastContainer />
        </div>
    );
}

export default register;
