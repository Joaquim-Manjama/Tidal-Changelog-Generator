import { connectGitHub, disconnectGitHub } from "../services/Github";

const GitHubConnectButton = ({connected}: {connected: boolean}) => {

    const handleConnectGitHub = async () => {
        await connectGitHub();
    }

    const handleDisconnectGitHub = async () => {
        await disconnectGitHub();
        window.location.reload();
    }
    
    return <>
        {
            connected ? 
                <button className="bg-red-900 text-white h-12 pl-2 pr-2 rounded hover:bg-red-950 hover:cursor-pointer w-50" onClick={() => handleDisconnectGitHub()}>
                    Disconnect GitHub
                </button>
                : 
                <button className="bg-gray-800 text-white h-12 pl-2 pr-2 rounded hover:bg-gray-600 hover:cursor-pointer w-50" onClick={() => handleConnectGitHub()}>
                    Connect GitHub
                </button>
        }
    </> 
}

export default GitHubConnectButton;