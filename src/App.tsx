import Header from "./components/Header"

function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center bg-ink-black-950 rubik text-white">
      <Header />      
      <h1 className="text-6xl font-normal">Track. Generate. Ship.</h1>
      <h1 className="text-ocean-blue-600 font-normal mt-10">Turn chaotic commit history into structured, release-ready changelogs.</h1>
      <button className="mt-15 bg-black p-5 pl-10 pr-10 rounded-xl bg-sky-surge-600 font-normal hover:bg-sky-surge-700 hover:cursor-pointer">Get Started</button>
    </div>
  )
}

export default App
