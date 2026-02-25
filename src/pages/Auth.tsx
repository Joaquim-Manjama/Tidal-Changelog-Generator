import { NavLink } from "react-router"
import Header from "../components/Header"
import Register from "../components/AuthBox"
import { useState } from "react"

const Auth = () => {

    const [authType, setAuthType] = useState<"login" | "register">("register")

    return <div className="w-full h-screen flex flex-col items-center relative text-white">
        <Header type={"main"}/>
        <NavLink to="/" className={"absolute top-20 right-10 bg-black p-4 pt-2 pb-1 rounded-xl bg-transparent scale-[1.5] font-normal hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"}><span className="material-symbols-outlined">keyboard_double_arrow_right</span></NavLink>
        <Register type={authType}/>
        <p className="mt-5">{authType === "register" ? "Already have an account?" : "Don't have an account?"}<button onClick={() => setAuthType(authType === "register" ? "login" : "register")} className="text-dark-teal-700 hover:text-dark-teal-800 hover:cursor-pointer ml-2">Switch to {authType === "register" ? "Log in" : "Sign up"}</button></p>
    </div>
}

export default Auth