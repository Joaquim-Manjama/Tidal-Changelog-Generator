import { useState } from "react";
import ProjectForm from "./ProjectForm";

const NoProjects = () => {

    const [isFormActive, setIsFormActive] = useState<boolean>(false);

    const handleButtonClick = () => {
        setIsFormActive(true);
    }

    if (isFormActive) {
        return <ProjectForm project={null} onClose={() => setIsFormActive(false)}/>
    }

    return <div className="flex flex-col items-center text-gray-600 gap-10 transition duration-200">
        <h1 className="text-lg font-medium">No Projects Yet :{"("}</h1>
        <p className="font-thin mt-[-20px]">Create your first project to start generating beautiful changelogs!</p>
        <button onClick={() => handleButtonClick()} className="bg-dark-teal-700 text-white p-4 rounded rounded-[10px] shadow-xl hover:bg-dark-teal-800 hover:cursor-pointer">+ Create Project</button>
        
        <h2 className="font-medium mb-[-20px]">How it works</h2>
        <ol>
            <li>1. Create a project.</li>
            <li>2. Connect to Github  or add realeases manually.</li>
            <li>3. Publish beautiful changelogs</li>
        </ol>


    </div>
}

export default NoProjects;