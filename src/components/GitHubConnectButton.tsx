import { connectGitHub } from "../services/Github";

const GitHubConnectButton = () => {

    const handleConnectGitHub = async () => {
        await connectGitHub();
    }
    
    return <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600 hover:cursor-pointer mb-8" onClick={() => handleConnectGitHub()}>
            Connect GitHub
    </button>
}

export default GitHubConnectButton;