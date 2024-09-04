import instance from "../lib/axiosConfig";

export const login = async (username: string, password: string) => {
    // Logic for authentication and getting JWT token
    try {
        const data = new FormData()
        data.append("username", username)
        data.append("password", password)
        const response = await instance.post("/login", data)
        return response
    } catch (error) {
        throw error
    }

};
export const logout = () => {
    // Logic for logging out
    localStorage.removeItem("authToken")
};
export const isAuthenticated = () => {
    // Check if user is authenticated
    const authToken = JSON.parse(localStorage.getItem('authToken')!);
    if (authToken && authToken.access_token) {
        return true;
    }
    return false;

};
