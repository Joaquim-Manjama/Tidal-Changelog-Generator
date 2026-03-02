interface ProjectProps {
    name: string;
    slug: string;
}

const Project = ({name, slug}: ProjectProps) => {
    
    return <div className="border border-gray-200 shadow-xl bg-bright-sky-50 rounded-xl p-7 backdrop-blur-xl flex flex-col gap-3 relative">
        <h1 className="text-xl text-ink-black-800 font-medium">{name}</h1>
        <p className="text-gray-700 font-thin">{slug}</p>
        <p className="text-gray-700 p-1 bg-yellow-100 text-yellow-700 rounded-xl">● 0 releases</p>
        <p className="text-gray-700 p-1 bg-red-100 text-red-700 rounded-xl">● 0 subscribers</p>
        <p className="bg-sky-surge-200 p-2 rounded-xl text-center text-sky-surge-700 mt-8">Last updated: Sometime</p>
        <div className="border-b-2 w-full absolute left-0 bottom-[90px] border-sky-surge-700"></div>
    </div>

}

export default Project;