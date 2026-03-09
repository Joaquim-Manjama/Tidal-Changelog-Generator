import { useState } from "react";
import { deleteProject } from "../services/Projects";
import { useUserData } from "../contexts/UserDataContext";
import { useNavigate } from "react-router";

interface ProjectProps {
    id: number;
    name: string;
    slug: string;
    githubRepo: string,
    onUpdate: () => void;
}

const Project = ({id, name, slug, githubRepo, onUpdate}: ProjectProps) => {

    const menuItemStyle = `p-2 text-white w-full hover:cursor-pointer hover:bg-white/2 text-center`;

    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

    const {setCurrentUserProject} = useUserData();

    const navigate = useNavigate();

    const handleDelete = async () => {
        
        const response = await deleteProject(id);
        console.log(response);
        window.location.reload();
    }

    const handleUpdate = () => {
        setIsMenuActive(false);
        setCurrentUserProject({id, name, slug, githubRepo})
        onUpdate();
    }
    
    const handleClick = () => {
        setCurrentUserProject({id, name, slug, githubRepo})
        navigate("/project")
    }

    return <div className="border shadow-dark-teal-700 shadow-md bg-ocean-blue-950 rounded-xl p-7 backdrop-blur-xl flex flex-col gap-3 relative w-[400px] h-[250px] hover:cursor-pointer hover:-translate-y-2 transition duration-200 hover:shadow-xl">
        <div onClick={() => handleClick()} className="absolute top-0 left-0 w-[90%] h-[100%]"></div>
        <h1 className="text-xl text-white font-medium">{name}</h1>
        <p className="text-gray-500 font-thin -mt-3">{slug}</p>
        <p className="text-gray-700 p-1 text-yellow-400">● 0 releases</p>
        <p className="text-gray-700 p-1 text-red-700">● 0 subscribers</p>
        <p className="text-center text-sky-surge-500">Last updated: Tommorrow</p>
        <p onClick={() => setIsMenuActive(true)} className="absolute text-white right-3 top-3 hover:cursor-pointer hover:text-gray-300">
            <span className="material-symbols-outlined">menu</span>
        </p>
        {
            isMenuActive 
            &&
            <div className="absolute border w-40 right-3 top-3 flex flex-col items-center backdrop-blur-xl rounded-xl z-5">
                <span onClick={() => setIsMenuActive(false)} className="material-symbols-outlined ml-33 text-red-500 mb-[-5px] hover:cursor-pointer hover:text-red-700">close</span>
                <p onClick={() => handleUpdate()} className={menuItemStyle + " hover:text-yellow-500"}>Update</p>
                <p onClick={() => handleDelete()} className={menuItemStyle + " hover:text-red-600 rounded-b-xl"}>Delete</p>
            </div>
        }
    </div>

}

export default Project;