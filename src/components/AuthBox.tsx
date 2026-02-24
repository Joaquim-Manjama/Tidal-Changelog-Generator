import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login, register } from "../services/Authentication.ts";

interface AuthBoxProps {
    type: "login" | "register";
}

const inputStyle = `p-3 shadow rounded border border-white/10 mb-5 w-full`;

const AuthBox = ({type}: AuthBoxProps) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const resetInputFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{0,50}$/.test(value)) {
            
            if (e.target.placeholder === "First Name") {
                setFirstName(value);
            } else {
                setLastName(value);
            }
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setPasswordVisible(false);
        setLoading(true);
        if (type === "register") {

            console.log("Attempting to register with:", {firstName, lastName, email, password});

            try {
                await register(firstName, lastName, email, password);
                setLoading(false);
                navigate("/dashboard");
            } catch (error) {
                console.error("Registration error:", error);
                setLoading(false);
            }
        
        } else {

            console.log("Attempting to log in with:", {email, password});

            try {
                await login(email, password);
                setLoading(false);
                navigate("/dashboard");
            } catch (error) {
                console.error("Login error:", error);
                setLoading(false);
            }
        }

    }

    useEffect(() => {
        
        const reset = () => {
            resetInputFields();
        }

        reset();
        
    }, [type])

    return <div className={`flex flex-col w-[500px] ${type === "register" ? "h-[500px]" : "h-[400px]"} rounded-2xl bg-white/2 backdrop-blur-xl border border-white/10 shadow-xl p-8 ${loading && "cursor-progress"}`}>
        <h1 className="font-light text-3xl">{type === "register" ? "Sign Up" : "Log In"}</h1>
        <p className="font-thin text-sm text-gray-300 mt-1 mb-5">{type === "register" ? "Create a new account" : "Log in to your account"}</p>
        <form action="" className="w-full relative" onSubmit={(e) => handleSubmit(e)}>
            {type === "register" && <input value={firstName} onChange={(e) => handleNameChange(e)} type="text" placeholder="First Name" className={`${inputStyle} ${loading && "hover:cursor-not-allowed"}`} required/>}
            {type === "register" && <input value={lastName} onChange={(e) => handleNameChange(e)} type="text" placeholder="Last Name" className={`${inputStyle} ${loading && "hover:cursor-not-allowed"}`} required/>}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className={`${inputStyle} ${loading && "hover:cursor-not-allowed"}`} required/>
            <input value={password} minLength={6} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? "text": "password"} placeholder="Password" className={`${inputStyle} ${loading && "hover:cursor-not-allowed"}`} required/>
            <button className={`absolute ${type == "register" ? "right-5 bottom-23" : "right-5 top-21"} hover:cursor-pointer text-dark-teal-700`} onClick={() => setPasswordVisible(prev => !prev)}>
                <span className="material-symbols-outlined">{`visibility${passwordVisible ? "_off" : ""}`}</span>
            </button>
            {type === "login" && <p className="text-dark-teal-700 hover:text-dark-teal-800 hover:cursor-pointer mt-2">Forgot Password</p>}
            <button type="submit" onClick={(e) => handleSubmit(e)} className={`${loading ? "bg-gray-600 hover:cursor-not-allowed" :"bg-dark-teal-700 hover:bg-dark-teal-800 hover:cursor-pointer"} text-white py-3 px-4 rounded-lg transition duration-200 mt-5 w-full`}>{type === "register" ? "Sign Up" : "Log In"}</button>
        </form>
    </div>
}

export default AuthBox;