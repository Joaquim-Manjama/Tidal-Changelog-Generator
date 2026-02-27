import { useState } from "react";

const NoProjects = () => {

    const inputStyle = `focus:border-dark-teal-700 focus:outline-none p-3 shadow rounded border border-white/10 mb-5 w-full -mt-4`;

    const [isFormActive, setIsFormActive] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [slug, setSlug] = useState<string>("");
    const [githubRepo, setGithubRepo] = useState<string>("");


    const handleButtonClick = () => {
        reset();
        setIsFormActive(true);
    }

    const reset = () => {
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
        const properSlug = text.replace(" ", "-").toLowerCase();
        return properSlug;
    }
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        reset();
        setIsFormActive(false);
        alert("submited")
    }

    if (isFormActive) {
        return<div className="absolute top-0 left-0 w-full h-screen flex transition duration-10">
            <form action=""  onSubmit={(e) => handleSubmit(e)} className="m-auto bg-white/30 backdrop-blur-xl m-auto w-[500px] rounded-2xl border border-white/10 shadow-xl p-8 flex flex-col gap-5">
                <span onClick={() => setIsFormActive(false)} className="material-symbols-outlined right-10 scale-[1.2] absolute hover:cursor-pointer hover:text-red-500">close</span>
                <h1 className="text-2xl w-full text-center">New Project</h1>
                <label htmlFor="">Project Name*</label>
                <input type="text" value={name} onChange={(e) => {handleChangeName(e)}} className={inputStyle} placeholder="My Project" required/>
                <label htmlFor="">URL Slug*</label>
                <input type="text" value={slug} onChange={(e) => handleChangeSlug(e)} className={inputStyle} placeholder="my-project" required/>
                <p className="font-thin text-sm -mt-7 mb-2">yoursite.com/your-slug</p>
                <label htmlFor="" className="flex flex-row gap-2">Github Repository URL <p className="font-thin">(optional)</p></label>
                <input type="text" value={githubRepo} onChange={(e) => {setGithubRepo(e.target.value)}} className={inputStyle} placeholder="https://github.com/my-username/my-project"/>
                <button type="submit" className="bg-dark-teal-700 p-4 rounded-lg shadow-xl text-white">+ Create</button>
            </form>
        </div>  
    }

    return <div className="flex flex-col items-center text-gray-600 gap-10">
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