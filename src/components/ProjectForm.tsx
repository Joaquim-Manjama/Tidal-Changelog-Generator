import { useEffect, useState } from "react";
import { createProject, updateProject } from "../services/Projects";
import type { ProjectFormProps } from "../interfaces/Props";

const ProjectForm = ({project, onClose}: ProjectFormProps) => {
    
    const inputStyle = `focus:border-dark-teal-700 focus:outline-none p-3 shadow rounded border border-white/10 mb-5 w-full -mt-4`;

    const [id, setId] = useState<string>(project?.id || "");
    const [name, setName] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [githubRepo, setGithubRepo] = useState<string>("");

    const reset = () => {
        setId("");
        setName("");
        setSlug("");
        setGithubRepo("")
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.target.value;

        const possibleSlug = convertToSlug(name); 
        if (possibleSlug == slug) {
            setSlug(convertToSlug(value));
        }

        setName(value);
    }

    const handleChangeSlug = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const value = e.target.value;
        setSlug(convertToSlug(value));

    }

    const convertToSlug = (text: string) => {
        const properSlug = text.replaceAll(" ", "-").toLowerCase();
        return properSlug;
    }
    
    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = project? await updateProject(id, name, slug, githubRepo): await createProject(name, slug, githubRepo);
        console.log(response);
        reset();
        onClose();
        window.location.reload();
    }

    useEffect(() => {

        const setValues = () => {
            setId(project?.id || "");
            setName(project?.name || "");
            setSlug(project?.slug || "");
            setGithubRepo(project?.githubRepo || "");
        }

        if (project) {
            setValues();
        }
    }, [])

    return<div className="absolute top-0 left-0 w-full h-screen flex transition duration-200 text-black">
            <form action=""  onSubmit={(e) => handleSubmit(e)} className="m-auto bg-white/30 backdrop-blur-xl m-auto w-[500px] rounded-2xl border border-white/10 shadow-xl p-8 flex flex-col gap-5">
                <span onClick={() => onClose()} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                <h1 className="text-2xl w-full text-center">{project ? "Update Project" :"New Project"}</h1>
                <label htmlFor="">Project Name*</label>
                <input type="text" value={name} onChange={(e) => {handleChangeName(e)}} className={inputStyle} placeholder="My Project" required/>
                <label htmlFor="">URL Slug*</label>
                <input type="text" value={slug} onChange={(e) => handleChangeSlug(e)} className={inputStyle} placeholder="my-project" required/>
                <p className="font-thin text-sm -mt-7 mb-2">yoursite.com/your-slug</p>
                <label htmlFor="" className="flex flex-row gap-2">Github Repository URL <p className="font-thin">(optional)</p></label>
                <input type="text" value={githubRepo} onChange={(e) => {setGithubRepo(e.target.value)}} className={inputStyle} placeholder="https://github.com/my-username/my-project"/>
                <button type="submit" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white hover:cursor-pointer hover:bg-dark-teal-800">{project ? "Update" :"+ Create"}</button>
            </form>
        </div>  
}

export default ProjectForm;