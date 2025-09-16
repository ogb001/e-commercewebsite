import { IoLogOut } from "react-icons/io5";

const backendDomain = "http://localhost:8080";  // Removed invisible character

const summaryApi = {
    SignUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },

    signin: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },

    current_user: {
        url: `${backendDomain}/api/user-details`,  // Corrected URL format
        method: "get"  // Corrected method spelling
    },

    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "post"
    },
};

export default summaryApi;
