import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { type GitHubStatus } from "../interfaces/Objects";
import { useUserData } from "../contexts/UserDataContext";
import GitHubConnectButton from "../components/GitHubConnectButton";
import { useEffect, useState,  } from "react";
import { getGitHubStatus } from "../services/Github";

const SettingsPage = () => {

    const {firstName, lastName, email} = useUserData();
    const [githubStatus, setGithubStatus] = useState<GitHubStatus | null>(null);

    useEffect(() => {
        const verify = async () => {
            
            try {
                const githubData = await getGitHubStatus();
                sessionStorage.setItem("githubStatus", JSON.stringify(githubData));

                if (githubData) {
                    setGithubStatus(githubData);
                } else {
                    setGithubStatus({connected: false, username: ""});
                    sessionStorage.removeItem("githubStatus");
                }

            } catch (error) {
                console.error(error);
            }
        };
        
        verify();

        const params = new URLSearchParams(window.location.search);
        if (params.get("github") === "connected") {
            alert("GitHub account connected successfully!");
            window.history.replaceState({}, '', '/dashboard'); // Clear query params
        }

    }, [])

    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
                <h1 className="text-4xl font-medium mb-10">Settings</h1>
                <h1 className="text-3xl mb-3">Profile</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200">
                    <p>
                        <span className="font-medium text-dark-teal-700">Name: </span>
                        <span>{`${firstName} ${lastName}`}</span>
                    </p>
                    <p>
                        <span className="font-medium text-dark-teal-700">Email: </span>
                        <span>{`${email}`}</span>
                    </p>
                </div>
                <h1 className="text-3xl mt-10 mb-3">Connected Accounts</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200">
                    <p className="flex flex-col gap-5 items-center">
                        <div className="flex gap-1 w-full">
                            <span className="font-medium text-dark-teal-700">GitHub: </span>
                            <p>{githubStatus?.connected ? `Connected as ${githubStatus.username}` : "Not Connected"}</p>
                        </div>
                        <GitHubConnectButton connected={githubStatus?.connected || false} />
                    </p>
                </div>
                <h1 className="text-3xl mt-10 mb-3">Danger Zone</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200 flex justify-center">
                    <button className="bg-red-900 text-white h-12 pl-2 pr-2 rounded hover:bg-red-950 hover:cursor-pointer w-50">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
}

export default SettingsPage;