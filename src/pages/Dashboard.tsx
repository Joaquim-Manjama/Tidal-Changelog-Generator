const Home = () => {
    const firstName = localStorage.getItem("firstName") || "User";
    const lastName = localStorage.getItem("lastName") || "";

    return <div className="p-4">
        <h1 className="text-2xl font-normal">Welcome, {firstName} {lastName}!</h1>
    </div>
}

export default Home;