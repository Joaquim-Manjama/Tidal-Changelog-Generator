interface HeaderProps {
    isMainPage: boolean;
}

const hoverEffect = "hover:text-gray-300 hover:cursor-pointer transition duration-200 ease-in-out"

const Header = ({isMainPage}: HeaderProps) => {
    
    return <div className="flex flex-row items-center justify-between p-6 pl-10 pr-10 mb-[100px] w-full select-none gap-[30px]">
        { isMainPage && <h1 className="text-3xl font-normal">Tidal</h1>}
        <div className="flex flex-row gap-[30px]">
            <p className={hoverEffect}>Developers</p>
            <p className={hoverEffect}>Documentation</p>
            <p className={hoverEffect}>Pricing</p>
            <p className={hoverEffect}>Product</p>
        </div>
    </div>
}



export default Header