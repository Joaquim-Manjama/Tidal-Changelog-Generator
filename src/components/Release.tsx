interface ReleaseProps {
    id: number,
    version: string,
    description: string,
    createdAt: string

}

const Release = ({id, version, description, createdAt}: ReleaseProps) => {

    return <div className="border flex flex-col p-4 gap-5 w-[500px] m-auto">
        <div className="flex justify-between">
            <p>{version}</p>
            <p>{createdAt}</p>
            <p>Draft</p>
        </div>
        <div className="flex justify-between">
            <p>✨0 features</p>
            <p>.</p>
            <p>🐛0 fixes</p>
            <p>.</p>
            <p>⚡0 improvements</p>
        </div>
        <p>{description}</p>
        <div className="flex gap-5">
            <p>Edit</p>
            <p>Publish</p>
        </div>
    </div>
}

export default Release;