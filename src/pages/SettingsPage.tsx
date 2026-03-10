import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useUserData } from "../contexts/UserDataContext";

const SettingsPage = () => {

    const {firstName, lastName, email} = useUserData();

    return <div className="relative p-4 pr-0 w-full min-h-screen flex texture">
            <SideBar/> 
            <div className='ml-[220px] p-5 mt-[-16px] text-black overflow-y-auto max-h-screen flex-1'>
                <Header type="dashboard"/>
                <h1 className="text-4xl font-medium mb-10">Settings</h1>
                <h1 className="text-3xl mb-3">Profile</h1>
                <div className="border rounded-xl p-4 bg-ocean-blue-900 text-gray-200">
                    <p>
                        <span className="font-medium text-dark-teal-700">Name: </span>
                        <span>{`${firstName} ${lastName}`}</span>
                    </p>
                    <p>
                        <span className="font-medium text-dark-teal-700">Email: </span>
                        <span>{`${email}`}</span>
                    </p>
                </div>
            </div>
        </div>
}

export default SettingsPage;