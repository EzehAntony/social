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
import styles from "../../../styles/login.module.css";
import userStore from "../../../utils/User";
import axios from "axios";

function register() {
    //Input state
    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });

    const user = userStore((state) => state.user);
    const addUser = userStore((state) => state.addUser);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    //Form Submit function
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios({
                url: "https://droplikebackend.herokuapp.com/api/auth/login",
                method: "POST",
                withCredentials: true,
                data: {
                    username: inputValue.username,
                    password: inputValue.password,
                },
            }).then((res) => {
                setLoading(false);
                addUser(res.data);
                toast.success("Logged In", {
                    theme: "colored",
                    autoClose: 2000,
                    hideProgressBar: true,
                    isLoading: false,
                });
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            let message = "";
            if (error.response) {
                message = error.response.data;
            } else {
                message = error.message;
            }
            toast.error(message, {
                autoClose: 3000,
                hideProgressBar: true,
                theme: "colored",
            });
        }
    };

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            navigate(`/home/${user._id}`);
        }
    }, [user]);

    //***********UseRef*****************//

    let ref = useRef();
    const g = gsap.utils.selector(ref);

    //************Gsap TImeline*************//
    const t1 = new TimelineLite({ duration: 0.8, ease: Power3.easeIn });

    //************UseEffect for Gsap*************//

    return (
        <div className={styles.login}>
            <img src="/logo4.png" alt="" />
            <form onSubmit={submit}>
                <h1 style={{ margin: "0 0 20px 0" }}>Login</h1>
                <input
                    autoComplete="true"
                    type="text"
                    placeholder="username"
                    value={inputValue.username}
                    onChange={(e) =>
                        setInputValue((prev) => ({
                            ...inputValue,
                            username: e.target.value.toLowerCase(),
                        }))
                    }
                    required={true}
                />
                <input
                    type="password"
                    autoComplete="true"
                    placeholder="password"
                    value={inputValue.password}
                    onChange={(e) =>
                        setInputValue((prev) => ({
                            ...inputValue,
                            password: e.target.value.toLowerCase(),
                        }))
                    }
                    required={true}
                />
                <button type="submit">
                    <ClapSpinner size={20} frontColor={"#0092c6"} loading={loading} />
                    {!loading && "Login"}
                </button>
                <h3>
                    Don't have an account? <Link href="/auth/register">Register</Link>
                </h3>
            </form>
            <Snowfall />
            <ToastContainer />
        </div>
    );
}

export default register;
