import axios from "axios";

/*
user object
{
    email:'',
    password:''
}
*/
const authenticationUrl = "http://localhost:9090/api/login/authenticate";
export const authenticateUser = async (user) => {
    const authData = (await axios.post(`${authenticationUrl}`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    })).data;
    return authData;
}