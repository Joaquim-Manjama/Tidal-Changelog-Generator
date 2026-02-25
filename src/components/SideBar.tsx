const optionStyle = "p-3 rounded flex flex-row pl-5 hover:bg-ink-black-800 hover:cursor-pointer";

const SideBar = () => {
    return <div className="absolute border-r-2 border-bright-sky-600 w-[220px] h-screen top-0 left-0 flex flex-col bg-ocean-blue-950">
        <h1 className="text-3xl font-normal p-5 mb-[1px]">Tidal</h1>
        <button className={`${optionStyle} border-t-2 border-bright-sky-600 rounded-t-none`}>
            <span className="material-symbols-outlined mr-1">folder_code</span>Projects
        </button>
        <button className={optionStyle}>
            <span className="material-symbols-outlined mr-1">settings</span>Settings
            </button>
    </div>
}

export default SideBar;