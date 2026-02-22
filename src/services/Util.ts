const storeInformation = (data: {firstName: string, lastName: string, email: string, token: string}) => {
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);
}

export default storeInformation;