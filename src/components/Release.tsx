import { type ReleaseProps } from "../interfaces/props";
import { toggleReleaseStatus } from "../services/Releases";

const Release = ({id, version, description, createdAt, status, onEdit}: ReleaseProps) => {
    
    const handleEdit = () => {
        onEdit(id, version, description);
    }

    const handlePublish = async () => {
        await toggleReleaseStatus(id);
        window.location.reload()
    }

    return <div className="shadow-xl relative rounded bg-gray-300 flex flex-col p-4 gap-5 w-[500px] m-auto transition duration-200 hover:cursor-pointer hover:-translate-y-3 hover:shadow-2xl">
        <div className="flex justify-between">
            <p>{version}</p>
            <p>{createdAt}</p>
            <p className={status=="DRAFT"? "text-yellow-700" : "text-green-600"}>[{status}]</p>
        </div>
        <div className="flex justify-between">
            <p>✨0 features</p>
            <p>.</p>
            <p>🐛0 fixes</p>
            <p>.</p>
            <p>⚡0 improvements</p>
        </div>
        <p>{description}</p>
        <div className="flex gap-5 justify-end">
            <button onClick={() => handleEdit()} className="text-white bg-black p-2 pl-4 pr-4 rounded hover:cursor-pointer">Edit</button>
            <button onClick={() => handlePublish()} className={`${status=="PUBLISHED"? "bg-red-900" : "bg-green-900"} text-white p-2 pl-4 pr-4 rounded hover:cursor-pointer`}>{status=="PUBLISHED"? "Unpublish" : "Publish"}</button>
        </div>
    </div>
}

export default Release;