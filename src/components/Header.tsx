import { useUserData } from "../contexts/UserDataContext";

interface HeaderProps {
    type: "main" | "dashboard";
}

const hoverEffect = "hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"

const Header = ({type}: HeaderProps) => {

    const {firstName, lastName, email} = useUserData();

    if (type == "dashboard") {
        return <div className="border-b-2 ml-[-21px] mt-[-20px] border-gray-300 flex flex-row items-center p-[19px] justify-end pr-0 mb-[20px] gap-[15px]">
            <div className="bg-dark-teal-700 p-[6px] rounded rounded-[30px] text-white text-md font-medium">{firstName.at(0)}{lastName.at(0)}</div>
            <div>
                <p>{firstName} {lastName}</p>
                <p className="font-thin text-xs mb-[-1px]">{email}</p>
            </div>
            <div>
                <span className="material-symbols-outlined scale-[1.2] mt-[7px] hover:text-gray-800 hover:cursor-pointer">keyboard_arrow_down</span>
            </div>
        </div>
    }
    
    return <div className="flex flex-row items-center justify-between p-6 pl-10 pr-10 mb-[100px] w-full select-none gap-[30px]">
        { <h1 className="text-3xl font-normal">Tidal</h1>}
        <div className="flex flex-row gap-[30px]">
            <p className={hoverEffect}>Developers</p>
            <p className={hoverEffect}>Documentation</p>
            <p className={hoverEffect}>Pricing</p>
            <p className={hoverEffect}>Product</p>
        </div>
    </div>
}



export default Header