import Header from "./components/Header"
import { NavLink } from "react-router"

function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center text-white">
      <Header isMainPage={true} />      
      <h1 className="text-6xl font-normal">Track. Generate. Ship.</h1>
      <h1 className="text-gray-400 font-thin mt-10">Turn chaotic commit history into structured, release-ready changelogs!</h1>
      <NavLink to="/auth" className="mt-15 bg-black p-3 pl-7 pr-7 rounded-xl bg-dark-teal-700 font-normal hover:bg-dark-teal-800 shadow">Get Started</NavLink>
    </div>
  )
}

export default App
