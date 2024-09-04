import instance from "../lib/axiosConfig";

export const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Authentication token not found");

    const { access_token } = JSON.parse(token);
    return {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    };
};

export const getData = async () => {
    try {
        const headers = getAuthHeaders();
        const response = await instance.get("/get-data", { headers })
        return response
    } catch (error) {
        throw error
    }

};

export const changePassword = async (body: { password: string, new_password: string }) => {
    try {
        const headers = getAuthHeaders();
        const response = await instance.post("/users/change_password", body, { headers })
        return response
    } catch (error) {
        throw error
    }

};
