import { useState } from "react";
import ReleaseForm from "./ReleaseForm";
import { useUserData } from "../contexts/UserDataContext";

const NoReleases = () => {

    const [isFormActive, setIsFormActive] = useState<boolean>(false);

    const {currentProject} = useUserData();

    const handleButtonClick = () => {
        setIsFormActive(true);
    }

    if (isFormActive) {
        return <ReleaseForm projectId={currentProject.id} version="" description="" onClose={() => setIsFormActive(false)}/>
    }

    return <div className="flex flex-col items-center text-gray-600 gap-10 transition duration-200">
        <h1 className="text-lg font-medium">No Releases Yet :{"("}</h1>
        <p className="font-thin mt-[-20px]">Create your first release to start sharing updates with your users!</p>
        <button onClick={() => handleButtonClick()} className="bg-dark-teal-700 text-white p-4 rounded rounded-[10px] shadow-xl hover:bg-dark-teal-800 hover:cursor-pointer">+ Create Release</button>

    </div>
}

export default NoReleases;